import { SafeAreaView } from "react-native-safe-area-context";
import { ThemedText } from "@/components/ThemedText";
import { colors } from "@/constants/theme";

export default function ProfileScreen() {
  return (
    <SafeAreaView
      className="flex-1 items-center justify-center"
      style={{ backgroundColor: colors.background }}
      edges={["right", "left"]}
    >
      <ThemedText className="text-lg" style={{ color: colors.text }}>
        Profile Screen
      </ThemedText>
    </SafeAreaView>
  );
}
