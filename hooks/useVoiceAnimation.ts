import { useEffect, useRef } from "react";
import { Animated, Dimensions } from "react-native";

const { width: SCREEN_WIDTH } = Dimensions.get("window");
export const CIRCLE_SIZE = Math.min(SCREEN_WIDTH * 0.4, 180);
export const RING_COUNT = 3;
export const MOUTH_CIRCLES = 6;

interface UseVoiceAnimationProps {
  isAnimating: boolean;
  amplitudes?: number[];
}

interface UseVoiceAnimationReturn {
  pulseAnimations: Animated.Value[];
  buttonScale: Animated.Value;
  mouthAnimations: Animated.Value[];
  handlePressIn: () => void;
  handlePressOut: () => void;
}

export const useVoiceAnimation = ({
  isAnimating,
  amplitudes = [],
}: UseVoiceAnimationProps): UseVoiceAnimationReturn => {
  const pulseAnimations = useRef<Animated.Value[]>(
    Array.from({ length: RING_COUNT }, () => new Animated.Value(0))
  ).current;

  const buttonScale = useRef(new Animated.Value(1)).current;

  const mouthAnimations = useRef<Animated.Value[]>(
    Array.from({ length: MOUTH_CIRCLES }, () => new Animated.Value(1))
  ).current;

  // Handle pulse ring animations
  useEffect(() => {
    if (isAnimating) {
      pulseAnimations.forEach((anim: Animated.Value, index: number) => {
        Animated.loop(
          Animated.sequence([
            Animated.delay(index * 400),
            Animated.timing(anim, {
              toValue: 1,
              duration: 2000,
              useNativeDriver: true,
            }),
            Animated.timing(anim, {
              toValue: 0,
              duration: 0,
              useNativeDriver: true,
            }),
          ])
        ).start();
      });
    } else {
      pulseAnimations.forEach((anim: Animated.Value) => {
        anim.setValue(0);
        anim.stopAnimation();
      });
    }
  }, [isAnimating, pulseAnimations]);

  // Handle mouth animations
  useEffect(() => {
    if (isAnimating && amplitudes.length > 0) {
      amplitudes.forEach((amplitude, index) => {
        if (index < MOUTH_CIRCLES) {
          Animated.spring(mouthAnimations[index], {
            toValue: 1 + amplitude * 0.8,
            tension: 180,
            friction: 12,
            useNativeDriver: true,
          }).start();
        }
      });
    } else {
      mouthAnimations.forEach((anim: Animated.Value, index: number) => {
        const baseScale = 1 + Math.sin(index * (Math.PI / 3)) * 0.1;
        Animated.spring(anim, {
          toValue: baseScale,
          tension: 80,
          friction: 8,
          useNativeDriver: true,
        }).start();
      });
    }
  }, [isAnimating, amplitudes, mouthAnimations]);

  const handlePressIn = () => {
    Animated.spring(buttonScale, {
      toValue: 0.95,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(buttonScale, {
      toValue: 1,
      useNativeDriver: true,
    }).start();
  };

  return {
    pulseAnimations,
    buttonScale,
    mouthAnimations,
    handlePressIn,
    handlePressOut,
  };
};
