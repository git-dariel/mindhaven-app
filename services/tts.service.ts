import { ApiService } from "./api.service";

class TTSService extends ApiService {
  constructor() {
    super();
  }

  async synthesizeSpeech(text: string, ssml = false): Promise<Uint8Array> {
    try {
      const response = await this.post(
        "/tts/synthesize",
        { text, ssml },
        {
          responseType: "arraybuffer",
          headers: {
            Accept: "audio/mpeg",
          },
        }
      );

      return new Uint8Array(response);
    } catch (error) {
      console.error("Speech synthesis failed:", error);
      throw error;
    }
  }

  async getWaveformData(audioBlob: Blob): Promise<number[]> {
    try {
      const buffer = await audioBlob.arrayBuffer();
      // Convert to 16-bit PCM data
      const view = new DataView(buffer);
      const pcmData = new Float32Array(buffer.byteLength / 2);

      for (let i = 0; i < pcmData.length; i++) {
        // Convert 16-bit integer to float
        const int16 = view.getInt16(i * 2, true);
        pcmData[i] = int16 / 32768.0; // Normalize to [-1, 1]
      }

      // Process audio data into waveform amplitudes
      const samplesPerFrame = 1024;
      const waveform: number[] = [];

      for (let i = 0; i < pcmData.length; i += samplesPerFrame) {
        let sum = 0;
        let count = 0;
        for (let j = 0; j < samplesPerFrame && i + j < pcmData.length; j++) {
          sum += Math.abs(pcmData[i + j]);
          count++;
        }
        const amplitude = count > 0 ? sum / count : 0;
        waveform.push(Math.min(1, amplitude * 2)); // Normalize to [0, 1]
      }

      return waveform;
    } catch (error) {
      console.error("Waveform generation failed:", error);
      throw error;
    }
  }
}

export const ttsService = new TTSService();
