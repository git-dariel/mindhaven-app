import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { colors, spacing } from "../constants/theme";

export const TitleBar: React.FC = () => {
  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>MindHaven AI</Text>
        <Text style={styles.subtitle}>Your Mental Health Companion</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: spacing.xl * 2,
    paddingBottom: spacing.xl,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "transparent",
  },
  titleContainer: {
    alignItems: "center",
    gap: spacing.s,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: colors.text,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 18,
    color: colors.textSecondary,
    textAlign: "center",
  },
});
