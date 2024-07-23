import { View, Text, TouchableOpacity, Image } from "react-native";
import React from "react";
import {
  useFonts,
  Poppins_700Bold,
  Poppins_900Black_Italic,
} from "@expo-google-fonts/poppins";

export default function Spanduk() {
  const latarSpanduk = require("../../../assets/images/latarspanduk.png");
  const mobilSpanduk = require("../../../assets/images/mobilSpanduk.png");
  let [memuatFont] = useFonts({
    Poppins_700Bold,
    Poppins_900Black_Italic,
  });
  if (!memuatFont) {
    return null;
  }

  return (
    <View
      className="bg-[#275229] px-4 rounded-lg mb-4 mt-4 relative"
      style={{
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
      }}
    >
      <Image
        className="h-44 w-44 absolute right-0 bottom-0"
        source={latarSpanduk}
      />
      <Text
        className="text-white -mb-4 text-center mt-3"
        style={{ fontFamily: "Poppins_900Black_Italic" }}
      >
        <Text className="text-[#FAA322]">Tinggal klik,</Text> sayuran segar
        langsung tiba di <Text className="text-[#FAA322]">rumah anda!</Text>
      </Text>
      <View className="flex-row items-center justify-between">
        <Image className="h-32 w-32 -ml-5" source={mobilSpanduk} />
        <TouchableOpacity
          className="bg-[#FAA322] p-2 rounded mr-5"
          activeOpacity={0.8}
        >
          <Text
            className="text-white text-center text-lg"
            style={{ fontFamily: "Poppins_700Bold" }}
          >
            Pesan Sekarang
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
