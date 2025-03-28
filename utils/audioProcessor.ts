import { EventEmitter } from "events";
import { Audio } from "expo-av";
import * as FileSystem from "expo-file-system";
import { ttsService } from "../services/tts.service";

class AudioProcessor extends EventEmitter {
  private sound: Audio.Sound | null = null;
  private isProcessing = false;
  private readonly sampleInterval = 50; // 50ms for smoother updates
  private waveformData: number[] = [];
  private updateInterval: NodeJS.Timeout | null = null;

  constructor() {
    super();
    Audio.setAudioModeAsync({
      allowsRecordingIOS: true,
      playsInSilentModeIOS: true,
      staysActiveInBackground: false,
      shouldDuckAndroid: true,
    });
  }

  private async loadAudioFromText(text: string, useSSML = false): Promise<void> {
    try {
      const audioData = await ttsService.synthesizeSpeech(text, useSSML);

      // Create a temporary file to store the audio data
      const tempFile = `${FileSystem.cacheDirectory}temp_audio.mp3`;
      await FileSystem.writeAsStringAsync(tempFile, arrayBufferToBase64(audioData), {
        encoding: FileSystem.EncodingType.Base64,
      });

      // Load the audio from the temporary file
      this.sound = new Audio.Sound();
      await this.sound.loadAsync({ uri: tempFile }, {}, true);

      // Generate initial waveform data
      this.waveformData = this.generateInitialWaveform(audioData);

      // Clean up the temporary file
      await FileSystem.deleteAsync(tempFile, { idempotent: true });
    } catch (error) {
      console.error("Error loading audio from text:", error);
      throw error;
    }
  }

  private generateInitialWaveform(audioData: Uint8Array): number[] {
    const waveformData: number[] = [];
    const samplesPerSegment = 1024;
    const numSegments = 6; // Match the number of dots

    for (let i = 0; i < numSegments; i++) {
      const startIdx = Math.floor((i / numSegments) * audioData.length);
      const endIdx = Math.floor(((i + 1) / numSegments) * audioData.length);

      let sum = 0;
      let count = 0;

      for (let j = startIdx; j < endIdx; j++) {
        sum += Math.abs(audioData[j] - 128) / 128;
        count++;
      }

      const amplitude = count > 0 ? Math.min(1, sum / count) : 0;
      waveformData.push(amplitude);
    }

    return waveformData;
  }

  private startWaveformUpdates() {
    if (this.updateInterval) {
      clearInterval(this.updateInterval);
    }

    let currentIndex = 0;
    this.updateInterval = setInterval(() => {
      if (!this.sound) return;

      // Rotate through the waveform data to create a smooth animation
      const amplitudes = this.waveformData
        .slice(currentIndex)
        .concat(this.waveformData.slice(0, currentIndex));

      this.emit("amplitudes", amplitudes);

      currentIndex = (currentIndex + 1) % this.waveformData.length;
    }, this.sampleInterval);
  }

  private stopWaveformUpdates() {
    if (this.updateInterval) {
      clearInterval(this.updateInterval);
      this.updateInterval = null;
    }
  }

  public async startProcessing(text?: string): Promise<void> {
    if (this.isProcessing) return;

    try {
      if (text) {
        await this.loadAudioFromText(text);
      }

      if (!this.sound) {
        throw new Error("No audio loaded");
      }

      this.isProcessing = true;
      await this.sound.playAsync();
      this.startWaveformUpdates();

      this.sound.setOnPlaybackStatusUpdate((status) => {
        if (!status.isLoaded) return;

        if (status.didJustFinish) {
          this.stopWaveformUpdates();
          this.emit("finished");
          this.isProcessing = false;
        }
      });
    } catch (error) {
      console.error("Error starting audio processing:", error);
      throw error;
    }
  }

  public async stopProcessing(): Promise<void> {
    if (!this.isProcessing || !this.sound) return;

    try {
      this.stopWaveformUpdates();
      await this.sound.stopAsync();
      await this.sound.unloadAsync();
      this.isProcessing = false;
    } catch (error) {
      console.error("Error stopping audio processing:", error);
      throw error;
    }
  }

  public async cleanup(): Promise<void> {
    this.stopWaveformUpdates();
    await this.stopProcessing();
    this.removeAllListeners();
  }
}

// Helper function to convert ArrayBuffer to base64
function arrayBufferToBase64(buffer: ArrayBuffer | Uint8Array): string {
  let binary = "";
  const bytes = new Uint8Array(buffer);
  for (let i = 0; i < bytes.byteLength; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return btoa(binary);
}

export const audioProcessor = new AudioProcessor();
