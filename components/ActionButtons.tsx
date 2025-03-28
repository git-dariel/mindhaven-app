import { Feather } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { colors, borderRadius, spacing } from "../constants/theme";

interface ActionButtonsProps {
  isListening: boolean;
  onToggleListening: () => void;
  onClose?: () => void;
}

export const ActionButtons: React.FC<ActionButtonsProps> = ({
  isListening,
  onToggleListening,
  onClose,
}) => {
  return (
    <View style={styles.actionContainer}>
      <TouchableOpacity
        style={[styles.playButton, isListening ? styles.playButtonActive : {}]}
        onPress={onToggleListening}
      >
        <Feather name={isListening ? "pause" : "play"} size={24} color={colors.text} />
      </TouchableOpacity>

      {onClose && (
        <TouchableOpacity style={styles.closeButton} onPress={onClose}>
          <Feather name="x" size={24} color={colors.background} />
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  actionContainer: {
    position: "absolute",
    bottom: spacing.xxl,
    left: 0,
    right: 0,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: spacing.xl,
  },
  playButton: {
    width: 48,
    height: 48,
    borderRadius: borderRadius.circle,
    backgroundColor: colors.border,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: colors.text,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  playButtonActive: {
    backgroundColor: colors.primaryLight,
  },
  closeButton: {
    width: 48,
    height: 48,
    borderRadius: borderRadius.circle,
    backgroundColor: colors.secondary,
    justifyContent: "center",
    alignItems: "center",
  },
});
