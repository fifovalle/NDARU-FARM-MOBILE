import React from "react";
import { View, TextInput, Image, TouchableOpacity } from "react-native";
import {
  useFonts,
  Poppins_700Bold,
  Poppins_600SemiBold,
} from "@expo-google-fonts/poppins";

export default function BarPencaharian() {
  const ikonCari = require("../../../assets/images/ikon6.png");
  const ikonMenu = require("../../../assets/images/ikon7.png");
  const avatarPengguna = require("../../../assets/images/1.jpg");
  let [memuatFont] = useFonts({
    Poppins_700Bold,
    Poppins_600SemiBold,
  });
  if (!memuatFont) {
    return null;
  }

  return (
    <View className="flex-row items-center mt-10 justify-evenly">
      <View className="flex-row items-center justify-between border-2 border-[#275229] mb-4 w-64 h-11 mt-[1.2rem] rounded-full">
        <TextInput
          className="ml-5 font-bold w-44"
          placeholder="Cari..."
          placeholderTextColor={"#275229"}
        />
        <TouchableOpacity className="mr-4">
          <Image className="w-6 h-6" source={ikonCari} />
        </TouchableOpacity>
      </View>
      <TouchableOpacity className="ml-2 ">
        <Image className="w-10 h-10 rounded-3xl" source={avatarPengguna} />
      </TouchableOpacity>
      <TouchableOpacity className="ml-2">
        <Image className="w-8 h-8" source={ikonMenu} />
      </TouchableOpacity>
    </View>
  );
}
