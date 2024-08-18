import React from "react";
import { View, Text, TextInput, Image, TouchableOpacity } from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import useGayaHuruf from "../../hooks/useGayaHuruf";

export default function Profil() {
  const ikonWortel = require("../../assets/images/ikonWortel.png");
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
    <View className="flex-1 bg-white">
      <View className="flex items-center bg-[#4C6C52] pt-16">
        <Text
          style={{ fontFamily: gayaHurufBlack }}
          className="text-lg text-white"
        >
          Profil Saya
        </Text>
      </View>
      <View className="bg-[#4C6C52] p-6 items-center rounded-b-[70px] w-full h-[350px]"></View>
      <View className=" bg-[#E7E8E2] p-2 w-[90%] absolute top-52 left-6 rounded-[30px]">
        <View className="items-center transform translate-y-[-60px]">
          <View className="w-32 h-32 bg-gray-300 rounded-full mb-4 flex overflow-hidden border-[1.5px] border-[#447055]">
            <Image
              source={ikonWortel}
              className="w-full h-full object-cover rounded-full"
            />
          </View>
          <Text
            style={{ fontFamily: gayaHurufBold }}
            className="text-[#447055] text-xl"
          >
            Nama Saya
          </Text>
          <Text
            style={{ fontFamily: gayaHurufMedium }}
            className="text-[#447055] text-base"
          >
            +62-888-888-88
          </Text>
        </View>

        <View className="px-3 py-8">
          <Text
            style={{ fontFamily: gayaHurufBold }}
            className="text-lg text-[#447055]"
          >
            Nama Lengkap :
          </Text>
          <View className="flex-row items-center border border-gray-400 rounded-xl p-2 mb-4">
            <FontAwesome
              className="border border-gray-400 rounded-md p-2"
              name="id-card"
              size={24}
              color="black"
            />
            <TextInput
              style={{ fontFamily: gayaHurufMedium }}
              placeholder="Nama Lengkap Anda"
              className="flex-1 ml-2 text-gray-700"
            />
          </View>

          <View className="flex-row justify-between mb-4">
            <View className="flex-1 mr-2">
              <Text
                style={{ fontFamily: gayaHurufBold }}
                className="text-lg text-[#447055]"
              >
                Umur :
              </Text>
              <View className="flex-row items-center border border-gray-400 rounded-lg p-2">
                <FontAwesome
                  className="border border-gray-400 rounded-md px-3 py-2"
                  name="calendar"
                  size={20}
                  color="black"
                />
                <TextInput
                  style={{ fontFamily: gayaHurufMedium }}
                  placeholder="Umur Anda"
                  className="flex-1 ml-2 text-gray-700"
                />
              </View>
            </View>
            <View className="flex-1 ml-2">
              <Text
                style={{ fontFamily: gayaHurufBold }}
                className="text-lg text-[#447055]"
              >
                Jenis Kelamin :
              </Text>
              <View className="flex-row items-center border border-gray-400 rounded-lg p-2">
                <FontAwesome
                  className="border border-gray-400 rounded-md px-3 py-2"
                  name="user"
                  size={24}
                  color="black"
                />
                <TextInput
                  style={{ fontFamily: gayaHurufMedium }}
                  placeholder="Jenis Kelamin"
                  className="flex-1 ml-1 text-sm text-gray-700"
                />
              </View>
            </View>
          </View>

          <Text
            style={{ fontFamily: gayaHurufBold }}
            className="text-lg mb-2 text-[#447055]"
          >
            Alamat :
          </Text>
          <View className="flex-row items-center border border-gray-400 rounded-lg p-2 mb-8">
            <FontAwesome
              className="border border-gray-400 rounded-md p-2"
              name="address-card"
              size={24}
              color="black"
            />
            <TextInput
              style={{ fontFamily: gayaHurufMedium }}
              placeholder="Nama Lengkap Anda"
              className="flex-1 ml-2 text-gray-700"
            />
          </View>
          <TouchableOpacity className="bg-[#4C6C52] py-3 w-56 rounded-xl items-center self-center">
            <Text
              style={{ fontFamily: gayaHurufBold }}
              className="text-white text-lg"
            >
              Simpan Perubahan
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
