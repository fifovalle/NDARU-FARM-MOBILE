import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Pressable,
  Image,
  ScrollView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Link } from "expo-router";
import React, { useState } from "react";
import {
  useFonts,
  Poppins_700Bold,
  Poppins_600SemiBold,
} from "@expo-google-fonts/poppins";
import Spanduk from "./components/spanduk";
import Kaki from "./components/kaki";
import KotakFormulir from "./components/kotakFormulir";
import TombolGabungDaftar from "./components/tombolGabungDaftar";

export default function HalamanGabung() {
  const [email, aturEmail] = useState("");
  const [kataSandi, aturKataSandi] = useState("");
  const [ceklis, aturCeklis] = useState(false);
  const [lihatkanKataSandi, aturLihatkanKataSandi] = useState(false);
  const [layarSekarang, aturLayarSekarang] = useState("index");
  const Mata = require("../../assets/images/Ikon2.png");
  const Mata2 = require("../../assets/images/Ikon5.png");
  const Google = require("../../assets/images/Ikon3.png");

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
          <TombolGabungDaftar
            layarSekarang={layarSekarang}
            aturLayarSekarang={aturLayarSekarang}
          />
          <View className="mt-10 px-8">
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
            <View className="relative mt-4">
              <TextInput
                className="border-gray-300 border-b-2 py-2 focus:outline-none focus:border-[#275229]"
                secureTextEntry={!lihatkanKataSandi}
                onChangeText={aturKataSandi}
                value={kataSandi}
              />
              <Text
                className={`absolute top-0 left-0 text-gray-500 transition-all ${
                  kataSandi ? "text-sm -top-6" : "text-base top-2"
                }`}
                style={{
                  translateY: kataSandi ? -6 : 0,
                  opacity: kataSandi ? 0.5 : 1,
                }}
              >
                Kata Sandi
              </Text>
              <Pressable
                onPress={() => aturLihatkanKataSandi(!lihatkanKataSandi)}
                className="absolute top-4 right-4"
              >
                <Image
                  source={lihatkanKataSandi ? Mata2 : Mata}
                  className="w-7 h-7"
                />
              </Pressable>
            </View>
            <View className="flex-row mt-4 justify-between">
              <View className="flex-row items-center">
                <Pressable
                  className={`w-5 h-5 justify-center items-center rounded ${
                    ceklis ? "bg-[#275229]" : "border-gray-300 border-2"
                  }`}
                  onPress={() => aturCeklis(!ceklis)}
                >
                  {ceklis && (
                    <Ionicons name="checkmark" size={12} color="white" />
                  )}
                </Pressable>
                <Text
                  className="ml-1 text-gray-500"
                  style={{ fontFamily: "Poppins_600SemiBold" }}
                >
                  Ingat Saya
                </Text>
              </View>
              <TouchableOpacity activeOpacity={0.7}>
                <Link
                  className="text-gray-500"
                  href={"/lupaSandi"}
                  replace={true}
                >
                  <Text
                    className=""
                    style={{ fontFamily: "Poppins_600SemiBold" }}
                  >
                    Lupa Sandi?
                  </Text>
                </Link>
              </TouchableOpacity>
            </View>
            <TouchableOpacity
              className="bg-[#275229] py-3 rounded-xl mt-8 mx-8 shadow-md"
              activeOpacity={0.7}
            >
              <Text
                className="text-center text-white font-bold text-xl"
                style={{ fontFamily: "Poppins_700Bold" }}
              >
                Bergabung
              </Text>
            </TouchableOpacity>
            <View className="flex-row justify-center mt-6">
              <Text
                className="text-gray-500"
                style={{ fontFamily: "Poppins_600SemiBold" }}
              >
                --ATAU--
              </Text>
            </View>
            <TouchableOpacity
              className="flex-row justify-center mt-2"
              activeOpacity={0.7}
            >
              <View className="bg-white border rounded-full p-2 shadow-md">
                <Image source={Google} className="w-6 h-6" />
              </View>
            </TouchableOpacity>
          </View>
        </KotakFormulir>
      </View>
      <Kaki />
    </ScrollView>
  );
}
