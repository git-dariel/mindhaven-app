import React from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import { Feather } from "@expo/vector-icons";

export const ChatInput = () => {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.addButton}>
        <Feather name="plus" size={24} color="white" />
      </TouchableOpacity>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Ask Gemini"
          placeholderTextColor="rgba(255,255,255,0.5)"
        />
      </View>

      <TouchableOpacity style={styles.micButton}>
        <Feather name="mic" size={24} color="white" />
      </TouchableOpacity>

      <TouchableOpacity style={styles.aiButton}>
        <View style={styles.aiButtonInner}>
          <Feather name="grid" size={20} color="white" />
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,
    paddingVertical: 8,
    backgroundColor: "#1a1a1a",
    borderTopWidth: 1,
    borderTopColor: "rgba(255,255,255,0.1)",
    paddingBottom: 16,
  },
  addButton: {
    width: 44,
    height: 44,
    justifyContent: "center",
    alignItems: "center",
  },
  inputContainer: {
    flex: 1,
    height: 44,
    backgroundColor: "rgba(32, 33, 36, 0.9)",
    borderRadius: 24,
    marginHorizontal: 8,
    paddingHorizontal: 16,
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.1)",
  },
  input: {
    color: "#fff",
    fontSize: 16,
  },
  micButton: {
    width: 44,
    height: 44,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 8,
  },
  aiButton: {
    width: 44,
    height: 44,
    justifyContent: "center",
    alignItems: "center",
  },
  aiButtonInner: {
    width: 36,
    height: 36,
    backgroundColor: "rgba(32, 33, 36, 0.9)",
    borderRadius: 18,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.1)",
  },
});
