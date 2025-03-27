import React from "react";
import { View, Text, StyleSheet } from "react-native";

export const Greeting = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.greeting}>
        <Text style={styles.helloText}>Hello</Text>
        <Text style={styles.comma}>, </Text>
        <Text style={styles.nameText}>Dariel</Text>
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#1a1a1a",
  },
  greeting: {
    fontSize: 40,
    lineHeight: 48,
  },
  helloText: {
    color: "#4285f4", // Google Blue
    fontWeight: "600",
  },
  comma: {
    color: "#fff",
  },
  nameText: {
    color: "#ea4335", // Google Red
    fontWeight: "600",
  },
});
