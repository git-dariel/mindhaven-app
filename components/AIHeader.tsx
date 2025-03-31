import React from "react";
import { View, Text } from "react-native";
import { colors, spacing } from "../constants/theme";
import { MaterialCommunityIcons } from "@expo/vector-icons";

interface Props {
  isAnimating: boolean;
}

export const AIHeader: React.FC<Props> = ({ isAnimating }) => {
  return (
    <View
      style={{
        paddingHorizontal: spacing.xl,
        paddingTop: spacing.xl,
        paddingBottom: spacing.m,
        gap: spacing.m,
      }}
      className="flex-row items-center"
    >
      <View className="relative">
        <MaterialCommunityIcons
          name="robot"
          size={28}
          color={colors.primary}
          style={{ opacity: 0.9 }}
        />
        <View
          className="absolute rounded-full border-2"
          style={{
            right: -2,
            top: -2,
            width: 10,
            height: 10,
            backgroundColor: colors.primary,
            borderColor: colors.background,
          }}
        />
      </View>
      <View className="flex-1">
        <Text className="text-xl font-semibold" style={{ color: colors.text, marginBottom: 2 }}>
          {isAnimating ? "I'm listening..." : "Hi, I'm MindHaven"}
        </Text>
        <Text className="text-sm" style={{ color: colors.textSecondary, opacity: 0.8 }}>
          Your personal mental health companion
        </Text>
      </View>
    </View>
  );
};
