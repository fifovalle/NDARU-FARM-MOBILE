import { View, Image } from "react-native";
import React from "react";

export default function KepalaAutentikasi() {
  const Gambar1 = require("../../assets/images/Kepala.png");
  return (
    <View>
      <View className="w-full h-80">
        <Image source={Gambar1} className="object-cover w-full h-full" />
      </View>
    </View>
  );
}
