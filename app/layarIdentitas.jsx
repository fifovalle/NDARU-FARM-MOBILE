import {
  View,
  Text,
  TextInput,
  Image,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import React, { useState } from "react";
import { router } from "expo-router";
import { RadioButton } from "react-native-paper";
import useGayaHuruf from "../hooks/useGayaHuruf";

export default function LayarIdentitas() {
  const [jenisKelamin, setJenisKelamin] = useState();

  const gayaHurufRegular = useGayaHuruf({
    android: "Lexend_400Regular",
    ios: "Lexend_400Regular",
  });

  const gayaHurufBlack = useGayaHuruf({
    android: "Lexend_900Black",
    ios: "Inter-Blak",
  });

  const gayaHurufBold = useGayaHuruf({
    android: "Poppins_700Bold",
    ios: "Poppins_700Bold",
  });

  return (
    <ScrollView className="flex-1 bg-[#E7E8E2]">
      <View className="p-6 mt-[70px]">
        <View className="flex-1 items-center justify-center">
          <Image
            source={require("../assets/images/gambarIdentitas.png")}
            className="h-[350px] w-[350px]"
            style={{ resizeMode: "contain" }}
          />
        </View>

        <View className="mt-8">
          <View className="mb-4">
            <Text
              style={{ fontFamily: gayaHurufBlack }}
              className="text-lg text-[#447055]"
            >
              Nama Lengkap :
            </Text>
            <View className="flex-row items-center border border-gray-400 rounded-lg p-2 mt-2">
              <Image
                source={require("../assets/images/ikonNamaPengguna.png")}
                className="h-10 w-10 border border-gray-400 rounded"
                style={{ resizeMode: "contain" }}
              />
              <TextInput
                style={{ fontFamily: gayaHurufRegular }}
                placeholder="Masukan Nama Lengkap Anda"
                className="ml-2 flex-1 text-gray-600"
              />
            </View>
          </View>

          <View className="mb-4">
            <Text
              style={{ fontFamily: gayaHurufBlack }}
              className="text-lg text-[#447055]"
            >
              Umur :
            </Text>
            <View className="flex-row items-center border border-gray-400 rounded-lg p-2 mt-2">
              <Image
                source={require("../assets/images/ikonUmur.png")}
                className="h-10 w-10 border border-gray-400 rounded"
                style={{ resizeMode: "contain" }}
              />
              <TextInput
                inputMode="numeric"
                style={{ fontFamily: gayaHurufRegular }}
                placeholder="Masukan Umur Anda"
                className="ml-2 flex-1 text-gray-600"
              />
            </View>
          </View>

          <View className="mb-8">
            <Text
              style={{ fontFamily: gayaHurufBlack }}
              className="text-lg text-[#447055]"
            >
              Jenis Kelamin :
            </Text>
            <View className="flex-row items-center mt-2 mx-2">
              <RadioButton
                value="Pria"
                status={jenisKelamin === "Pria" ? "checked" : "unchecked"}
                color="#447055"
                onPress={() => setJenisKelamin("Pria")}
              />
              <Text style={{ fontFamily: gayaHurufRegular }}>Pria</Text>

              <RadioButton
                value="Wanita"
                status={jenisKelamin === "Wanita" ? "checked" : "unchecked"}
                color="#447055"
                onPress={() => setJenisKelamin("Wanita")}
              />
              <Text style={{ fontFamily: gayaHurufRegular }}>Wanita</Text>
            </View>
          </View>

          <TouchableOpacity
            onPress={() => router.push("/(beranda)")}
            activeOpacity={0.8}
            className="bg-[#447055] rounded-lg p-4"
          >
            <Text
              style={{ fontFamily: gayaHurufBold }}
              className="text-white text-center text-lg"
            >
              Simpan
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}
