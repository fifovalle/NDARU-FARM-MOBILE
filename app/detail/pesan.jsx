import React from "react";
import {
  View,
  Text,
  TextInput,
  Image,
  ScrollView,
  TouchableOpacity,
  ImageBackground,
  ActivityIndicator,
} from "react-native";
import { useRouter, useGlobalSearchParams } from "expo-router";
import { FontAwesome } from "@expo/vector-icons";

// MODUL KAMI
import { gayaHuruf } from "../../constants/huruf";
import useDataPesanMasuk from "../../hooks/useDataPesanMasuk";

export default function Pesan() {
  const { id } = useGlobalSearchParams();
  const pengarah = useRouter();
  const layarPesan = require("../../assets/images/gambarPesan.png");

  const { dataPengguna, memuatPengguna } = useDataPesanMasuk(id);

  return (
    <View className="flex-1 bg-[#E7E8E2] px-2">
      <View className="flex-row items-center p-4 border-b border-gray-300 mt-12">
        <TouchableOpacity
          onPress={() => pengarah.back("beranda/pesan")}
          className="mr-4"
        >
          <FontAwesome name="arrow-left" size={24} color="green" />
        </TouchableOpacity>
        <View className="flex-1 flex-row items-center">
          <View className="w-14 h-14 bg-white rounded-full mr-3 overflow-hidden flex items-center justify-center">
            <Image
              source={{
                uri: dataPengguna?.Foto_Pengguna
                  ? dataPengguna.Foto_Pengguna
                  : "https://disk.mediaindonesia.com/files/news/2022/11/03/wa15.jpg",
              }}
              className="w-14 h-14 object-cover"
            />
          </View>
          <View>
            {memuatPengguna ? (
              <ActivityIndicator size="small" color="green" />
            ) : (
              <>
                <Text
                  style={{ fontFamily: gayaHuruf.lexend900 }}
                  className="text-green-900"
                >
                  {dataPengguna.Nama_Lengkap_Pengguna.length >= 7
                    ? `${dataPengguna.Nama_Lengkap_Pengguna.slice(
                        0,
                        1
                      ).toUpperCase()}${dataPengguna.Nama_Lengkap_Pengguna.slice(
                        1,
                        20
                      )}...`
                    : `${dataPengguna.Nama_Lengkap_Pengguna.slice(
                        0,
                        1
                      ).toUpperCase()}${dataPengguna.Nama_Lengkap_Pengguna.slice(
                        1
                      )}`}
                </Text>
                <Text
                  style={{ fontFamily: gayaHuruf.poppins500 }}
                  className="text-sm"
                >
                  {dataPengguna?.status || "online"}
                </Text>
              </>
            )}
          </View>
        </View>
        <TouchableOpacity activeOpacity={0.4}>
          <FontAwesome name="search" size={20} color="green" />
        </TouchableOpacity>
      </View>

      <ImageBackground className="w-screen flex-1" source={layarPesan}>
        <ScrollView className="px-4 py-2">
          <View className="flex items-center">
            <Text
              style={{ fontFamily: gayaHuruf.poppins500 }}
              className="text-center mb-2 mt-2 text-white bg-black w-20 rounded-lg"
            >
              Hari ini
            </Text>
          </View>
          <View className="flex-row justify-start">
            <View className="w-9 h-9 bg-white rounded-full mr-2 overflow-hidden flex items-center justify-center">
              <Image
                source={{
                  uri: dataPengguna?.Foto_Pengguna
                    ? dataPengguna.Foto_Pengguna
                    : "https://disk.mediaindonesia.com/files/news/2022/11/03/wa15.jpg",
                }}
                className="w-9 h-9 object-cover"
              />
            </View>
            <TouchableOpacity
              activeOpacity={0.7}
              className="bg-[#E7E8E2] rounded-lg p-3 max-w-[60%]"
            >
              <Text
                style={{ fontFamily: gayaHuruf.poppins500 }}
                className="text-gray-700"
              >
                Hai
              </Text>
              <View className="items-end">
                <Text
                  style={{ fontFamily: gayaHuruf.poppins500 }}
                  className="text-gray-700"
                >
                  00.07 WIB
                </Text>
              </View>
            </TouchableOpacity>
          </View>
          <View className="flex-row justify-end">
            <TouchableOpacity
              activeOpacity={0.7}
              className="bg-[#447055] rounded-lg p-3 max-w-[60%]"
            >
              <Text
                style={{ fontFamily: gayaHuruf.poppins500 }}
                className="text-white"
              >
                Hai
              </Text>
              <View className="items-end">
                <Text
                  style={{ fontFamily: gayaHuruf.poppins500 }}
                  className="text-white"
                >
                  00.07 WIB
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </ImageBackground>

      <View className="flex-row items-center p-4 border-t border-gray-300 w-full mb-2">
        <View className="flex-row w-full h-[70px] bg-white rounded-full overflow-hidden flex items-center justify-center">
          <TouchableOpacity activeOpacity={0.4} className="mr-2">
            <FontAwesome name="plus-circle" size={26} color="black" />
          </TouchableOpacity>
          <View className="flex-row items-center ml-3 bg-[#E7E8E2] rounded-full w-72">
            <TextInput
              style={{ fontFamily: gayaHuruf.poppins500 }}
              placeholder="Tulis pesan..."
              className="flex-1 p-3 text-gray-700"
            />
            <TouchableOpacity activeOpacity={0.4} className="p-2 mr-4">
              <FontAwesome name="send" size={22} color="black" />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
}
