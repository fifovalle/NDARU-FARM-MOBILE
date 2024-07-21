import { View, Image } from "react-native";
import React from "react";

export default function KepalaAutentikasi() {
  return (
    <View>
      <View className="w-full h-80">
        <Image
          source={require("../assets/images/Kepala.png")}
          className="object-cover w-full h-full"
        />
      </View>
    </View>
  );
}
