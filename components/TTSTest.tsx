import React from "react";
import { View, StyleSheet, Text, StatusBar } from "react-native";
import { colors, spacing } from "../constants/theme";
import { VoiceInterface } from "./VoiceInterface";
import { useTTS } from "@/hooks/useTTS";
import { LinearGradient } from "expo-linear-gradient";
import { AIHeader } from "./AIHeader";
import { config } from "../constants/common";

export const TTSTest = () => {
  const { isAnimating, audioData, handleToggle } = useTTS({ text: config.SAMPLE_TEXT });

  return (
    <LinearGradient colors={[colors.background, colors.backgroundDark]} style={styles.container}>
      <StatusBar barStyle="light-content" />

      <View style={styles.mainContainer}>
        <AIHeader isAnimating={isAnimating} />

        <View style={styles.content}>
          <VoiceInterface isAnimating={isAnimating} amplitudes={audioData} onPress={handleToggle} />
        </View>

        <View style={styles.hintContainer}>
          <Text style={styles.hintText}>
            {isAnimating
              ? "I'm here to listen and understand..."
              : "Tap the microphone to start our conversation"}
          </Text>
        </View>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  mainContainer: {
    flex: 1,
    paddingTop: spacing.xl,
  },
  content: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: spacing.xl,
    marginTop: -spacing.xl * 4, // Pull the voice interface up
  },
  hintContainer: {
    position: "absolute",
    bottom: spacing.xl * 2,
    left: spacing.xl,
    right: spacing.xl,
    alignItems: "center",
  },
  hintText: {
    fontSize: 14,
    color: colors.textSecondary,
    textAlign: "center",
    opacity: 0.9,
  },
});
