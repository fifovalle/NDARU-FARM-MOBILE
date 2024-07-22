import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { Link } from "expo-router";
import {
  useFonts,
  Poppins_700Bold,
  Poppins_600SemiBold,
} from "@expo-google-fonts/poppins";
import Spanduk from "./components/spanduk";
import Kaki from "./components/kaki";
import KotakFormulir from "./components/kotakFormulir";

export default function CekEmail() {
  let [memuatFont] = useFonts({
    Poppins_700Bold,
    Poppins_600SemiBold,
  });
  if (!memuatFont) {
    return null;
  }

  return (
    <View className="flex-1">
      <Spanduk />
      <KotakFormulir>
        <View className="flex-none mt-10 bg-white px-8">
          <Text
            className="text-[#275229] text-[30px]"
            style={{ fontFamily: "Poppins_700Bold" }}
          >
            Cek Email Anda!
          </Text>
          <Text
            className="text-[#7F7F7F] text-[16px] mt-10"
            style={{ fontFamily: "Poppins_600SemiBold" }}
          >
            Periksa kotak masuk Anda untuk tautan mengatur ulang kata sandi.
          </Text>
          <TouchableOpacity className="mt-[14rem]">
            <Link href={"/lupaSandi"} className="text-center">
              <Text
                className="text-[#7F7F7F] text-[14px]"
                style={{ fontFamily: "Poppins_600SemiBold" }}
              >
                Belum menerima email?
              </Text>
            </Link>
          </TouchableOpacity>
        </View>
      </KotakFormulir>
      <Kaki />
    </View>
  );
}
