import React from "react";
import { View, Text } from "react-native";
import { colors, spacing } from "../constants/theme";
import { VoiceInterface } from "./VoiceInterface";
import { useTTS } from "@/hooks/useTTS";
import { LinearGradient } from "expo-linear-gradient";
import { AIHeader } from "./AIHeader";
import { config } from "../constants/common";

export const TTSTest = () => {
  const { isAnimating, audioData, handleToggle } = useTTS({ text: config.SAMPLE_TEXT });

  return (
    <LinearGradient colors={[colors.background, colors.backgroundDark]} className="flex-1">
      <View style={{ paddingTop: spacing.xl }} className="flex-1">
        <AIHeader isAnimating={isAnimating} />

        <View
          style={{ paddingHorizontal: spacing.xl, marginTop: -spacing.xl * 4 }}
          className="flex-1 items-center justify-center"
        >
          <VoiceInterface isAnimating={isAnimating} amplitudes={audioData} onPress={handleToggle} />
        </View>

        <View
          style={{ bottom: spacing.xl * 2, left: spacing.xl, right: spacing.xl }}
          className="absolute items-center"
        >
          <Text style={{ color: colors.textSecondary }} className="text-sm text-center opacity-90">
            {isAnimating
              ? "I'm here to listen and understand..."
              : "Tap the microphone to start our conversation"}
          </Text>
        </View>
      </View>
    </LinearGradient>
  );
};
