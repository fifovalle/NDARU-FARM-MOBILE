import React from "react";
import {
  View,
  Text,
  ScrollView,
  TextInput,
  Image,
  TouchableOpacity,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { useRouter } from "expo-router";
// MODUL KAMI
import { gayaHuruf } from "../../constants/huruf";
import { ucapanSalam } from "../../constants/ucapanSalam";

export default function Index() {
  const pengarah = useRouter();
  const ucapan = ucapanSalam();
  const ikonKeranjang = require("../../assets/images/ikonKeranjang1.png");
  const ikonCari = require("../../assets/images/ikonCari.png");

  return (
    <ScrollView className="bg-[#E7E8E2] flex-1">
      <View className="bg-[#556F50] p-4 flex-row items-center justify-between h-56 rounded-b-[35px]">
        <View className="mt-11 flex-row justify-between items-center w-full">
          <Text className="text-white text-lg mx-2">
            <Text style={{ fontFamily: gayaHuruf.poppins500 }}>{ucapan}</Text>{" "}
            <Text style={{ fontFamily: gayaHuruf.poppins700 }}>
              Nama Pelanggan
            </Text>
          </Text>
          <TouchableOpacity
            activeOpacity={0.6}
            onPress={() => pengarah.push("../../detail/checkout")}
          >
            <View className="relative mr-5">
              <Image className="w-10 h-10" source={ikonKeranjang}></Image>
              <View className="absolute -top-2 -right-2 bg-red-600 rounded-full w-4 h-4 flex items-center justify-center">
                <Text
                  style={{ fontFamily: gayaHuruf.poppins700 }}
                  className="text-white text-xs"
                >
                  1
                </Text>
              </View>
            </View>
          </TouchableOpacity>
        </View>
      </View>

      <View className="p-4">
        <View className="bg-white rounded-2xl flex-row items-center px-3 py-2">
          <Image source={ikonCari} className="w-6 h-6" />
          <TextInput
            style={{ fontFamily: gayaHuruf.lexend400 }}
            placeholder="Silahkan Cari..."
            className="ml-2 w-80 text-gray-700"
          />
        </View>
      </View>

      <View className="p-4">
        <View className="p-4 flex-row justify-between items-center">
          <Text
            style={{ fontFamily: gayaHuruf.lexend900 }}
            className="text-[#556F50] text-xl"
          >
            Sayuran Populer
          </Text>
          <TouchableOpacity
            activeOpacity={0.6}
            onPress={() => pengarah.push("../detail/detailSayuranPopuler")}
          >
            <View className="flex-row items-center">
              <Text
                style={{ fontFamily: gayaHuruf.poppins500 }}
                className="text-[#447055] text-sm mr-[4px] underline"
              >
                Lihat Semua
              </Text>
              <FontAwesome name="caret-right" size={20} color="#447055" />
            </View>
          </TouchableOpacity>
        </View>
        <View className="flex-row justify-between flex-wrap">
          <View className="bg-white rounded-xl p-4 mb-4 w-[48%]">
            <TouchableOpacity
              activeOpacity={0.5}
              onPress={() =>
                pengarah.push(`../detail/detailPerSayuranPopuler?id`)
              }
            >
              <Image
                source={ikonCari}
                className="w-full h-32 object-cover rounded-xl"
              />
            </TouchableOpacity>

            <Text
              style={{ fontFamily: gayaHuruf.lexend400 }}
              className="text-gray-500"
            >
              10kg
            </Text>
            <View className="flex-row items-center justify-between mt-2">
              <Text
                style={{ fontFamily: gayaHuruf.poppins700 }}
                className="text-black"
              >
                10K
              </Text>
              <Text
                style={{ fontFamily: gayaHuruf.poppins500 }}
                className="text-gray-500"
              >
                Stok 1
              </Text>
            </View>
            <TouchableOpacity activeOpacity={0.6} className="w-full">
              <View className="mt-3 flex bg-[#447055] rounded-md p-2">
                <Text
                  style={{ fontFamily: gayaHuruf.poppins500 }}
                  className="text-[#ffffff] text-center"
                >
                  + Keranjang
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}
