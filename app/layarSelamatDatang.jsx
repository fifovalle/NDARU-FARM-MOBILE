import React, { useState } from "react";
import { SkypeIndicator } from "react-native-indicators";
import { View, Text, TouchableOpacity, Image } from "react-native";
import { useRouter } from "expo-router";
// MODUL KAMI
import useHurufResponsif from "../hooks/useHurufResponsif";

export default function LayarSelamatDatang() {
  const pengarah = useRouter();
  const [memuat, setMemuat] = useState(true);
  const gambarBungaPot = require("../assets/images/selamatDatang2.png");
  const gayaHurufLexend400 = useHurufResponsif({
    android: "Lexend_400Regular",
    ios: "Lexend_900Black",
  });
  const gayaHurufLexend700 = useHurufResponsif({
    android: "Poppins_700Bold",
    ios: "Poppins_700Bold",
  });
  const gayaHurufLexend900 = useHurufResponsif({
    android: "Lexend_900Black",
    ios: "Lexend_900Black",
  });

  return (
    <View className="flex-1 items-center justify-center bg-[#E7E8E2]">
      <View className="my-[50px]">
        {memuat && <SkypeIndicator size={120} color="#365432" />}
        <Image
          source={gambarBungaPot}
          className="w-[350px] h-[350px] mb-4 mx-auto"
          resizeMode="contain"
          onLoad={() => setMemuat(false)}
        />
        <Text
          style={{ fontFamily: gayaHurufLexend900 }}
          className="text-2xl text-center text-[#365432] mb-2"
        >
          Temukan Jenis Sayuran Anda
        </Text>
        <Text
          style={{ fontFamily: gayaHurufLexend400 }}
          className="text-base text-center text-[#365432]"
        >
          Beli Sayuran Segar Disini Tempatnya
        </Text>
      </View>

      <View className="w-full items-end my-[110px]">
        <TouchableOpacity
          onPress={() => pengarah.push("/layarMasuk")}
          activeOpacity={0.7}
          className="bg-[#365432] py-3 px-8 rounded-l-xl"
        >
          <Text
            style={{ fontFamily: gayaHurufLexend700 }}
            className="text-white text-xl text-center"
          >
            BUAT AKUN
          </Text>
        </TouchableOpacity>
      </View>

      <View className="absolute bottom-10 flex flex-row space-x-2">
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => pengarah.push("/layarPertama")}
          className="w-16 h-4 rounded-full bg-[#fff]"
        />
        <View className="w-10 h-4 rounded-full bg-[#447055]" />
      </View>
    </View>
  );
}
