import { Stack } from "expo-router";
import React, { useEffect, useState } from "react";
import { Dimensions, StyleSheet, Text, View } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { ActionButtons } from "../components/ActionButtons";
import { TitleBar } from "../components/TitleBar";
import { WaveformAnimation } from "../components/WaveformAnimation";
import { audioProcessor } from "../utils/audioProcessor";

const { width } = Dimensions.get("window");

export default function App() {
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

  return (
    <SafeAreaProvider>
      <Stack.Screen options={{ headerShown: false }} />
      <View style={styles.container}>
        <SafeAreaView style={styles.content}>
          <TitleBar />

          {/* Main Content */}
          <View style={styles.mainContent}>
            {/* Waveform Container */}
            <View style={styles.waveformWrapper}>
              <WaveformAnimation isAnimating={isPlaying} audioData={audioAmplitudes} />
              <Text style={styles.statusText}>
                {isPlaying ? "Playing sample audio..." : "Press play to hear sample"}
              </Text>
            </View>
          </View>

          <ActionButtons isListening={isPlaying} onToggleListening={toggleAudio} />
        </SafeAreaView>
      </View>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  content: {
    flex: 1,
    position: "relative",
  },
  mainContent: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  waveformWrapper: {
    width: width * 0.85,
    height: 140,
    justifyContent: "center",
    alignItems: "center",
  },
  statusText: {
    marginTop: 20,
    fontSize: 16,
    color: "#555",
  },
});
