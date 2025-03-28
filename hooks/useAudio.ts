import { useEffect, useState } from "react";
import { audioProcessor } from "../utils/audioProcessor";

export function useAudio() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [audioAmplitudes, setAudioAmplitudes] = useState<number[]>([0, 0, 0, 0, 0, 0]);

  useEffect(() => {
    // Set up audio amplitude listener
    audioProcessor.on("amplitudes", setAudioAmplitudes);
    audioProcessor.on("finished", () => setIsPlaying(false));

    // Cleanup audio processor when component unmounts
    return () => {
      audioProcessor.cleanup();
    };
  }, []);

  const toggleAudio = async () => {
    try {
      if (!isPlaying) {
        await audioProcessor.startProcessing();
        setIsPlaying(true);
      } else {
        await audioProcessor.stopProcessing();
        setIsPlaying(false);
      }
    } catch (error) {
      console.error("Error toggling audio playback:", error);
      setIsPlaying(false);
    }
  };

  return {
    isPlaying,
    audioAmplitudes,
    toggleAudio,
  };
}
