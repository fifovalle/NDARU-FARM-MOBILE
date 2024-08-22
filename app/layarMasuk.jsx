import React from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  ScrollView,
} from "react-native";
import { useRouter } from "expo-router";
// MODUL KAMI
import useHurufResponsif from "../hooks/useHurufResponsif";

export default function LayarMasuk() {
  const pengarah = useRouter();
  const gambarPenggunaMasuk = require("../assets/images/gambarMasuk.png");
  const ikonGoogle = require("../assets/images/ikonGoogle.png");
  const gayaHurufLexend400 = useHurufResponsif({
    android: "Lexend_400Regular",
    ios: "Lexend_400Regular",
  });
  const gayaHurufLexend500 = useHurufResponsif({
    android: "Lexend_500Medium",
    ios: "Lexend_500Medium",
  });
  const gayaHurufLexend700 = useHurufResponsif({
    android: "Poppins_700Bold",
    ios: "Poppins_700Bold",
  });

  return (
    <ScrollView className="flex-1 bg-[#E7E8E2]">
      <View className="flex p-6">
        <Image
          source={gambarPenggunaMasuk}
          className="h-[350px] w-full mt-24"
        />
        <Text
          style={{ fontFamily: gayaHurufLexend700 }}
          className="text-[#6B8F71] text-lg mb-2"
        >
          Nomor Ponsel:
        </Text>

        <View className="flex-row items-center border border-gray-400 rounded-lg p-3 mb-4">
          <Text
            style={{ fontFamily: gayaHurufLexend400 }}
            className="text-lg text-[#626262] mr-2 border w-12 h-8 text-center rounded-md border-gray-400"
          >
            +62
          </Text>
          <TextInput
            style={{ fontFamily: gayaHurufLexend400 }}
            placeholder="Masukan Nomor Ponsel Anda"
            keyboardType="phone-pad"
            placeholderTextColor={"#626262"}
            className="flex-1 text-md text-[#626262]"
            cursorColor={"#6B8F71"}
          />
        </View>

        <TouchableOpacity
          onPress={() => pengarah.push("/layarOTP")}
          activeOpacity={0.8}
          className="bg-[#3F5D44] py-4 rounded-lg mb-6"
        >
          <Text
            style={{ fontFamily: gayaHurufLexend700 }}
            className="text-white text-center text-lg"
          >
            Lanjutkan
          </Text>
        </TouchableOpacity>

        <Text
          style={{ fontFamily: gayaHurufLexend700 }}
          className="text-[#6B8F71] text-center mb-6"
        >
          ATAU
        </Text>

        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => {
            pengarah.push("/layarIdentitas");
          }}
          className="flex-row items-center justify-center border border-gray-400 py-3 rounded-lg"
        >
          <Image
            source={ikonGoogle}
            className="w-6 h-6 mr-2"
            style={{ resizeMode: "contain" }}
          />
          <Text
            style={{ fontFamily: gayaHurufLexend500 }}
            className="text-lg text-gray-700"
          >
            Masuk Dengan Google
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}
