import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Pressable,
  Image,
  ScrollView,
} from "react-native";
import React, { useState } from "react";
import {
  useFonts,
  Poppins_700Bold,
  Poppins_600SemiBold,
} from "@expo-google-fonts/poppins";
import Spanduk from "./components/spanduk";
import Kaki from "./components/kaki";
import KotakFormulir from "./components/kotakFormulir";

export default function LupaSandi() {
  const [email, aturEmail] = useState("");
  let [memuatFont] = useFonts({
    Poppins_700Bold,
    Poppins_600SemiBold,
  });
  if (!memuatFont) {
    return null;
  }

  return (
    <ScrollView className="flex-1" keyboardShouldPersistTaps="handled">
      <View className="flex-1">
        <Spanduk />
        <KotakFormulir>
          <View className="flex-none mt-10 bg-white px-8">
            <Text className="text-[#275229] font-bold text-[32px]">
              Jangan Khawatir!
            </Text>
            <Text className="text-[#7F7F7F] font-bold text-[16px] mt-10">
              Kami akan mengirimkan tautan untuk mengatur ulang kata sandi Anda
              ke email yang terdaftar.
            </Text>
          </View>
          <View className="mt-12 px-8">
            <View className="relative">
              <TextInput
                className="border-gray-300 border-b-2 py-2 focus:outline-none focus:border-[#275229]"
                onChangeText={aturEmail}
                value={email}
              />
              <Text
                className={`absolute top-0 left-0 text-gray-500 transition-all ${
                  email ? "text-sm -top-6" : "text-base top-2"
                }`}
                style={{
                  translateY: email ? -6 : 2,
                  opacity: email ? 0.5 : 1,
                }}
              >
                E-mail
              </Text>
            </View>
            <TouchableOpacity
              className="bg-[#275229] py-3 rounded-xl mt-[7.5rem] mx-8 shadow-md"
              activeOpacity={0.7}
            >
              <Text
                className="text-center text-white font-bold text-xl"
                style={{ fontFamily: "Poppins_700Bold" }}
              >
                Kirim Kode
              </Text>
            </TouchableOpacity>
          </View>
        </KotakFormulir>
      </View>
      <Kaki />
    </ScrollView>
  );
}
