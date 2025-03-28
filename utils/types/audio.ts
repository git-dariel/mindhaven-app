export interface AudioAmplitudes {
  readonly data: number[];
}

export interface AudioProcessorEvents {
  amplitudes: (data: number[]) => void;
  finished: () => void;
}

export type SpeechPhase = "attack" | "sustain" | "decay" | "release" | "pause";
