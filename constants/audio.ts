export const AUDIO_CONFIG = {
  sampleInterval: 50, // milliseconds between samples
  sampleRate: 44100, // standard audio sample rate
  noiseThreshold: -35,
  maxDuration: 30000, // 30 seconds of audio
  syllableLength: {
    min: 150,
    max: 300,
  },
  wordPause: {
    min: 100,
    max: 300,
    probability: 0.3,
  },
  speechPhaseTransitionProbability: 0.8,
};

export const SPEECH_ENVELOPE = {
  pauseTime: 200,
  attackTime: 100,
  sustainTime: 300,
  releaseTime: 150,
};

export const WAVEFORM_CONFIG = {
  minAmplitude: 0.1,
  maxAmplitude: 1.0,
  smoothingFactor: 0.3,
};
