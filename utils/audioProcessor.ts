import { EventEmitter } from "events";
import { Audio } from "expo-av";
import * as FileSystem from "expo-file-system";
import { ttsService } from "../services/tts.service";
import { AudioState, AudioProcessor, AudioEvents, AudioEventListener } from "@/types/api.types";

// Initialize audio mode
const initializeAudio = async () => {
  await Audio.setAudioModeAsync({
    allowsRecordingIOS: true,
    playsInSilentModeIOS: true,
    staysActiveInBackground: false,
    shouldDuckAndroid: true,
  });
};

// Helper function to convert ArrayBuffer to base64
const arrayBufferToBase64 = (buffer: ArrayBuffer | Uint8Array): string => {
  let binary = "";
  const bytes = new Uint8Array(buffer);
  for (let i = 0; i < bytes.byteLength; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return btoa(binary);
};

// Generate waveform data from audio
const generateWaveform = (audioData: Uint8Array): number[] => {
  const waveformData: number[] = [];
  const numSegments = 6; // Match the number of dots
  const samplesPerSegment = Math.floor(audioData.length / 30); // Create more sample points for smoother animation

  for (let i = 0; i < 30; i++) {
    const startIdx = i * samplesPerSegment;
    const endIdx = Math.min(startIdx + samplesPerSegment, audioData.length);

    let sum = 0;
    let count = 0;

    for (let j = startIdx; j < endIdx; j++) {
      sum += Math.abs(audioData[j] - 128) / 128;
      count++;
    }

    const amplitude = count > 0 ? Math.min(1, (sum / count) * 1.5) : 0;
    waveformData.push(amplitude);
  }

  return waveformData;
};

// Create audio processor instance
const createAudioProcessor = (): AudioProcessor => {
  const emitter = new EventEmitter();
  const state: AudioState = {
    sound: null,
    isProcessing: false,
    waveformData: [],
    updateInterval: null,
  };

  // Initialize audio settings
  initializeAudio();

  // Start waveform updates
  const startWaveformUpdates = () => {
    if (state.updateInterval) {
      clearInterval(state.updateInterval);
    }

    let currentIndex = 0;
    state.updateInterval = setInterval(() => {
      if (!state.sound) return;

      // Create a more natural wave-like motion by using 6 consecutive points
      const amplitudes = state.waveformData.slice(currentIndex, currentIndex + 6).map((amp) => {
        // Add slight randomization for more natural movement
        const variation = Math.random() * 0.2 - 0.1; // Random value between -0.1 and 0.1
        return Math.max(0, Math.min(1, amp + variation));
      });

      // If we don't have enough points, wrap around to the beginning
      if (amplitudes.length < 6) {
        const remaining = state.waveformData.slice(0, 6 - amplitudes.length);
        amplitudes.push(...remaining);
      }

      emitter.emit("amplitudes", amplitudes);

      currentIndex = (currentIndex + 1) % (state.waveformData.length - 5);
    }, 100); // Update every 100ms for smoother animation
  };

  // Stop waveform updates
  const stopWaveformUpdates = () => {
    if (state.updateInterval) {
      clearInterval(state.updateInterval);
      state.updateInterval = null;
    }
  };

  // Load audio from text
  const loadAudioFromText = async (text: string): Promise<void> => {
    try {
      const audioData = await ttsService.synthesizeSpeech({ text });

      // Create a temporary file to store the audio data
      const tempFile = `${FileSystem.cacheDirectory}temp_audio.mp3`;
      await FileSystem.writeAsStringAsync(tempFile, arrayBufferToBase64(audioData), {
        encoding: FileSystem.EncodingType.Base64,
      });

      // Load the audio from the temporary file
      state.sound = new Audio.Sound();
      await state.sound.loadAsync({ uri: tempFile }, {}, true);

      // Generate initial waveform data
      state.waveformData = generateWaveform(audioData);

      // Clean up the temporary file
      await FileSystem.deleteAsync(tempFile, { idempotent: true });
    } catch (error) {
      console.error("Error loading audio from text:", error);
      throw error;
    }
  };

  // Public methods
  const startProcessing = async (text: string): Promise<void> => {
    if (state.isProcessing) return;

    try {
      if (!text) {
        throw new Error("Text is required for processing");
      }

      await loadAudioFromText(text);

      if (!state.sound) {
        throw new Error("No audio loaded");
      }

      state.isProcessing = true;
      await state.sound.playAsync();
      startWaveformUpdates();

      state.sound.setOnPlaybackStatusUpdate((status) => {
        if (!status.isLoaded) return;

        if (status.didJustFinish) {
          stopWaveformUpdates();
          emitter.emit("finished");
          state.isProcessing = false;
        }
      });
    } catch (error) {
      console.error("Error starting audio processing:", error);
      throw error;
    }
  };

  const stopProcessing = async (): Promise<void> => {
    if (!state.isProcessing || !state.sound) return;

    try {
      stopWaveformUpdates();
      await state.sound.stopAsync();
      await state.sound.unloadAsync();
      state.isProcessing = false;
    } catch (error) {
      console.error("Error stopping audio processing:", error);
      throw error;
    }
  };

  const cleanup = async (): Promise<void> => {
    stopWaveformUpdates();
    await stopProcessing();
    emitter.removeAllListeners();
  };

  // Event handling methods
  const on = <T extends keyof AudioEvents>(event: T, listener: AudioEventListener<T>) => {
    emitter.on(event, listener);
  };

  const once = <T extends keyof AudioEvents>(event: T, listener: AudioEventListener<T>) => {
    emitter.once(event, listener);
  };

  return {
    startProcessing,
    stopProcessing,
    cleanup,
    on,
    once,
  };
};

// Export a singleton instance
export const audioProcessor = createAudioProcessor();
