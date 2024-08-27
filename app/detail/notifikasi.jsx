import React from "react";
import { View, Text, ScrollView, Image, TouchableOpacity } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { useRouter } from "expo-router";

// MODUL KAMI
import { gayaHuruf } from "../../constants/huruf";

export default function Transaksi() {
  const pengarah = useRouter();
  const pesan = require("../../assets/images/gambarPesan.png");

  return (
    <ScrollView className="flex-1 bg-[#E7E8E2] p-4">
      <View className="flex-row items-center mt-14 mb-8 px-2">
        <TouchableOpacity onPress={() => pengarah.back("../")}>
          <View className="w-10 h-10 rounded-full flex justify-center items-center">
            <FontAwesome name="arrow-left" size={24} color="green" />
          </View>
        </TouchableOpacity>

        <Text
          style={{ fontFamily: gayaHuruf.lexend900 }}
          className="text-lg ml-2"
        >
          Notifikasi
        </Text>
      </View>

      <View className="bg-white p-4 rounded-lg mb-4">
        <Text
          style={{ fontFamily: gayaHuruf.poppins700 }}
          className="text-base mb-2"
        >
          Status Pesanan
        </Text>
        <View className="border-b border-gray-200 mb-4" />

        <TouchableOpacity activeOpacity={0.6} className="flex-row items-start">
          <Image source={pesan} className="w-16 h-16" />
          <View className="ml-2">
            <View className="flex-row justify-between">
              <Text
                style={{ fontFamily: gayaHuruf.poppins700 }}
                className="text-md text-green-700"
              >
                Pembayaran Diverifikasi
              </Text>
            </View>
            <View className="w-72">
              <Text
                style={{ fontFamily: gayaHuruf.lexend400 }}
                className="text-sm mb-1"
              >
                Pembayaran telah diterima, pesanan akan diteruskan ke penjual.
              </Text>
            </View>
            <Text
              style={{ fontFamily: gayaHuruf.poppins500 }}
              className="text-sm"
            >
              12-08-2024 | 09.30
            </Text>
          </View>
        </TouchableOpacity>
        <View className="border-b border-gray-200 my-6" />
        <TouchableOpacity
          activeOpacity={0.6}
          className="flex-row items-start mb-4"
        >
          <Image source={pesan} className="w-16 h-16" />
          <View className="ml-2">
            <View className="flex-row justify-between">
              <Text
                style={{ fontFamily: gayaHuruf.poppins700 }}
                className="text-md text-green-700"
              >
                Pembayaran Diverifikasi
              </Text>
            </View>
            <View className="w-72">
              <Text
                style={{ fontFamily: gayaHuruf.lexend400 }}
                className="text-sm mb-1"
              >
                Pembayaran telah diterima, pesanan akan diteruskan ke penjual.
              </Text>
            </View>
            <Text
              style={{ fontFamily: gayaHuruf.poppins500 }}
              className="text-sm"
            >
              12-08-2024 | 09.30
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}
