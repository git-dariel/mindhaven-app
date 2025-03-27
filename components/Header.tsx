import React from "react";
import { View, Text, Image, StyleSheet, StatusBar } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export const Header = () => {
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <StatusBar barStyle="light-content" />
      <View style={styles.content}>
        <Text style={styles.time}>4:10 AM</Text>
        <View style={styles.statusIcons}>
          <Text style={styles.statusText}>0.00</Text>
          <Text style={styles.statusText}>K/S</Text>
          <Text style={styles.statusText}>4G</Text>
          <Text style={styles.statusText}>LTE</Text>
          <Text style={styles.batteryText}>82%</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#1a1a1a",
  },
  content: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    height: 44,
  },
  time: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "500",
  },
  statusIcons: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  statusText: {
    color: "#fff",
    fontSize: 12,
  },
  batteryText: {
    color: "#fff",
    fontSize: 12,
    marginLeft: 4,
  },
});
