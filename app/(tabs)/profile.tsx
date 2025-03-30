import { StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ThemedText } from "@/components/ThemedText";
import { colors } from "@/constants/theme";

export default function ProfileScreen() {
  return (
    <SafeAreaView style={styles.container} edges={["right", "left"]}>
      <ThemedText style={styles.text}>Profile Screen</ThemedText>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontSize: 18,
    color: colors.text,
  },
});
