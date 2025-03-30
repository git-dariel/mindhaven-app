import React from "react";
import { View, Text, StyleSheet, Animated } from "react-native";
import { colors, spacing } from "../constants/theme";
import { MaterialCommunityIcons } from "@expo/vector-icons";

interface Props {
  isAnimating: boolean;
}

export const AIHeader: React.FC<Props> = ({ isAnimating }) => {
  return (
    <View style={styles.container}>
      <View style={styles.iconContainer}>
        <MaterialCommunityIcons name="robot" size={28} color={colors.primary} style={styles.icon} />
        <View style={styles.statusDot} />
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.welcomeText}>
          {isAnimating ? "I'm listening..." : "Hi, I'm MindHaven"}
        </Text>
        <Text style={styles.descriptionText}>Your personal mental health companion</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: spacing.xl,
    paddingTop: spacing.xl,
    paddingBottom: spacing.m,
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.m,
  },
  iconContainer: {
    position: "relative",
  },
  icon: {
    opacity: 0.9,
  },
  statusDot: {
    position: "absolute",
    right: -2,
    top: -2,
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: colors.primary,
    borderWidth: 2,
    borderColor: colors.background,
  },
  textContainer: {
    flex: 1,
  },
  welcomeText: {
    fontSize: 20,
    fontWeight: "600",
    color: colors.text,
    marginBottom: 2,
  },
  descriptionText: {
    fontSize: 14,
    color: colors.textSecondary,
    opacity: 0.8,
  },
});
