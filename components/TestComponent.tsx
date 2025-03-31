import { Text, View } from "react-native";

export function TestComponent() {
  return (
    <View className="flex-1 items-center justify-center bg-blue-500 p-4">
      <Text className="text-white text-2xl font-bold">Hello NativeWind!</Text>
      <Text className="text-yellow-300 mt-2">Styles are working!</Text>
    </View>
  );
}
