import React from "react";
import { View, StyleSheet } from "react-native";

export const ProfileImage = () => (
  <View style={styles.container}>
    <View style={styles.circle} />
  </View>
);

const styles = StyleSheet.create({
  container: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#4285f4",
    justifyContent: "center",
    alignItems: "center",
  },
  circle: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: "rgba(255,255,255,0.8)",
  },
});
