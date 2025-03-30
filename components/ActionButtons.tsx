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
        <Feather name={isListening ? "pause" : "play"} size={32} color={colors.background} />
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
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    paddingVertical: spacing.l,
  },
  playButton: {
    width: 64,
    height: 64,
    borderRadius: borderRadius.circle,
    backgroundColor: colors.primary,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: colors.text,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  playButtonActive: {
    backgroundColor: colors.primaryDark,
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
