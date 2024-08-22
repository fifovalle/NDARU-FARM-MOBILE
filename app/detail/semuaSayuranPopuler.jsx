import React from "react";
import {
  View,
  Text,
  ScrollView,
  TextInput,
  Image,
  TouchableOpacity,
} from "react-native";
import { useRouter } from "expo-router";
import { FontAwesome } from "@expo/vector-icons";

// MODUL KAMI
import { gayaHuruf } from "../../constants/huruf";

export default function SemuaSayuranPopuler() {
  const pengarah = useRouter();
  const dataTidakAda = require("../../assets/images/dataTidakAda.png");
  const ikonCari = require("../../assets/images/ikonCari.png");

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
            Sayuran Populer
          </Text>
        </View>
        <TouchableOpacity
          onPress={() => pengarah.push("../detail/keranjang")}
          activeOpacity={0.4}
        >
          <View className="w-10 h-10 rounded flex justify-center items-center mr-5">
            <FontAwesome name="shopping-cart" size={24} color="#447055" />
          </View>
        </TouchableOpacity>
      </View>

      <ScrollView className="flex-1">
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
          <View className="flex-row justify-between flex-wrap">
            <View className="bg-white rounded-xl p-4 mb-4 w-[48%]">
              <TouchableOpacity
                activeOpacity={0.5}
                onPress={() =>
                  pengarah.push("/detail/detailPerSayuranPopuler/")
                }
              >
                <Image
                  source={dataTidakAda}
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
                  10.000
                </Text>
                <Text
                  style={{ fontFamily: gayaHuruf.poppins500 }}
                  className="text-gray-500"
                >
                  Stok 10
                </Text>
              </View>
              <TouchableOpacity activeOpacity={0.7} className="w-full">
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
    </View>
  );
}
