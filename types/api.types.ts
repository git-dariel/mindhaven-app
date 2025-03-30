import { Audio } from "expo-av";

// API Types
export type ResponseType = "json" | "arraybuffer";

export interface RequestOptions {
  responseType?: ResponseType;
  headers?: Record<string, string>;
}

export interface ApiError {
  message: string;
  status?: number;
}

// TTS Types
export interface SynthesizeSpeechParams {
  text: string;
  ssml?: boolean;
}

// Audio Processor Types
export type AudioState = {
  sound: Audio.Sound | null;
  isProcessing: boolean;
  waveformData: number[];
  updateInterval: NodeJS.Timeout | null;
};

export type AudioEvents = {
  amplitudes: number[];
  finished: void;
};

export type AudioEventListener<T extends keyof AudioEvents> = (data: AudioEvents[T]) => void;

export interface AudioProcessor {
  startProcessing: (text: string) => Promise<void>;
  stopProcessing: () => Promise<void>;
  cleanup: () => Promise<void>;
  on: <T extends keyof AudioEvents>(event: T, listener: AudioEventListener<T>) => void;
  once: <T extends keyof AudioEvents>(event: T, listener: AudioEventListener<T>) => void;
}
