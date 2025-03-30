import React, { useEffect, useRef } from "react";
import { Animated, StyleSheet, View } from "react-native";
import { colors } from "../constants/theme";

interface Props {
  isAnimating: boolean;
  amplitudes?: number[];
}

const Dot = ({ index, amplitude }: { index: number; amplitude: number }) => {
  const animation = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    Animated.spring(animation, {
      toValue: 1 + amplitude * 0.8,
      tension: 120,
      friction: 8,
      useNativeDriver: true,
    }).start();
  }, [amplitude]);

  const getColor = () => {
    if (amplitude > 0.7) {
      return colors.waveform.high;
    } else if (amplitude > 0.4) {
      return colors.waveform.medium;
    } else if (amplitude > 0.1) {
      return colors.waveform.low;
    } else {
      return colors.waveform.veryLow;
    }
  };

  const animatedStyle = {
    transform: [
      { scaleY: animation },
      {
        translateY: animation.interpolate({
          inputRange: [0.8, 1, 1.8],
          outputRange: [10, 0, -10],
        }),
      },
    ],
    backgroundColor: getColor(),
  };

  return <Animated.View style={[styles.dot, animatedStyle]} />;
};

export const WaveformAnimation: React.FC<Props> = ({ isAnimating, amplitudes = [] }) => {
  return (
    <View style={styles.container}>
      {Array.from({ length: 6 }).map((_, index) => (
        <Dot key={index} index={index} amplitude={isAnimating ? amplitudes[index] || 0 : 0.1} />
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
    backgroundColor: colors.waveform.veryLow,
  },
});
