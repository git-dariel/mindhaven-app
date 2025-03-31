import { SafeAreaView } from "react-native-safe-area-context";
import { TTSTest } from "@/components/TTSTest";
import { colors } from "@/constants/theme";

export default function HomeScreen() {
  return (
    <SafeAreaView
      className="flex-1"
      style={{ backgroundColor: colors.background }}
      edges={["right", "left"]}
    >
      <TTSTest />
      {/* <TestComponent /> */}
    </SafeAreaView>
  );
}
