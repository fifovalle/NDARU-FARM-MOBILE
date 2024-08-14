import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  ScrollView,
  Platform,
} from "react-native";
import React from "react";
import { router } from "expo-router";

export default function LayarMasuk() {
  const gambarOtentikasi = require("../assets/images/gambarMasuk.png");
  const gambarGoogle = require("../assets/images/ikonGoogle.png");

  return (
    <ScrollView className="flex-1">
      <View className="flex p-6">
        <Image source={gambarOtentikasi} className="h-[350px] w-full mt-24" />

        <Text
          style={{
            fontFamily: Platform.select({
              android: "Lexend_700Bold",
              ios: "Lexend_700Bold",
            }),
          }}
          className="text-[#6B8F71] text-lg mb-2"
        >
          Nomor Ponsel:
        </Text>

        <View className="flex-row items-center border border-gray-400 rounded-lg p-3 mb-4">
          <Text
            style={{
              fontFamily: Platform.select({
                android: "Lexend_400Regular",
                ios: "Lexend_400Regular",
              }),
            }}
            className="text-lg text-[#626262] mr-2 border w-12 h-8 text-center rounded-md border-gray-400"
          >
            +62
          </Text>
          <TextInput
            style={{
              fontFamily: Platform.select({
                android: "Lexend_400Regular",
                ios: "Lexend_400Regular",
              }),
            }}
            placeholder="Masukan Nomor Ponsel Anda"
            keyboardType="phone-pad"
            placeholderTextColor={"#626262"}
            className="flex-1 text-md text-[#626262]"
            cursorColor={"#6B8F71"}
          />
        </View>

        <TouchableOpacity
          onPress={() => router.push("/layarOTP")}
          activeOpacity={0.8}
          className="bg-[#3F5D44] py-4 rounded-lg mb-6"
        >
          <Text
            style={{
              fontFamily: Platform.select({
                android: "Lexend_700Bold",
                ios: "Lexend_700Bold",
              }),
            }}
            className="text-white text-center text-lg"
          >
            Lanjutkan
          </Text>
        </TouchableOpacity>

        <Text
          style={{
            fontFamily: Platform.select({
              android: "Lexend_700Bold",
              ios: "Lexend_700Bold",
            }),
          }}
          className="text-[#6B8F71] text-center mb-6"
        >
          ATAU
        </Text>

        <TouchableOpacity
          activeOpacity={0.7}
          className="flex-row items-center justify-center border border-gray-400 py-3 rounded-lg"
        >
          <Image
            source={gambarGoogle}
            className="w-6 h-6 mr-2"
            style={{ resizeMode: "contain" }}
          />
          <Text
            style={{
              fontFamily: Platform.select({
                android: "Lexend_500Medium",
                ios: "Lexend_500Medium",
              }),
            }}
            className="text-lg text-gray-700"
          >
            Masuk Dengan Google
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}
