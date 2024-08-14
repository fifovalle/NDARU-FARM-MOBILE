import { View, Text, Image, TouchableOpacity, Platform } from "react-native";
import React from "react";
import { router } from "expo-router";

export default function LayarSelamatDatang() {
  const gambarSelamatDatang = require("../assets/images/selamatDatang1.png");
  return (
    <View className="flex-1 justify-center items-center bg-[#E7E8E2]">
      <View className="w-full flex items-center">
        <Text
          style={{
            fontFamily: Platform.select({
              android: "Lexend_400Regular",
              ios: "Lexend_400Regular",
            }),
          }}
          className="text-[#447055] text-2xl"
        >
          Selamat Datang
        </Text>
        <Text
          style={{
            fontFamily: Platform.select({
              android: "Lexend_900Black",
              ios: "Inter-Black",
            }),
          }}
          className="text-[#447055] text-2xl text-center"
        >
          Kami senang Anda ada di sini
        </Text>
      </View>

      <View className="my-6">
        <Image
          source={gambarSelamatDatang}
          className="w-[500px] h-[500px]"
          style={{ resizeMode: "contain" }}
        />
      </View>

      <View className="w-full items-end">
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => router.push("/layarSelamatDatang")}
          className="bg-[#447055] py-3 px-6 rounded-l-xl"
        >
          <Text
            style={{
              fontFamily: Platform.select({
                android: "Poppins_700Bold",
                ios: "Poppins_700Bold",
              }),
            }}
            className="text-white text-lg"
          >
            MARI KITA MULAI
          </Text>
        </TouchableOpacity>
      </View>

      <View className="absolute bottom-10 flex flex-row space-x-2">
        <View className="w-16 h-4 rounded-full bg-[#447055]" />
        <View className="w-10 h-4 rounded-full bg-[#FFFFFF]" />
      </View>
    </View>
  );
}
