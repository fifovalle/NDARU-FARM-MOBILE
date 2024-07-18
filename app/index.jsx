import { StatusBar } from "expo-status-bar";
import { View } from "react-native";
import HalamanLogin from "./screens/HalamanLogin";

export default function Index() {
  return (
    <View className="flex-1 bg-white">
      <StatusBar style="auto" />
      <HalamanLogin />
    </View>
  );
}
