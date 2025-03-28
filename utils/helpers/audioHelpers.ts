export const SPEECH_ENVELOPE = {
  attackTime: 50,
  sustainTime: 100,
  decayTime: 80,
  releaseTime: 120,
  pauseTime: 200,
};

export function smoothStep(min: number, max: number, progress: number): number {
  progress = Math.max(0, Math.min(1, progress));
  progress = progress * progress * (3 - 2 * progress);
  return min + progress * (max - min);
}

export function generateAmplitudesForPhase(
  phase: string,
  progress: number,
  smoothStepFn: (min: number, max: number, progress: number) => number
): number[] {
  switch (phase) {
    case "attack":
      return [
        smoothStepFn(0, 0.8, progress),
        smoothStepFn(0, 0.9, progress),
        smoothStepFn(0, 1.0, progress),
        smoothStepFn(0, 0.85, progress),
        smoothStepFn(0, 0.7, progress) * 0.7,
        smoothStepFn(0, 0.5, progress) * 0.5,
      ];

    case "sustain": {
      const baseAmplitude = 0.9;
      const variation = Math.sin(progress * Math.PI * 2) * 0.1;
      return [
        baseAmplitude * 0.8 + variation * 0.3,
        baseAmplitude * 0.9 + variation * 0.2,
        baseAmplitude + variation * 0.1,
        baseAmplitude * 0.85 + variation * 0.15,
        baseAmplitude * 0.6 + variation * 0.2,
        baseAmplitude * 0.4 + variation * 0.1,
      ];
    }

    case "decay":
      return [
        smoothStepFn(0.8, 0.4, progress),
        smoothStepFn(0.9, 0.3, progress),
        smoothStepFn(1.0, 0.2, progress),
        smoothStepFn(0.85, 0.2, progress),
        smoothStepFn(0.7, 0.1, progress) * 0.5,
        smoothStepFn(0.5, 0.05, progress) * 0.3,
      ];

    case "release":
      return [
        smoothStepFn(0.4, 0, progress),
        smoothStepFn(0.3, 0, progress),
        smoothStepFn(0.2, 0, progress),
        smoothStepFn(0.2, 0, progress),
        smoothStepFn(0.1, 0, progress) * 0.3,
        smoothStepFn(0.05, 0, progress) * 0.2,
      ];

    default:
      return Array(6)
        .fill(0)
        .map((_, i) => Math.random() * [0.05, 0.07, 0.06, 0.08, 0.1, 0.09][i]);
  }
}
