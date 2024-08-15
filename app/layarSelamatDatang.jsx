import { View, Text, TouchableOpacity, Image, Platform } from "react-native";
import React from "react";
import { router } from "expo-router";

export default function LayarSelamatDatang2() {
  const gambarSelamatDatang = require("../assets/images/selamatDatang2.png");
  return (
    <View className="flex-1 items-center justify-center bg-[#E7E8E2]">
      <View className="my-[50px]">
        <Image
          source={gambarSelamatDatang}
          className="w-[350px] h-[350px] mb-4 mx-auto"
          resizeMode="contain"
        />
        <Text
          style={{
            fontFamily: Platform.select({
              android: "Lexend_900Black",
              ios: "Lexend_900Black",
            }),
          }}
          className="text-2xl text-center text-[#365432] mb-2"
        >
          Temukan Jenis Sayuran Anda
        </Text>
        <Text
          style={{
            fontFamily: Platform.select({
              android: "Lexend_400Regular",
              ios: "Lexend_400Regular",
            }),
          }}
          className="text-base text-center text-[#365432]"
        >
          Beli Sayuran Segar Disini Tempatnya
        </Text>
      </View>

      <View className="w-full items-end my-[110px]">
        <TouchableOpacity
          onPress={() => router.push("/layarMasuk")}
          activeOpacity={0.7}
          className="bg-[#365432] py-3 px-8 rounded-l-xl"
        >
          <Text
            style={{
              fontFamily: Platform.select({
                android: "Poppins_700Bold",
                ios: "Poppins_700Bold",
              }),
            }}
            className="text-white text-xl text-center"
          >
            BUAT AKUN
          </Text>
        </TouchableOpacity>
      </View>

      <View className="absolute bottom-10 flex flex-row space-x-2">
        <View className="w-16 h-4 rounded-full bg-[#fff]" />
        <View className="w-10 h-4 rounded-full bg-[#447055]" />
      </View>
    </View>
  );
}
