import React from "react";
import { View, Text, StyleSheet } from "react-native";

export const TitleBar = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>MindHaven (alpha)</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingVertical: 12,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 16,
    color: "#000",
    opacity: 0.8,
  },
});
