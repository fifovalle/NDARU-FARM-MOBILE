import React from "react";
import {
  View,
  Text,
  TextInput,
  Image,
  ScrollView,
  TouchableOpacity,
  ImageBackground,
} from "react-native";
import { useRouter } from "expo-router";
import { FontAwesome } from "@expo/vector-icons";

// MODUL KAMI
import { gayaHuruf } from "../../constants/huruf";

export default function Pesan() {
  const pengarah = useRouter();
  const ikonWortel = require("../../assets/images/ikonWortel.png");
  const layarPesan = require("../../assets/images/gambarPesan.png");

  return (
    <View className="flex-1 bg-[#E7E8E2] px-2">
      <View className="flex-row items-center p-4 border-b border-gray-300 mt-12">
        <TouchableOpacity
          onPress={() => pengarah.back("beranda/pesan")}
          className="mr-4"
        >
          <FontAwesome name="arrow-left" size={24} color="green" />
        </TouchableOpacity>
        <View className="flex-1 flex-row items-center">
          <View className="w-14 h-14 bg-white rounded-full mr-3 overflow-hidden flex items-center justify-center">
            <Image source={ikonWortel} className="w-14 h-14 object-cover" />
          </View>
          <View>
            <Text
              style={{ fontFamily: gayaHuruf.lexend900 }}
              className="text-green-900"
            >
              Naufal FIFA
            </Text>
            <Text
              style={{ fontFamily: gayaHuruf.poppins500 }}
              className="text-sm"
            >
              online
            </Text>
          </View>
        </View>
        <TouchableOpacity activeOpacity={0.4}>
          <FontAwesome name="search" size={20} color="green" />
        </TouchableOpacity>
      </View>

      <ImageBackground className="w-screen flex-1" source={layarPesan}>
        <ScrollView className="px-4 py-2">
          <View className="flex items-center">
            <Text
              style={{ fontFamily: gayaHuruf.poppins500 }}
              className="text-center mb-2 mt-2 text-white bg-black w-20 rounded-lg"
            >
              Hari ini
            </Text>
          </View>
        </ScrollView>
      </ImageBackground>

      <View className="flex-row items-center p-4 border-t border-gray-300 w-full mb-2">
        <View className="flex-row w-full h-[70px] bg-white rounded-full overflow-hidden flex items-center justify-center">
          <TouchableOpacity activeOpacity={0.4} className="mr-2">
            <FontAwesome name="plus-circle" size={26} color="black" />
          </TouchableOpacity>
          <View className="flex-row items-center ml-3 bg-[#E7E8E2] rounded-full w-72">
            <TextInput
              style={{ fontFamily: gayaHuruf.poppins500 }}
              placeholder="Tulis pesan..."
              className="flex-1 p-3 text-gray-700"
            />
            <TouchableOpacity activeOpacity={0.4} className="p-2 mr-4">
              <FontAwesome name="send" size={22} color="black" />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
}
