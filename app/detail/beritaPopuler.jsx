import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { useRouter } from "expo-router";

// MODUL KAMI
import { gayaHuruf } from "../../constants/huruf";

export default function SayuranPopuler() {
  const pengarah = useRouter();
  const gambar = require("../../assets/images/gambarPesan.png");

  return (
    <View className="flex-1 bg-[#E7E8E2]">
      <View className="flex-row items-center mb-4 mt-12">
        <TouchableOpacity
          className="w-10 h-10 rounded-full items-center justify-center"
          onPress={() => pengarah.back()}
        >
          <FontAwesome name="arrow-left" size={24} color="green" />
        </TouchableOpacity>
        <Text
          style={{ fontFamily: gayaHuruf.lexend900 }}
          className="text-lg ml-4 text-[#447055]"
        >
          Detail Berita Populer
        </Text>
      </View>

      <ScrollView className="bg-[#E7E8E2] rounded-lg">
        <View className="bg-[#E7E8E2] mb-4 flex items-center justify-center">
          <View className="w-full h-80">
            <Image source={gambar} className="w-full h-full object-cover" />
          </View>
        </View>

        <View className="rounded-t-[30px] bg-white">
          <Text
            style={{ fontFamily: gayaHuruf.poppins700 }}
            className="text-lg ml-2 px-4 py-2 mt-3 text-[#447055] text-justify"
          >
            Lorem
          </Text>
          <View className="mx-auto w-[90%]">
            <Text
              style={{ fontFamily: gayaHuruf.lexend400 }}
              className="text-md text-justify"
            >
              Pertanian selada pakcoy semakin berkembang pesat di Indonesia,
              seiring dengan meningkatnya permintaan pasar terhadap sayuran
              hijau yang kaya akan nutrisi ini. Pakcoy dikenal sebagai sayuran
              yang mudah dibudidayakan dan cepat panen, membuatnya menjadi
              pilihan favorit bagi para petani, terutama di daerah dengan lahan
              sempit. Selain itu, teknik budidaya hidroponik juga semakin
              populer, memungkinkan produksi selada pakcoy secara berkelanjutan
              tanpa memerlukan banyak lahan. Inovasi ini tidak hanya
              meningkatkan hasil panen, tetapi juga kualitas sayuran yang
              dihasilkan, memenuhi standar kesehatan dan keamanan pangan yang
              tinggi. Dengan pasar yang terus tumbuh, pertanian selada pakcoy
              memiliki potensi besar untuk terus berkembang dan menjadi andalan
              dalam sektor agribisnis di Indonesia.
            </Text>
          </View>
          <View className="mx-auto w-[90%] mt-4">
            <Text
              style={{ fontFamily: gayaHuruf.poppins700 }}
              className="text-xl text-[#447055]"
            >
              Komentar :
            </Text>
            <View className="border-b border-gray-300 my-3" />
            <View className="bg-[#E7E8E2]rounded-xl flex-row">
              <View className="w-20 h-20 border border-gray-400 rounded-2xl">
                <Image source={gambar} className="w-full h-full rounded-2xl" />
              </View>
              <View className="px-3">
                <Text
                  className="text-[#447055]"
                  style={{ fontFamily: gayaHuruf.poppins700 }}
                >
                  nama pengguna
                </Text>
                <Text
                  className="w-[230px]"
                  style={{ fontFamily: gayaHuruf.lexend400 }}
                >
                  Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                  Dolor magnam laboriosam dolorem perferendis accusantium qui,
                  nostrum rem mollitia at doloribus soluta. Placeat amet
                  doloribus nam mollitia, iste qui culpa quibusdam.
                </Text>
              </View>
            </View>
            <View className="flex items-end w-[315px]">
              <TouchableOpacity
                activeOpacity={0.3}
                className=" w-16 h-8 rounded-lg items-center justify-center"
              >
                <Text
                  className="text-[#447055]"
                  style={{ fontFamily: gayaHuruf.poppins700 }}
                >
                  Balas
                </Text>
              </TouchableOpacity>
            </View>
            <View className="flex-row px-6">
              <View className="w-16 h-16 border border-gray-400 rounded-2xl">
                <Image source={gambar} className="w-full h-full rounded-2xl" />
              </View>
              <View className="px-3">
                <Text
                  className="text-[#447055] text-sm text-end"
                  style={{ fontFamily: gayaHuruf.poppins700 }}
                >
                  nama pengguna
                </Text>
                <Text
                  className="w-[230px] text-sm"
                  style={{ fontFamily: gayaHuruf.lexend400 }}
                >
                  Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                  Dolor magnam laboriosam dolorem perferendis accusantium qui,
                  nostrum rem mollitia at doloribus soluta. Placeat amet
                  doloribus nam mollitia, iste qui culpa quibusdam.
                </Text>
              </View>
            </View>
            <View className="flex items-end w-[315px]">
              <TouchableOpacity
                activeOpacity={0.3}
                className=" w-16 h-8 rounded-lg items-center justify-center"
              >
                <Text
                  className="text-[#447055] text-xs"
                  style={{ fontFamily: gayaHuruf.poppins700 }}
                >
                  Balas
                </Text>
              </TouchableOpacity>
            </View>
            <View className="border-b border-gray-300 my-3" />
            <View className="w-full mt-4">
              <TextInput
                className="w-full h-32 border border-gray-500 rounded-xl p-4"
                style={{ fontFamily: gayaHuruf.lexend400 }}
                multiline
                numberOfLines={4}
                textAlignVertical="top"
              />
            </View>
            <TouchableOpacity
              activeOpacity={0.7}
              className="w-24 h-10 bg-[#447055] rounded-md self-end items-center justify-center mt-3 mb-7"
            >
              <Text
                className="text-white"
                style={{ fontFamily: gayaHuruf.poppins700 }}
              >
                Kirim
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
