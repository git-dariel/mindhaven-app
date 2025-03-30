import { AUDIO_CONFIG } from "../constants/audio";

interface SpeechPattern {
  syllableBoundaries: number[];
  wordBoundaries: number[];
}

export function generateSpeechPattern(): SpeechPattern {
  const syllableBoundaries: number[] = [];
  const wordBoundaries: number[] = [];
  const { maxDuration, syllableLength, wordPause } = AUDIO_CONFIG;

  let position = 0;
  while (position < maxDuration) {
    const syllableLength = generateRandomValue(
      AUDIO_CONFIG.syllableLength.min,
      AUDIO_CONFIG.syllableLength.max
    );

    position += syllableLength;
    syllableBoundaries.push(position);

    if (Math.random() < wordPause.probability) {
      position += generateRandomValue(wordPause.min, wordPause.max);
      wordBoundaries.push(position);
    }
  }

  return { syllableBoundaries, wordBoundaries };
}

function generateRandomValue(min: number, max: number): number {
  return Math.random() * (max - min) + min;
}
