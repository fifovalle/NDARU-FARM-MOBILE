import { View, Text, TouchableOpacity, Image, ScrollView } from "react-native";
import React from "react";
import { router } from "expo-router";
import { FontAwesome } from "@expo/vector-icons";

// MODUL KAMI
import { gayaHuruf } from "../../constants/huruf";
import useCheckoutSayuran from "../../hooks/useCheckoutSayuran";

export default function Checkout() {
  const ikonWortel = require("../../assets/images/ikonWortel.png");

  const { keranjang, formatRupiah, hitungTotalHarga, simpanCheckout } =
    useCheckoutSayuran();

  return (
    <View className="flex-1 bg-[#E7E8E2]">
      <View className="px-4 flex-1">
        <View className="flex-row items-center mb-4 mt-12">
          <TouchableOpacity
            className="p-2 rounded-full"
            activeOpacity={0.6}
            onPress={() => router.back("")}
          >
            <FontAwesome name="arrow-left" size={24} color="green" />
          </TouchableOpacity>
          <Text
            style={{ fontFamily: gayaHuruf.poppins700 }}
            className="text-lg ml-2 text-[#447055]"
          >
            Checkout
          </Text>
        </View>

        <ScrollView>
          <TouchableOpacity
            activeOpacity={0.7}
            className="bg-white px-4 py-2 rounded-xl shadow-xl"
          >
            <View className="flex-row items-start">
              <FontAwesome name="map-marker" size={24} color="green" />
              <Text
                style={{ fontFamily: gayaHuruf.poppins700 }}
                className="ml-2 text-[#447055] mb-2"
              >
                Alamat Pengiriman
              </Text>
            </View>

            <View className="mx-5 flex-row items-center">
              <View className="w-[270px] mr-2">
                <Text style={{ fontFamily: gayaHuruf.lexend400 }}>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Dolorem, dolor!
                </Text>
              </View>
              <View className="w-10">
                <Text style={{ fontFamily: gayaHuruf.lexend400 }}>
                  <FontAwesome name="chevron-right" size={12} color="green" />
                </Text>
              </View>
            </View>
          </TouchableOpacity>

          {keranjang.map((checkout) => (
            <View
              key={checkout.id}
              className="bg-white px-4 py-2 rounded-xl shadow-xl mt-5"
            >
              <View className="flex-row items-center">
                <View className="w-16 h-16 bg-gray-200 rounded-lg mr-4 flex items-center justify-center mb-2">
                  <Image
                    className="w-14 h-14"
                    source={{ uri: checkout.Gambar_Keranjang }}
                  />
                </View>
                <View>
                  <Text
                    style={{ fontFamily: gayaHuruf.poppins700 }}
                    className="text-lg"
                  >
                    {checkout.Nama_Keranjang}
                  </Text>
                  <Text
                    style={{ fontFamily: gayaHuruf.lexend400 }}
                    className="text-sm text-gray-500"
                  >
                    {checkout.Jumlah_Keranjang}kg x{" "}
                    {formatRupiah(checkout.Harga_Keranjang)}
                  </Text>
                </View>
              </View>
              <View className="border w-full border-gray-300" />
              <View className="flex-row items-center justify-between w-full mt-3 px-2">
                <Text
                  style={{ fontFamily: gayaHuruf.lexend400 }}
                  className="text-gray-500"
                >
                  Total Harga ({checkout.Jumlah_Keranjang} Barang)
                </Text>
                <Text style={{ fontFamily: gayaHuruf.lexend400 }}>
                  {formatRupiah(
                    checkout.Harga_Keranjang * checkout.Jumlah_Keranjang
                  )}
                </Text>
              </View>
            </View>
          ))}
        </ScrollView>
      </View>

      <View className="w-screen h-20 bg-white justify-evenly items-center flex-row">
        <View className="px-8">
          <Text style={{ fontFamily: gayaHuruf.poppins700 }}>Total Harga</Text>
          <Text style={{ fontFamily: gayaHuruf.poppins700 }}>
            {formatRupiah(hitungTotalHarga())}
          </Text>
        </View>

        <TouchableOpacity
          activeOpacity={0.8}
          onPress={simpanCheckout}
          className="bg-[#447055] rounded-lg w-52 h-14 items-center justify-center p-3 mr-8"
        >
          <Text
            style={{ fontFamily: gayaHuruf.poppins700 }}
            className="text-lg text-[white]"
          >
            Beli Sekarang
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
