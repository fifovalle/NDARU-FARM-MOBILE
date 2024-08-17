import { View, Text, TextInput, TouchableOpacity, Image } from "react-native";
import React from "react";
import { router } from "expo-router";
import useGayaHuruf from "../../hooks/useGayaHuruf";

export default function Transaksi() {
  const ikonWortel = require("../../assets/images/ikonWortel.png");
  const ikonPencarian = require("../../assets/images/ikonCari.png");
  const ikonkeranjang2 = require("../../assets/images/ikonKeranjang2.png");
  const gayaHurufRegular = useGayaHuruf({
    android: "Lexend_400Regular",
    ios: "Lexend_400Regular",
  });

  const gayaHurufBlack = useGayaHuruf({
    android: "Lexend_900Black",
    ios: "Lexend_900Black",
  });

  const gayaHurufMedium = useGayaHuruf({
    android: "Poppins_500Medium",
    ios: "Poppins_500Medium",
  });

  const gayaHurufBold = useGayaHuruf({
    android: "Poppins_700Bold",
    ios: "Poppins_700Bold",
  });

  return (
    <View className="flex-1 bg-[#E7E8E2] px-4">
      <View className="flex-row items-center mt-14 mb-8">
        <Text style={{ fontFamily: gayaHurufBlack }} className="text-lg ml-4">
          Transaksi
        </Text>
      </View>

      <View className="flex-row items-center bg-white rounded-full px-4 py-2 mb-4">
        <Image className="w-7 h-7" source={ikonPencarian} />
        <TextInput
          style={{ fontFamily: gayaHurufRegular }}
          placeholder="Cari transaksi"
          className="ml-2 flex-1"
          placeholderTextColor="gray"
        />
      </View>

      <View className="bg-white p-4 rounded-xl shadow-xl">
        <TouchableOpacity
          onPress={() => router.push("../detail/detailTransaksi")}
          activeOpacity={0.6}
        >
          <View className="flex-row items-center justify-between mb-2">
            <View className="flex-row items-center">
              <Image className="w-10 h-10" source={ikonkeranjang2} />
              <View className="ml-3">
                <Text
                  style={{ fontFamily: gayaHurufBold }}
                  className="text-md text-gray-500"
                >
                  Belanja
                </Text>
                <Text
                  style={{ fontFamily: gayaHurufRegular }}
                  className="text-sm text-gray-400"
                >
                  16 Agu 2024
                </Text>
              </View>
            </View>
            <View className="flex-row items-center justify-center bg-[#59e3a73d] p-1 rounded-lg">
              <Text
                style={{ fontFamily: gayaHurufBold }}
                className="text-sm text-center w-16 text-[#0CD058]"
              >
                Selesai
              </Text>
            </View>
          </View>
        </TouchableOpacity>
        <View className="border-b border-gray-300 mb-3 " />
        <View className="flex items-start justify-between">
          <View className="flex-row items-center ">
            <View className="w-16 h-16 bg-gray-200 rounded-lg mr-4 flex items-center">
              <Image className="w-14 h-14" source={ikonWortel} />
            </View>
            <View>
              <Text style={{ fontFamily: gayaHurufBold }} className="text-lg">
                Wortel
              </Text>
              <Text
                style={{ fontFamily: gayaHurufRegular }}
                className="text-sm text-gray-500"
              >
                2kg
              </Text>
            </View>
          </View>
          <View className="flex-row items-center justify-between w-full mt-4">
            <View className="flex items-start">
              <Text
                style={{ fontFamily: gayaHurufBold }}
                className="text-md text-[#626262]"
              >
                Total Belanja :
              </Text>
              <Text
                style={{ fontFamily: gayaHurufBold }}
                className="text-lg text-green-700"
              >
                RP 50.000
              </Text>
            </View>
            <TouchableOpacity
              activeOpacity={0.5}
              className="mt-2 bg-[#447055] py-1 px-4 rounded-md"
            >
              <Text
                style={{ fontFamily: gayaHurufBold }}
                className="text-center text-white"
              >
                Beli Lagi
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
}
