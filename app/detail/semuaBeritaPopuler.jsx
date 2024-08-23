import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TextInput,
  Image,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { useRouter } from "expo-router";
import { FontAwesome } from "@expo/vector-icons";

// MODUL KAMI
import { gayaHuruf } from "../../constants/huruf";
import formatRupiah from "../../utils/formatRupiah";

export default function SemuaJasaPopuler() {
  const [kataPencarian, setKataPencarian] = useState("");
  const pengarah = useRouter();
  const dataTidakAda = require("../../assets/images/dataTidakAda.png");
  const ikonCari = require("../../assets/images/ikonCari.png");
  const gambar = require("../../assets/images/gambarPesan.png");

  const semuaDataJasaPopuler = [
    {
      id: 1,
      Nama_Jasa: "Jasa 1",
      Gambar_Jasa: "https://example.com/gambar1.jpg",
      Jangka_Waktu_Jasa: "3",
      Harga_Jasa: 50000,
    },
  ];

  const memuatSemuaJasaPopuler = false;
  const hasilPencarianJasaPopuler = kataPencarian
    ? semuaDataJasaPopuler
    : semuaDataJasaPopuler;

  return (
    <View className="flex-1 bg-[#E7E8E2]">
      <View className="flex-row items-center mt-14 px-4 mb-2">
        <TouchableOpacity onPress={() => pengarah.back("../")} className="mr-4">
          <View className="w-10 h-10 rounded-full flex justify-center items-center">
            <FontAwesome name="arrow-left" size={24} color="green" />
          </View>
        </TouchableOpacity>
        <View className="flex-1 flex-row items-center">
          <Text
            style={{ fontFamily: gayaHuruf.lexend900 }}
            className="text-lg text-[#447055]"
          >
            Berita Populer
          </Text>
        </View>
      </View>

      <ScrollView className="flex-1">
        <View className="p-4">
          <View className="bg-white rounded-2xl flex-row items-center px-3 py-2">
            <Image source={ikonCari} className="w-6 h-6" />
            <TextInput
              style={{ fontFamily: gayaHuruf.lexend400 }}
              placeholder="Cari Berita..."
              className="ml-2 w-80 text-gray-700"
              value={kataPencarian}
              onChangeText={(teks) => setKataPencarian(teks)}
            />
          </View>
        </View>

        <TouchableOpacity
          activeOpacity={0.7}
          className="flex items-center justify-center mb-6 px-2"
          onPress={() => pengarah.push("../detail/beritaPopuler")}
        >
          <View className="flex-row bg-white rounded-xl w-full p-6">
            <View className="w-28 h-28 rounded-xl">
              <Image
                className="w-full h-full rounded-xl"
                source={gambar}
              ></Image>
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
          className="flex items-center justify-center mb-6 px-2"
          onPress={() => pengarah.push("../detail/beritaPopuler")}
        >
          <View className="flex-row bg-white rounded-xl w-full p-6">
            <View className="w-28 h-28 rounded-xl">
              <Image
                className="w-full h-full rounded-xl"
                source={gambar}
              ></Image>
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
      </ScrollView>
    </View>
  );
}
