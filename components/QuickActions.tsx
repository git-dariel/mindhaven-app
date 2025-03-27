import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from "react-native";

interface ActionButtonProps {
  title: string;
  subtitle: string;
}

const ActionButton = ({ title, subtitle }: ActionButtonProps) => (
  <TouchableOpacity style={styles.actionButton}>
    <Text style={styles.actionTitle}>{title}</Text>
    <Text style={styles.actionSubtitle}>{subtitle}</Text>
  </TouchableOpacity>
);

export const QuickActions = () => {
  return (
    <View style={styles.wrapper}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.container}
      >
        <ActionButton title="Tell me what" subtitle="you can do" />
        <ActionButton title="Help me" subtitle="plan" />
        <ActionButton title="Research" subtitle="a topic" />
        <ActionButton title="Help me" subtitle="write" />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: "#1a1a1a",
    paddingBottom: 16,
  },
  container: {
    flexDirection: "row",
    paddingHorizontal: 12,
    gap: 8,
  },
  actionButton: {
    backgroundColor: "rgba(32, 33, 36, 0.9)",
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 16,
    alignItems: "flex-start",
    minWidth: 85,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.1)",
  },
  actionTitle: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "500",
  },
  actionSubtitle: {
    color: "rgba(255,255,255,0.5)",
    fontSize: 12,
    marginTop: 2,
  },
});
