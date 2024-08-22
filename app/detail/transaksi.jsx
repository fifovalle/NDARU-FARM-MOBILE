import React from "react";
import { View, Text, ScrollView, Image, TouchableOpacity } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { useRouter } from "expo-router";

// MODUL KAMI
import { gayaHuruf } from "../../constants/huruf";

export default function Transaksi() {
  const pengarah = useRouter();

  const ikonPelacakan = [
    require("../../assets/images/trackIcon1Active.png"),
    require("../../assets/images/trackIcon2.png"),
    require("../../assets/images/trackIcon3.png"),
    require("../../assets/images/trackIcon4.png"),
  ];

  const ikonCek = require("../../assets/images/trackCek.png");
  const ikonUnCek = require("../../assets/images/trackUncek.png");

  return (
    <ScrollView className="flex-1 bg-[#E7E8E2] p-4">
      <View className="flex-row items-center mb-4 mt-12">
        <TouchableOpacity
          activeOpacity={0.6}
          onPress={() => pengarah.push("../beranda/transaksi")}
        >
          <FontAwesome name="arrow-left" size={24} color="green" />
        </TouchableOpacity>
        <Text
          style={{ fontFamily: gayaHuruf.poppins700 }}
          className="text-lg ml-2 text-[#447055]"
        >
          Rincian Pesanan
        </Text>
      </View>

      <View>
        <View className="flex-row mx-auto items-center my-5 gap-8">
          {ikonPelacakan.map((ikon, indeks) => (
            <Image key={indeks} className="w-14 h-14" source={ikon} />
          ))}
        </View>

        <View className="flex-row mx-auto items-center justify-between w-4/5">
          {Array(4)
            .fill(null)
            .map((_, indeks) => (
              <React.Fragment key={indeks}>
                <View className="flex item-center rounded-full">
                  <Image
                    className="w-10 h-10"
                    source={indeks === 0 ? ikonCek : ikonUnCek}
                  />
                </View>
                {indeks < 3 && <View className="h-1 flex-1 bg-gray-300" />}
              </React.Fragment>
            ))}
        </View>

        <View className="flex-row mx-auto items-center mt-6 mb-10 gap-8">
          <Text className="text-center text-green-600">Pesanan Dikemas</Text>
        </View>
      </View>

      <View className="bg-white p-4 rounded-lg mb-4">
        <Text
          style={{ fontFamily: gayaHuruf.poppins700 }}
          className="text-base mb-2"
        >
          Status Pemesanan
        </Text>
        <View className="border-b border-gray-200 mb-4" />

        {Array(2)
          .fill(null)
          .map((_, indeks) => (
            <View key={indeks} className="flex-row items-start mb-4">
              <View className="flex-col items-center">
                <FontAwesome
                  className="z-10"
                  name="circle"
                  size={12}
                  color="green"
                />
                <View className="h-28 border border-green-700 -mt-3 -mb-2" />
              </View>
              <View className="ml-2">
                <View className="flex-row justify-between">
                  <Text
                    style={{ fontFamily: gayaHuruf.poppins700 }}
                    className="text-sm text-green-700"
                  >
                    Pembayaran Diverifikasi
                  </Text>
                  <Text className="text-sm text-grey-500">17.57 WIB</Text>
                </View>
                <Text
                  style={{ fontFamily: gayaHuruf.poppins700 }}
                  className="text-sm"
                >
                  Jumat, 15 Agustus 2024
                </Text>
                <Text
                  style={{ fontFamily: gayaHuruf.lexend400 }}
                  className="text-sm mt-1"
                >
                  Pembayaran telah diterima, pesanan akan diteruskan ke penjual.
                </Text>
              </View>
            </View>
          ))}
      </View>

      <View className="bg-white p-4 rounded-lg">
        <Text
          style={{ fontFamily: gayaHuruf.poppins700 }}
          className="text-base mb-1"
        >
          Info Pengiriman
        </Text>
        <View className="border-b border-gray-200 mb-5" />

        <View className="flex-row items-center mb-1">
          <Text
            className="w-24 ml-8"
            style={{ fontFamily: gayaHuruf.poppins700 }}
          >
            Kurir:
          </Text>
          <Text className="text-sm">JNT Reguler</Text>
        </View>
        <View className="flex-row items-center mb-1">
          <Text
            className="w-24 ml-8"
            style={{ fontFamily: gayaHuruf.poppins700 }}
          >
            No Resi:
          </Text>
          <Text className="text-sm">IDID27643401202</Text>
        </View>
        <View className="flex-row items-center mb-2">
          <Text
            className="w-24 ml-8"
            style={{ fontFamily: gayaHuruf.poppins700 }}
          >
            Alamat:
          </Text>
          <Text className="text-sm w-[200px]">
            Naufal, 0812345678900, Kosan alizar kost lantai 2 Cimahi Tengah Kota
            Cimahi Jawa Barat 40678
          </Text>
        </View>
      </View>
    </ScrollView>
  );
}
