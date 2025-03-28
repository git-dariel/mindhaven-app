import React, { useState } from "react";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import { audioProcessor } from "../utils/audioProcessor";
import { WaveformAnimation } from "./WaveformAnimation";
import { colors, spacing } from "../constants/theme";
import { Ionicons } from "@expo/vector-icons";
import { TitleBar } from "./TitleBar";

export const TTSTest = () => {
  const [isAnimating, setIsAnimating] = useState(false);
  const [audioData, setAudioData] = useState<number[]>([0, 0, 0, 0, 0, 0]);

  const startSpeaking = async () => {
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

      await audioProcessor.startProcessing(
        "Hi! I'm MindHaven. Kumusta ka? I'm here as your mental health companion. Puwede kang magkwento sa akin ng kahit ano. I'm here to listen and understand what you're going through."
      );
    } catch (error) {
      console.error("Error:", error);
      setIsAnimating(false);
    }
  };

  return (
    <View style={styles.container}>
      <TitleBar />
      <View style={styles.content}>
        <WaveformAnimation isAnimating={isAnimating} amplitudes={audioData} />
        <Text style={styles.subtitle}>
          {isAnimating ? "Playing sample audio..." : "Press play to hear sample"}
        </Text>
        <TouchableOpacity style={styles.playButton} onPress={startSpeaking} activeOpacity={0.7}>
          <View style={styles.playButtonInner}>
            <Ionicons name={isAnimating ? "pause" : "play"} size={32} color={colors.background} />
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  title: {
    fontSize: 24,
    fontWeight: "600",
    textAlign: "center",
    marginTop: spacing.xl,
    marginBottom: spacing.xl,
    color: colors.text,
  },
  content: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: spacing.xl,
    paddingBottom: spacing.xl * 2,
  },
  subtitle: {
    fontSize: 16,
    color: colors.textSecondary,
    marginTop: spacing.l,
  },
  playButton: {
    marginTop: spacing.xl,
  },
  playButtonInner: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: colors.primary,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
});
