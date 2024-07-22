import { View, Text } from "react-native";
import React from "react";

export default function Kaki() {
  return (
    <View className="h-[5rem] rounded-t-xl shadow mt-3 bg-[#D9D9D9] p-4 flex-row justify-center">
      <Text
        className="text-[#7F7F7F] text-center"
        style={{ fontFamily: "Poppins_600SemiBold" }}
      >
        Hak Cipta {new Date().getFullYear()} Syntax Squads
      </Text>
    </View>
  );
}
