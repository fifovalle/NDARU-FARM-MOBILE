import React from "react";
import { View, ScrollView, Text, TouchableOpacity, Image } from "react-native";
import {
  useFonts,
  Poppins_700Bold,
  Poppins_600SemiBold,
  Poppins_900Black_Italic,
} from "@expo-google-fonts/poppins";
import BarPencaharian from "./components/barPencaharian";
import Spanduk from "./components/spanduk";

export default function index() {
  const ikonPanah = require("../../assets/images/ikon8.png");
  const ikonKategori1 = require("../../assets/images/ikon9.png");
  const ikonKategori2 = require("../../assets/images/ikon10.png");
  const ikonKategori3 = require("../../assets/images/ikon11.png");
  let [memuatFont] = useFonts({
    Poppins_700Bold,
    Poppins_600SemiBold,
    Poppins_900Black_Italic,
  });
  if (!memuatFont) {
    return null;
  }

  return (
    <ScrollView className="flex-1 p-4" keyboardShouldPersistTaps="handled">
      <View className="flex-1">
        <BarPencaharian />
        <Spanduk />
        <View className="mb-4 mt-2">
          <View className="flex-row justify-between items-center mb-4">
            <Text
              className="text-lg text-[#275229]"
              style={{ fontFamily: "Poppins_700Bold" }}
            >
              Kategori
            </Text>
            <TouchableOpacity className="flex-row" activeOpacity={0.6}>
              <Text
                className="text-[#FAA322] mr-1"
                style={{ fontFamily: "Poppins_700Bold" }}
              >
                Lihat Semua
              </Text>
              <Image className="w-4 h-4 mt-1" source={ikonPanah} />
            </TouchableOpacity>
          </View>
          <View className="flex-row justify-around">
            <TouchableOpacity className="items-center" activeOpacity={0.5}>
              <View className="bg-[#275229] p-3 rounded-xl mb-2">
                <View className="bg-white rounded-full h-16 w-16 mx-auto">
                  <Image className="w-10 h-10 m-auto" source={ikonKategori1} />
                </View>
                <Text
                  className="text-white my-4"
                  style={{ fontFamily: "Poppins_600SemiBold" }}
                >
                  Sayuran
                </Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity className="items-center" activeOpacity={0.5}>
              <View className="bg-white border boder-[#275229] p-3 rounded-xl mb-2">
                <View className="bg-[#275229] rounded-full h-16 w-16 mx-auto">
                  <Image className="w-10 h-10 m-auto" source={ikonKategori2} />
                </View>
                <Text
                  className="text-[#275229] my-4"
                  style={{ fontFamily: "Poppins_600SemiBold" }}
                >
                  Perikanan
                </Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity className="items-center" activeOpacity={0.5}>
              <View className="bg-white border boder-[#275229] p-3 rounded-xl mb-2">
                <View className="bg-[#275229] rounded-full h-16 w-16 mx-auto">
                  <Image className="w-10 h-10 m-auto" source={ikonKategori3} />
                </View>
                <Text
                  className="text-[#275229] my-4"
                  style={{ fontFamily: "Poppins_600SemiBold" }}
                >
                  Pelatihan
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}
