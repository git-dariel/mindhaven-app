import { useState, useCallback, useEffect } from "react";
import { audioProcessor } from "@/utils/audioProcessor";

interface UseTTSProps {
  text: string;
}

interface UseTTSReturn {
  isAnimating: boolean;
  audioData: number[];
  handleToggle: () => Promise<void>;
}

export const useTTS = ({ text }: UseTTSProps): UseTTSReturn => {
  const [isAnimating, setIsAnimating] = useState(false);
  const [audioData, setAudioData] = useState<number[]>([0, 0, 0, 0, 0, 0]);

  // Cleanup effect
  useEffect(() => {
    return () => {
      audioProcessor.cleanup();
    };
  }, []);

  const handleToggle = useCallback(async () => {
    try {
      if (isAnimating) {
        await audioProcessor.stopProcessing();
        setIsAnimating(false);
        return;
      }

      setIsAnimating(true);
      audioProcessor.on("amplitudes", (amplitudes) => {
        setAudioData(amplitudes);
      });

      audioProcessor.once("finished", () => {
        setIsAnimating(false);
      });

      await audioProcessor.startProcessing(text);
    } catch (error) {
      console.error("Error:", error);
      setIsAnimating(false);
    }
  }, [isAnimating, text]);

  return {
    isAnimating,
    audioData,
    handleToggle,
  };
};
