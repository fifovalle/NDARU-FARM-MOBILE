import { View, Text, TouchableOpacity, Image, ScrollView } from "react-native";
import React from "react";
import { router } from "expo-router";
import { FontAwesome } from "@expo/vector-icons";

// MODUL KAMI
import { gayaHuruf } from "../../constants/huruf";

export default function Checkout() {
  const ikonWortel = require("../../assets/images/ikonWortel.png");

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

          <View className="bg-white px-4 py-2 rounded-xl shadow-xl mt-5">
            <View className="flex items-start justify-between">
              <View className="flex-row items-center justify-between w-full mt-3">
                <View className="flex items-start">
                  <Text
                    style={{ fontFamily: gayaHuruf.poppins700 }}
                    className="text-md text-[#447055]"
                  >
                    Rincian Belanja :
                  </Text>
                </View>
              </View>

              <View className="flex-row items-center">
                <View className="w-16 h-16 bg-gray-200 rounded-lg mr-4 flex items-center mb-2">
                  <Image className="w-14 h-14" source={ikonWortel} />
                </View>
                <View>
                  <Text
                    style={{ fontFamily: gayaHuruf.poppins700 }}
                    className="text-lg"
                  >
                    Wortel
                  </Text>
                  <Text
                    style={{ fontFamily: gayaHuruf.lexend400 }}
                    className="text-sm text-gray-500"
                  >
                    2kg x Rp. 20.000
                  </Text>
                </View>
              </View>

              <View className="border w-full border-gray-300" />

              <View className="flex-row items-center justify-between w-full mt-3 px-2">
                <Text
                  style={{ fontFamily: gayaHuruf.lexend400 }}
                  className="text-gray-500"
                >
                  Total Harga (2 Barang)
                </Text>
                <Text style={{ fontFamily: gayaHuruf.lexend400 }}>
                  Rp. 40.000
                </Text>
              </View>

              <View className="flex-row items-center justify-between w-full mt-3 px-2">
                <Text
                  style={{ fontFamily: gayaHuruf.lexend400 }}
                  className="text-gray-500"
                >
                  Total Ongkos Kirim
                </Text>
                <Text style={{ fontFamily: gayaHuruf.lexend400 }}>
                  Rp. 20.000
                </Text>
              </View>

              <View className="flex-row items-center justify-between w-full mt-3 px-2">
                <Text
                  style={{ fontFamily: gayaHuruf.lexend400 }}
                  className="text-gray-500"
                >
                  Biaya Jasa Aplikasi
                </Text>
                <Text style={{ fontFamily: gayaHuruf.lexend400 }}>Rp. 500</Text>
              </View>

              <View className="border w-24 border-gray-300 self-end mr-2" />

              <View className="flex-row items-center justify-between w-full mt-2 px-2">
                <Text style={{ fontFamily: gayaHuruf.poppins700 }}>
                  Total Harga
                </Text>
                <Text style={{ fontFamily: gayaHuruf.poppins700 }}>
                  Rp. 60.500
                </Text>
              </View>
            </View>
          </View>
        </ScrollView>
      </View>

      <View className="w-screen h-20 bg-white justify-evenly items-center flex-row">
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => router.push("../detail/checkout")}
          className="bg-[#447055] rounded-lg w-96 items-center justify-center p-3"
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
