import React, { useEffect, useRef } from "react";
import { View, StyleSheet, Animated, Dimensions, Pressable } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { colors } from "../constants/theme";

interface Props {
  isAnimating: boolean;
  amplitudes?: number[];
  onPress: () => void;
}

const { width: SCREEN_WIDTH } = Dimensions.get("window");
const CIRCLE_SIZE = Math.min(SCREEN_WIDTH * 0.4, 180);
const RING_COUNT = 3;
const MOUTH_CIRCLES = 6;

export const VoiceInterface: React.FC<Props> = ({ isAnimating, amplitudes = [], onPress }) => {
  const pulseAnimations = useRef(
    Array.from({ length: RING_COUNT }, () => new Animated.Value(0))
  ).current;
  const buttonScale = useRef(new Animated.Value(1)).current;
  const mouthAnimations = useRef(
    Array.from({ length: MOUTH_CIRCLES }, () => new Animated.Value(1))
  ).current;

  // Handle pulse ring animations
  useEffect(() => {
    if (isAnimating) {
      pulseAnimations.forEach((anim, index) => {
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
      pulseAnimations.forEach((anim) => {
        anim.setValue(0);
        anim.stopAnimation();
      });
    }
  }, [isAnimating]);

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
      mouthAnimations.forEach((anim, index) => {
        const baseScale = 1 + Math.sin(index * (Math.PI / 3)) * 0.1;
        Animated.spring(anim, {
          toValue: baseScale,
          tension: 80,
          friction: 8,
          useNativeDriver: true,
        }).start();
      });
    }
  }, [isAnimating, amplitudes]);

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

  return (
    <View style={styles.container}>
      {/* Pulse Rings */}
      {pulseAnimations.map((anim, index) => (
        <Animated.View
          key={`ring-${index}`}
          style={[
            styles.pulseRing,
            {
              transform: [
                {
                  scale: anim.interpolate({
                    inputRange: [0, 1],
                    outputRange: [1, 2],
                  }),
                },
              ],
              opacity: anim.interpolate({
                inputRange: [0, 1],
                outputRange: [0.4, 0],
              }),
            },
          ]}
        />
      ))}

      {/* Main Button */}
      <Pressable onPressIn={handlePressIn} onPressOut={handlePressOut} onPress={onPress}>
        <Animated.View
          style={[
            styles.button,
            {
              transform: [{ scale: buttonScale }],
            },
          ]}
        >
          <MaterialIcons name={isAnimating ? "stop" : "mic"} size={36} color={colors.background} />
        </Animated.View>
      </Pressable>

      {/* AI Mouth Animation */}
      <View style={styles.mouthContainer}>
        {mouthAnimations.map((anim, index) => (
          <Animated.View
            key={`mouth-${index}`}
            style={[
              styles.mouthCircle,
              {
                transform: [
                  { scaleY: anim },
                  {
                    translateY: anim.interpolate({
                      inputRange: [1, 1.8],
                      outputRange: [0, -8],
                    }),
                  },
                ],
              },
            ]}
          />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    height: CIRCLE_SIZE * 2,
    width: CIRCLE_SIZE * 2,
  },
  pulseRing: {
    position: "absolute",
    width: CIRCLE_SIZE,
    height: CIRCLE_SIZE,
    borderRadius: CIRCLE_SIZE / 2,
    borderWidth: 2,
    borderColor: colors.primary,
  },
  button: {
    width: CIRCLE_SIZE,
    height: CIRCLE_SIZE,
    borderRadius: CIRCLE_SIZE / 2,
    backgroundColor: colors.primary,
    alignItems: "center",
    justifyContent: "center",
    elevation: 8,
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  mouthContainer: {
    position: "absolute",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    width: CIRCLE_SIZE * 1.2,
    height: 40,
    bottom: -60,
    gap: 4,
  },
  mouthCircle: {
    width: 12,
    height: 24,
    borderRadius: 6,
    backgroundColor: colors.primary,
    opacity: 0.8,
  },
});
