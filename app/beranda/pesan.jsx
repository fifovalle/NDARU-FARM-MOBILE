import React from "react";
import {
  View,
  Text,
  TextInput,
  Image,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { useRouter } from "expo-router";

// MODUL KAMI
import { gayaHuruf } from "../../constants/huruf";

export default function Pesan() {
  const pengarah = useRouter();
  const ikonPencarian = require("../../assets/images/ikonCari.png");
  const ikonWortel = require("../../assets/images/ikonWortel.png");

  return (
    <View className="flex-1 bg-[#E7E8E2] px-3">
      <View className="flex-row items-center p-4 mt-12 mb-3">
        <Text
          style={{ fontFamily: gayaHuruf.lexend900 }}
          className="text-lg ml-2"
        >
          Pesan
        </Text>
      </View>

      <View className="flex-row items-center bg-white rounded-full px-4 py-2 mb-2">
        <Image className="w-7 h-7" source={ikonPencarian} />
        <TextInput
          style={{ fontFamily: gayaHuruf.lexend400 }}
          placeholder="Cari Kontak..."
          className="ml-2 flex-1"
          placeholderTextColor="gray"
        />
      </View>

      <ScrollView className="px-4">
        <TouchableOpacity
          onPress={() => pengarah.push("../detail/pesan")}
          activeOpacity={0.6}
          className="flex-row items-center py-2 my-2"
        >
          <View className="w-20 h-20 bg-gray-500 rounded-full mr-3 overflow-hidden flex items-center justify-center">
            <Image source={ikonWortel} className="w-20 h-20 object-cover" />
          </View>
          <View className="flex-1">
            <Text
              style={{
                fontFamily: gayaHuruf.lexend900,
                color: "black",
              }}
              className="text-lg"
            >
              Naufal FIFA
            </Text>
            <Text
              style={{
                fontFamily: gayaHuruf.lexend400,
                color: "black",
              }}
              className="text-lg"
            >
              Isi Pesan
            </Text>
          </View>
          <View className="bg-red-600 w-6 h-6 rounded-full justify-center items-center">
            <Text
              style={{ fontFamily: gayaHuruf.lexend700 }}
              className="text-white text-xs"
            >
              10
            </Text>
          </View>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}
