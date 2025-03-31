import React from "react";
import { View, Animated, Pressable } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { colors } from "../constants/theme";
import { useVoiceAnimation, CIRCLE_SIZE } from "../hooks/useVoiceAnimation";

interface Props {
  isAnimating: boolean;
  amplitudes?: number[];
  onPress: () => void;
}

export const VoiceInterface: React.FC<Props> = ({ isAnimating, amplitudes = [], onPress }) => {
  const { pulseAnimations, buttonScale, mouthAnimations, handlePressIn, handlePressOut } =
    useVoiceAnimation({
      isAnimating,
      amplitudes,
    });

  return (
    <View
      className="items-center justify-center"
      style={{ height: CIRCLE_SIZE * 2, width: CIRCLE_SIZE * 2 }}
    >
      {/* Pulse Rings */}
      {pulseAnimations.map((anim: Animated.Value, index: number) => (
        <Animated.View
          key={`ring-${index}`}
          className="absolute"
          style={[
            {
              width: CIRCLE_SIZE,
              height: CIRCLE_SIZE,
              borderRadius: CIRCLE_SIZE / 2,
              borderWidth: 2,
              borderColor: colors.primary,
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
          className="items-center justify-center"
          style={[
            {
              width: CIRCLE_SIZE,
              height: CIRCLE_SIZE,
              borderRadius: CIRCLE_SIZE / 2,
              backgroundColor: colors.primary,
              elevation: 8,
              shadowColor: colors.primary,
              shadowOffset: { width: 0, height: 4 },
              shadowOpacity: 0.3,
              shadowRadius: 8,
              transform: [{ scale: buttonScale }],
            },
          ]}
        >
          <MaterialIcons name={isAnimating ? "stop" : "mic"} size={36} color={colors.background} />
        </Animated.View>
      </Pressable>

      {/* AI Mouth Animation */}
      <View
        className="absolute flex-row justify-center items-center"
        style={{
          width: CIRCLE_SIZE * 1.2,
          height: 40,
          bottom: -60,
          gap: 4,
        }}
      >
        {mouthAnimations.map((anim: Animated.Value, index: number) => (
          <Animated.View
            key={`mouth-${index}`}
            style={[
              {
                width: 12,
                height: 24,
                borderRadius: 6,
                backgroundColor: colors.primary,
                opacity: 0.8,
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
