import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { colors, fontSizes, spacing } from "../constants/theme";

export const TitleBar: React.FC = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>MindHaven (alpha)</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: spacing.xl,
    paddingVertical: spacing.m,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: fontSizes.small,
    color: colors.text,
    opacity: 0.8,
  },
});
