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

export default function HalamanGabung() {
  const [email, aturEmail] = useState("");
  const [kataSandi, aturKataSandi] = useState("");
  const [ceklis, aturCeklis] = useState(false);
  const [lihatkanKataSandi, aturLihatkanKataSandi] = useState(false);
  const Mata = require("../../assets/images/Ikon2.png");
  const Mata2 = require("../../assets/images/Ikon5.png");
  const Google = require("../../assets/images/Ikon3.png");
  const Gambar1 = require("../../assets/images/Kepala.png");

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
        <View className="w-full h-80">
          <Image source={Gambar1} className="object-cover w-full h-full" />
        </View>
        <View
          className="w-[330px] h-[440px] mx-auto rounded-2xl mt-3 bg-white"
          style={{
            shadowColor: "#000",
            shadowOffset: {
              width: 0,
              height: 8,
            },
            shadowOpacity: 0.44,
            shadowRadius: 10.32,
            elevation: 16,
          }}
        >
          <View className="flex-row mt-10 justify-evenly w-80 mx-auto bg-white">
            <TouchableOpacity
              className="bg-[#275229] px-8 py-3 rounded-full z-10 shadow-md w-[11rem] ml-4"
              activeOpacity={0.7}
            >
              <Link href={"/"} className="text-white text-center text-lg">
                <Text style={{ fontFamily: "Poppins_700Bold" }}>Bergabung</Text>
              </Link>
            </TouchableOpacity>
            <TouchableOpacity
              className="bg-white px-8 py-3 rounded-r-full shadow-md border border-l-0 border-[#275229] w-[11rem] mr-4"
              activeOpacity={0.7}
            >
              <Link
                className="text-[#275229] text-center text-lg"
                href={"/daftar"}
              >
                <Text style={{ fontFamily: "Poppins_700Bold" }}>Mendaftar</Text>
              </Link>
            </TouchableOpacity>
          </View>
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
                <Text
                  className="text-gray-500"
                  style={{ fontFamily: "Poppins_600SemiBold" }}
                >
                  Lupa Sandi?
                </Text>
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
        </View>
      </View>
      <View className="h-[5rem] rounded-t-xl shadow mt-2 bg-[#D9D9D9] p-4 flex-row justify-center">
        <Text
          className="text-[#7F7F7F] text-center"
          style={{ fontFamily: "Poppins_600SemiBold" }}
        >
          Hak Cipta {new Date().getFullYear()} Ndaru Farm
        </Text>
      </View>
    </ScrollView>
  );
}
