import { Feather } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";

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
        <Feather name={isListening ? "pause" : "play"} size={24} color="#000" />
      </TouchableOpacity>

      <TouchableOpacity style={styles.closeButton} onPress={onClose}>
        <Feather name="x" size={24} color="#fff" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  actionContainer: {
    position: "absolute",
    bottom: 40,
    left: 0,
    right: 0,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  playButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "#E8E8E8",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  playButtonActive: {
    backgroundColor: "#75c9fb",
  },
  closeButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "#FF5A5A",
    justifyContent: "center",
    alignItems: "center",
  },
});
