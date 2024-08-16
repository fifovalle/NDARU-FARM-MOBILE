import { View, Text, TextInput, Image, TouchableOpacity } from "react-native";
import React from "react";

export default function LayarIdentitas() {
  return (
    <View className="flex-1 bg-[#E7E8E2] p-6">
      <View className="flex-1 items-center justify-center">
        <Image
          source={require("../assets/images/gambarIdentitas.png")}
          className="h-[250px] w-[250px]"
          style={{ resizeMode: "contain" }}
        />
      </View>

      <View className="mt-8">
        <View className="mb-4">
          <Text className="text-lg font-bold text-[#447055]">
            Nama Lengkap :
          </Text>
          <View className="flex-row items-center border border-gray-400 rounded-lg p-2 mt-2">
            <Image
              source={require("../assets/images/ikonNamaPengguna.png")}
              className="h-6 w-6"
              style={{ resizeMode: "contain" }}
            />
            <TextInput
              placeholder="Masukan Nama Lengkap Anda"
              className="ml-2 flex-1 text-gray-600"
            />
          </View>
        </View>

        <View className="mb-4">
          <Text className="text-lg font-bold text-[#447055]">
            Jenis Kelamin :
          </Text>
          <View className="flex-row items-center border border-gray-400 rounded-lg p-2 mt-2">
            <Image
              source={require("../assets/images/ikonJenisKelamin.png")}
              className="h-6 w-6"
              style={{ resizeMode: "contain" }}
            />
            <TextInput
              placeholder="Masukan Jenis Kelamin Anda"
              className="ml-2 flex-1 text-gray-600"
            />
          </View>
        </View>

        <View className="mb-8">
          <Text className="text-lg font-bold text-[#447055]">Umur :</Text>
          <View className="flex-row items-center border border-gray-400 rounded-lg p-2 mt-2">
            <Image
              source={require("../assets/images/ikonUmur.png")}
              className="h-6 w-6"
              style={{ resizeMode: "contain" }}
            />
            <TextInput
              placeholder="Masukan Umur Anda"
              className="ml-2 flex-1 text-gray-600"
            />
          </View>
        </View>

        <TouchableOpacity className="bg-[#447055] rounded-lg p-4">
          <Text className="text-white text-center font-bold text-lg">
            Simpan
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
