import React, { useEffect, useRef } from "react";
import { Animated, StyleSheet, View } from "react-native";

interface DotProps {
  index: number;
  amplitude: number;
}

const Dot = ({ index, amplitude }: DotProps) => {
  const animation = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    // Make animation more dynamic based on index and amplitude
    Animated.spring(animation, {
      toValue: 1 + amplitude * 0.8,
      tension: 80,
      friction: 4,
      useNativeDriver: true,
    }).start();
  }, [amplitude]);

  // Get color based on amplitude
  const getColor = () => {
    // When amplitude is high, use more vibrant colors
    if (amplitude > 0.7) {
      return "#3498db"; // Bright blue for high amplitude
    } else if (amplitude > 0.4) {
      return "#2980b9"; // Medium blue for medium amplitude
    } else if (amplitude > 0.1) {
      return "#1c6ca1"; // Darker blue for low amplitude
    } else {
      return "#164e79"; // Very dark blue for very low amplitude
    }
  };

  return (
    <Animated.View
      style={[
        styles.dot,
        {
          backgroundColor: getColor(),
          transform: [
            { scale: animation },
            {
              translateY: animation.interpolate({
                inputRange: [0.8, 1, 1.8],
                outputRange: [15, 0, -15],
              }),
            },
          ],
        },
      ]}
    />
  );
};

interface WaveformAnimationProps {
  isAnimating: boolean;
  audioData?: number[]; // Array of audio amplitudes (0-1)
}

export const WaveformAnimation = ({
  isAnimating,
  audioData = [0, 0, 0, 0, 0, 0],
}: WaveformAnimationProps) => {
  return (
    <View style={styles.container}>
      {Array.from({ length: 6 }).map((_, index) => (
        <Dot key={index} index={index} amplitude={isAnimating ? audioData[index] || 0 : 0} />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 12,
    height: 100,
  },
  dot: {
    width: 16,
    height: 50,
    borderRadius: 8,
    backgroundColor: "#164e79",
  },
});
