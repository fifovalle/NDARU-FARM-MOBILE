import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { useRouter, useGlobalSearchParams } from "expo-router";

// MODUL KAMI
import { gayaHuruf } from "../../constants/huruf";
import useDetailBeritaPopuler from "../../hooks/useDetailBeritaPopuler";

export default function SayuranPopuler() {
  const { id } = useGlobalSearchParams();
  const { beritaPopuler, memuatBeritaPopuler } = useDetailBeritaPopuler(id);
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

      {memuatBeritaPopuler ? (
        <View className="flex-1 justify-center items-center">
          <ActivityIndicator size="large" color="#447055" />
        </View>
      ) : (
        <ScrollView className="bg-[#E7E8E2] rounded-lg">
          <View className="bg-[#E7E8E2] mb-4 flex items-center justify-center">
            <View className="w-full h-80">
              <Image
                source={{ uri: beritaPopuler.Gambar_Berita }}
                className="w-full h-full object-cover"
              />
            </View>
          </View>

          <View className="rounded-t-[30px] bg-white">
            <Text
              style={{ fontFamily: gayaHuruf.poppins700 }}
              className="text-lg ml-2 px-4 py-2 mt-3 text-[#447055] text-justify"
            >
              {beritaPopuler.Judul_Berita}
            </Text>
            <View className="mx-auto w-[90%]">
              <Text
                style={{ fontFamily: gayaHuruf.lexend400 }}
                className="text-md text-justify"
              >
                {beritaPopuler.Isi_Berita}
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
                  <Image
                    source={gambar}
                    className="w-full h-full rounded-2xl"
                  />
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
                  <Image
                    source={gambar}
                    className="w-full h-full rounded-2xl"
                  />
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
                  placeholder="Tulis komentar..."
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
      )}
    </View>
  );
}
