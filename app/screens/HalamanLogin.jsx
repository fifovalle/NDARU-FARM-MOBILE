import { Image, Text, TouchableOpacity, View } from "react-native";
import React from "react";

export default function HalamanLogin() {
  const tahunSekarang = new Date().getFullYear();
  return (
    <View className="flex-1 bg-gray-100">
      <Image
        source={require("../../assets/images/login.jpg")}
        className="w-full h-[350px] object-cover"
      />
      <View className="p-10 mx-auto mt-[-2px] bg-white rounded-b-3xl shadow-lg w-full">
        <Text className="text-[35px] font-extrabold text-center text-teal-600">
          NDARU FARM
        </Text>
        <Text className="text-[14px] text-slate-500 font-bold text-center mt-2">
          Tempat jual beli sayuran segar dan berkualitas di Indonesia
        </Text>
        <TouchableOpacity
          onPress={() => console.log("login")}
          className="p-4 bg-teal-600 rounded-lg mt-10"
        >
          <Text className="text-white text-center font-bold text-[18px]">
            Mulai
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => console.log("register")}
          className="p-4 bg-teal-100 rounded-lg mt-4"
        >
          <Text className="text-teal-600 text-center font-bold text-[18px]">
            Daftar
          </Text>
        </TouchableOpacity>
      </View>
      <View className="mt-auto p-4 bg-gray-200">
        <Text className="text-center text-slate-500">
          &copy; {tahunSekarang} Syntax Squads. Seluruh hak cipta.
        </Text>
      </View>
    </View>
  );
}
