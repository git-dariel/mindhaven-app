import { AUDIO_CONFIG } from "../../constants/audio";
import { SpeechPhase } from "../types/audio";

interface PhaseUpdateParams {
  currentPhase: SpeechPhase;
  isAtWordBoundary: boolean;
  isAtSyllableBoundary: boolean;
}

export function getNextSpeechPhase({
  currentPhase,
  isAtWordBoundary,
  isAtSyllableBoundary,
}: PhaseUpdateParams): SpeechPhase {
  const phaseTransitions: Record<SpeechPhase, SpeechPhase | Function> = {
    attack: "sustain",
    sustain: "decay",
    decay: () => (isAtWordBoundary ? "pause" : "release"),
    release: () => (isAtSyllableBoundary ? "attack" : "pause"),
    pause: () =>
      Math.random() < AUDIO_CONFIG.speechPhaseTransitionProbability ? "attack" : "pause",
  };

  const nextPhase = phaseTransitions[currentPhase];
  return typeof nextPhase === "function" ? nextPhase() : nextPhase;
}

export function checkBoundaries(
  position: number,
  boundaries: number[],
  threshold: number
): boolean {
  return boundaries.some((pos) => Math.abs(position - pos) < threshold);
}
