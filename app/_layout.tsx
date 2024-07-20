import "../global.css";
import React from "react";
import { View } from "react-native";
import Bergabung from "./screens/Bergabung";

export default function RootLayout() {
  return (
    <View className="flex-1 h-full">
      <Bergabung />
    </View>
  );
}
