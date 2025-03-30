import { apiService } from "./api.service";
import { SynthesizeSpeechParams } from "@/types/api.types";

// Convert audio blob to waveform data
const convertToWaveform = async (buffer: ArrayBuffer): Promise<number[]> => {
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
};

// Synthesize speech from text
const synthesizeSpeech = async ({
  text,
  ssml = false,
}: SynthesizeSpeechParams): Promise<Uint8Array> => {
  try {
    const response = await apiService.post(
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
};

// Generate waveform data from audio blob
const getWaveformData = async (audioBlob: Blob): Promise<number[]> => {
  try {
    const buffer = await audioBlob.arrayBuffer();
    return convertToWaveform(buffer);
  } catch (error) {
    console.error("Waveform generation failed:", error);
    throw error;
  }
};

export const ttsService = {
  synthesizeSpeech,
  getWaveformData,
};
