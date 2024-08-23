import React from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";

const BeritaPopuler = ({ memuatBerita, dataTidakAda, gayaHuruf, pengarah }) => {
  const gambar = require("../assets/images/gambarPesan.png");
  return (
    <>
      <View className="p-4 flex-row justify-between items-center mt-5">
        <Text
          style={{ fontFamily: gayaHuruf.lexend900 }}
          className="text-[#556F50] text-xl"
        >
          Berita Populer
        </Text>
        <TouchableOpacity
          activeOpacity={0.6}
          onPress={() => pengarah.push("../detail/semuaBeritaPopuler")}
        >
          <View className="flex-row items-center">
            <Text
              style={{ fontFamily: gayaHuruf.poppins500 }}
              className="text-[#447055] text-sm px-2 underline"
            >
              Lihat Semua
            </Text>
            <FontAwesome name="caret-right" size={20} color="#447055" />
          </View>
        </TouchableOpacity>
      </View>
      <TouchableOpacity
        activeOpacity={0.7}
        className="flex items-center justify-center mb-6"
        onPress={() => pengarah.push("../detail/beritaPopuler")}
      >
        <View className="flex-row bg-white rounded-xl w-full p-6">
          <View className="w-28 h-28 rounded-xl">
            <Image className="w-full h-full rounded-xl" source={gambar}></Image>
          </View>
          <View className="px-4 w-[200px]">
            <Text
              className="text-justify"
              style={{ fontFamily: gayaHuruf.poppins700 }}
            >
              Simulasi Imbal Hasil HDIODHW, Bisa Dapat hingga Rp.480 Juta per
              Hari
            </Text>
            <Text
              className="text-sm text-gray-500"
              style={{ fontFamily: gayaHuruf.lexend400 }}
            >
              Kategori
            </Text>
          </View>
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        activeOpacity={0.7}
        className="flex items-center justify-center mb-6"
        onPress={() => pengarah.push("../detail/beritaPopuler")}
      >
        <View className="flex-row bg-white rounded-xl w-full p-6">
          <View className="w-28 h-28 rounded-xl">
            <Image className="w-full h-full rounded-xl" source={gambar}></Image>
          </View>
          <View className="px-4 w-[200px]">
            <Text
              className="text-justify"
              style={{ fontFamily: gayaHuruf.poppins700 }}
            >
              Simulasi Imbal Hasil HDIODHW, Bisa Dapat hingga Rp.480 Juta per
              Hari
            </Text>
            <Text
              className="text-sm text-gray-500"
              style={{ fontFamily: gayaHuruf.lexend400 }}
            >
              Kategori
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    </>
  );
};

export default BeritaPopuler;
