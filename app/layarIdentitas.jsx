import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Image,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { useRouter } from "expo-router";
import { FontAwesome } from "@expo/vector-icons";
// MODUL KAMI
import { gayaHuruf } from "../constants/huruf";

export default function LayarIdentitas() {
  const pengarah = useRouter();
  const warnaAktif = "#4C6C52";
  const warnaTidakAktif = "#E7E8E2";
  const [jenisKelamin, setJenisKelamin] = useState("");
  const gambarIdentitasPengguna = require("../assets/images/gambarIdentitas.png");

  return (
    <ScrollView className="flex-1 bg-[#E7E8E2]">
      <View className="p-6 mt-[70px]">
        <View className="flex-1 items-center justify-center">
          <Image
            source={gambarIdentitasPengguna}
            className="h-[350px] w-[350px]"
            style={{ resizeMode: "contain" }}
          />
        </View>

        <View className="mt-8">
          <View className="mb-4">
            <Text
              style={{ fontFamily: gayaHuruf.lexend900 }}
              className="text-lg text-[#447055]"
            >
              Nama Lengkap :
            </Text>
            <View className="flex-row items-center border border-gray-400 rounded-lg p-2 mt-2">
              <Image
                source={require("../assets/images/ikonNamaPengguna.png")}
                className="h-10 w-10 border border-gray-400 rounded"
                style={{ resizeMode: "contain" }}
              />
              <TextInput
                style={{ fontFamily: gayaHuruf.lexend400 }}
                placeholder="Masukan Nama Lengkap Anda"
                className="ml-2 flex-1 text-gray-600"
              />
            </View>
          </View>

          <View className="mb-4">
            <Text
              style={{ fontFamily: gayaHuruf.lexend900 }}
              className="text-lg text-[#447055]"
            >
              Umur :
            </Text>
            <View className="flex-row items-center border border-gray-400 rounded-lg p-2 mt-2">
              <Image
                source={require("../assets/images/ikonUmur.png")}
                className="h-10 w-10 border border-gray-400 rounded"
                style={{ resizeMode: "contain" }}
              />
              <TextInput
                inputMode="numeric"
                style={{ fontFamily: gayaHuruf.lexend400 }}
                placeholder="Masukan Umur Anda"
                className="ml-2 flex-1 text-gray-600"
              />
            </View>
          </View>

          <View className="mb-4">
            <Text
              style={{ fontFamily: gayaHuruf.lexend900 }}
              className="text-lg text-[#447055]"
            >
              Nomor Telepon :
            </Text>
            <View className="flex-row items-center border border-gray-400 rounded-lg p-2 mt-2">
              <View className="h-10 w-10 border border-gray-400 rounded">
                <Text
                  style={{ fontFamily: gayaHuruf.lexend400 }}
                  className="m-auto"
                >
                  +62
                </Text>
              </View>
              <TextInput
                inputMode="numeric"
                style={{ fontFamily: gayaHuruf.lexend400 }}
                placeholder="Masukan nomor telepon Anda"
                className="ml-2 flex-1 text-gray-600"
              />
            </View>
          </View>

          <View className="mb-8">
            <Text
              style={{ fontFamily: gayaHuruf.lexend900 }}
              className="text-lg text-[#447055]"
            >
              Jenis Kelamin :
            </Text>
            <View className="flex-row items-center mt-2 mx-2">
              <FontAwesome
                className="border border-gray-400 rounded-md p-2"
                name="venus-mars"
                size={22}
                color="black"
              />
              <View className="flex-row ml-2 w-[82%]">
                <TouchableOpacity
                  className="border border-gray-400 rounded-lg p-3 bg-[#447055] mx-4 w-20 items-center justify-center"
                  onPress={() => setJenisKelamin("pria")}
                  style={{
                    backgroundColor:
                      jenisKelamin === "pria" ? warnaAktif : warnaTidakAktif,
                  }}
                >
                  <Text
                    style={{
                      fontFamily: gayaHuruf.lexend500,
                      color: jenisKelamin === "pria" ? "#FFF" : "#000",
                    }}
                  >
                    Pria
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  className="border border-gray-400 rounded-lg p-3 bg-[#447055] w-22 items-center justify-center"
                  onPress={() => setJenisKelamin("wanita")}
                  style={{
                    backgroundColor:
                      jenisKelamin === "wanita" ? warnaAktif : warnaTidakAktif,
                  }}
                >
                  <Text
                    style={{
                      fontFamily: gayaHuruf.lexend500,
                      color: jenisKelamin === "wanita" ? "#FFF" : "#000",
                    }}
                  >
                    Wanita
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>

          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => {
              pengarah.replace("/beranda");
            }}
            className="bg-[#447055] rounded-lg p-4 flex-row items-center justify-center"
          >
            <Text
              style={{ fontFamily: gayaHuruf.poppins700 }}
              className="text-white text-center text-lg"
            >
              Simpan
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}
