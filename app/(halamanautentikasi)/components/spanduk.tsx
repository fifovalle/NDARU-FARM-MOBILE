import { View, Image } from "react-native";
import React from "react";

export default function Spanduk() {
  const GambarSpanduk = require("../../../assets/images/Kepala.png");
  return (
    <View className="w-full h-80">
      <Image source={GambarSpanduk} className="object-cover w-full h-full" />
    </View>
  );
}
