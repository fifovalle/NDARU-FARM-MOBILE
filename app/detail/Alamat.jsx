import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  ScrollView,
} from "react-native";
import React from "react";
import { useRouter } from "expo-router";
import { FontAwesome } from "@expo/vector-icons";
import Toast from "react-native-toast-message";

// MODUL KAMI
import { gayaHuruf } from "../../constants/huruf";

export default function Keranjang() {
  const ikonPencarian = require("../../assets/images/ikonCari.png");
  const pengarah = useRouter();

  return (
    <View className="flex-1 bg-[#E7E8E2]">
      <Toast />
      <View className="flex-row items-center mt-14 mb-8 px-4 -z-50">
        <TouchableOpacity onPress={() => pengarah.back("../")}>
          <View className="w-10 h-10 rounded-full flex justify-center items-center">
            <FontAwesome name="arrow-left" size={24} color="green" />
          </View>
        </TouchableOpacity>

        <Text
          style={{ fontFamily: gayaHuruf.lexend900 }}
          className="text-lg ml-4"
        >
          Pilih Alamat
        </Text>
      </View>

      <View className="flex-row items-center bg-white rounded-full px-4 py-2 mb-4 mx-4">
        <Image className="w-7 h-7" source={ikonPencarian} />
        <TextInput
          style={{ fontFamily: gayaHuruf.lexend400 }}
          placeholder="Cari alamat..."
          className="ml-2 flex-1"
          placeholderTextColor="gray"
        />
      </View>

      <ScrollView className="px-4">
        <View className="bg-white p-3 rounded-xl shadow-xl mb-4">
          <View className="flex-row items-center justify-between">
            <View className="flex-row items-center">
              <TouchableOpacity activeOpacity={0.4}>
                <FontAwesome name="check-square" size={24} color="green" />
              </TouchableOpacity>
              <Text
                className="ml-2 text-base"
                style={{ fontFamily: gayaHuruf.poppins700 }}
              >
                Naufal Fadhil
              </Text>
              <Text
                className="ml-2 text-base"
                style={{ fontFamily: gayaHuruf.poppins500 }}
              >
                |
              </Text>
              <Text
                className="ml-2 text-base"
                style={{ fontFamily: gayaHuruf.poppins700 }}
              >
                08987654321
              </Text>
            </View>
            <TouchableOpacity
              activeOpacity={0.4}
              className="mr-2 w-6 h-6 rounded-full items-center justify-center"
              onPress={() => pengarah.push("../../detail/suntingAlamat")}
            >
              <FontAwesome name="pencil" size={16} color="green" />
            </TouchableOpacity>
          </View>
          <View className="items-start ml-6 mb-2">
            <Text
              className="ml-2 text-sm w-80"
              style={{ fontFamily: gayaHuruf.lexend400 }}
            >
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Saepe
              labore a consequuntur exercitationem, nesciunt amet quod molestias
              culpa. Ullam veritatis quia dignissimos laudantium voluptatibus in
              autem pariatur quisquam animi illum?
            </Text>
            <Text
              className="ml-2 w-80 text-sm"
              style={{ fontFamily: gayaHuruf.lexend400 }}
            >
              BATUJAJAR, KAB. BANDUNG, JAWA BARAT, ID 40561
            </Text>
          </View>
          <View className="flex-row items-center ml-8">
            <View className="w-14 border border-green-500 rounded-md mr-2">
              <Text
                className="text-green-500 text-sm text-center"
                style={{ fontFamily: gayaHuruf.lexend400 }}
              >
                Utama
              </Text>
            </View>
            <View className="w-24 border border-gray-500 rounded-md mr-2">
              <Text
                className="text-gray-500 text-sm text-center"
                style={{ fontFamily: gayaHuruf.lexend400 }}
              >
                Alamat Toko
              </Text>
            </View>
            <View className="w-28 border border-gray-500 rounded-md mr-2">
              <Text
                className="text-gray-500 text-sm text-center"
                style={{ fontFamily: gayaHuruf.lexend400 }}
              >
                Alamat Rumah
              </Text>
            </View>
          </View>
        </View>
        <View className="bg-white p-3 rounded-xl shadow-xl mb-4">
          <View className="flex-row items-center justify-between">
            <View className="flex-row items-center">
              <TouchableOpacity activeOpacity={0.4}>
                <FontAwesome name="check-square" size={24} color="gray" />
              </TouchableOpacity>
              <Text
                className="ml-2 text-base"
                style={{ fontFamily: gayaHuruf.poppins700 }}
              >
                Sayyid Gibran
              </Text>
              <Text
                className="ml-2 text-base"
                style={{ fontFamily: gayaHuruf.poppins500 }}
              >
                |
              </Text>
              <Text
                className="ml-2 text-base"
                style={{ fontFamily: gayaHuruf.poppins700 }}
              >
                08987654321
              </Text>
            </View>
            <TouchableOpacity
              activeOpacity={0.4}
              className="mr-2 w-6 h-6 rounded-full items-center justify-center"
            >
              <FontAwesome name="pencil" size={16} color="green" />
            </TouchableOpacity>
          </View>
          <View className="items-start ml-6 mb-2">
            <Text
              className="ml-2 text-sm w-80"
              style={{ fontFamily: gayaHuruf.lexend400 }}
            >
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Saepe
              labore a consequuntur exercitationem, nesciunt amet quod molestias
              culpa. Ullam veritatis quia dignissimos laudantium voluptatibus in
              autem pariatur quisquam animi illum?
            </Text>
            <Text
              className="ml-2 w-80 text-sm"
              style={{ fontFamily: gayaHuruf.lexend400 }}
            >
              BATUJAJAR, KAB. BANDUNG, JAWA BARAT, ID 40561
            </Text>
          </View>
          <View className="flex-row items-center ml-8">
            <View className="w-24 border border-gray-500 rounded-md mr-2">
              <Text
                className="text-gray-500 text-sm text-center"
                style={{ fontFamily: gayaHuruf.lexend400 }}
              >
                Alamat Toko
              </Text>
            </View>
            <View className="w-28 border border-gray-500 rounded-md mr-2">
              <Text
                className="text-gray-500 text-sm text-center"
                style={{ fontFamily: gayaHuruf.lexend400 }}
              >
                Alamat Rumah
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
