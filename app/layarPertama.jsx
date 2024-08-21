import React, { useState } from "react";
import { SkypeIndicator } from "react-native-indicators";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
// MODUL KAMI
import useHurufResponsif from "../hooks/useHurufResponsif";

export default function LayarPertama() {
  const pengarah = useRouter();
  const [memuat, setMemuat] = useState(true);
  const gambarPetani = require("../assets/images/selamatDatang1.png");
  const gayaHurufLexend400 = useHurufResponsif({
    android: "Lexend_400Regular",
    ios: "Lexend_400Regular",
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
    <View className="flex-1 justify-center items-center bg-[#E7E8E2]">
      <View className="w-full flex items-center">
        <Text
          style={{ fontFamily: gayaHurufLexend400 }}
          className="text-[#447055] text-2xl"
        >
          Selamat Datang
        </Text>
        <Text
          style={{ fontFamily: gayaHurufLexend900 }}
          className="text-[#447055] text-2xl text-center"
        >
          Kami senang Anda ada di sini
        </Text>
      </View>

      <View className="my-6">
        {memuat && <SkypeIndicator size={120} color="#447055" />}
        <Image
          source={gambarPetani}
          className="w-[500px] h-[500px]"
          style={{ resizeMode: "contain" }}
          onLoad={() => setMemuat(false)}
        />
      </View>

      <View className="w-full items-end">
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => pengarah.push("/layarSelamatDatang")}
          className="bg-[#447055] py-3 px-6 rounded-l-xl"
        >
          <Text
            style={{ fontFamily: gayaHurufLexend700 }}
            className="text-white text-lg"
          >
            MARI KITA MULAI
          </Text>
        </TouchableOpacity>
      </View>

      <View className="absolute bottom-10 flex flex-row space-x-2">
        <View className="w-16 h-4 rounded-full bg-[#447055]" />
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => pengarah.push("/layarSelamatDatang")}
          className="w-10 h-4 rounded-full bg-[#FFFFFF]"
        />
      </View>
    </View>
  );
}
