import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  Switch,
} from "react-native";
import { useRouter } from "expo-router";

// MODUL KAMI
import { gayaHuruf } from "../../constants/huruf";
import useProfilPengguna from "../../hooks/useProfilPengguna";
import { FontAwesome } from "@expo/vector-icons";
import KonfirmasiKeluar from "../../components/konfirmasiKeluar";
import { keluar } from "../../utils/keluarPengguna";
import { konfirmasiKeluar, batalKeluar } from "../../utils/kelolaPopup";

export default function Profil() {
  const [tampilkanPopup, setTampilkanPopup] = useState(false);
  const pengarah = useRouter();
  const [apakahNotifikasiAktif, setApakahNotifikasiAktif] = useState(true);
  const [apakahPenditeksiWajahAktif, setPenditeksiWajahAktif] = useState(true);
  const { namaLengkap, nomorTelepon, gambarProfil } = useProfilPengguna();
  const toogleNotifikasi = () => setApakahNotifikasiAktif((aktif) => !aktif);
  const tooglePenditeksiWajah = () =>
    setPenditeksiWajahAktif((aktif) => !aktif);
  const gambarBawaan = require("../../assets/images/pengguna-bawaan.png");

  return (
    <ScrollView className="bg-[#E7E8E2] flex-1">
      <View className="justify-center items-center mt-16">
        <Image
          source={gambarProfil ? { uri: gambarProfil } : gambarBawaan}
          className="w-20 h-20 rounded-full"
        />
        <Text
          className="text-xl font-bold mt-4"
          style={{ fontFamily: gayaHuruf.lexend700 }}
        >
          {namaLengkap}
        </Text>
        <Text
          className="text-gray-600"
          style={{ fontFamily: gayaHuruf.lexend400 }}
        >
          {nomorTelepon}
        </Text>
        <TouchableOpacity
          onPress={() => pengarah.push("detail/suntingProfile")}
          activeOpacity={0.7}
          className="mt-4 bg-black py-2 px-6 rounded-full"
        >
          <Text
            className="text-white"
            style={{ fontFamily: gayaHuruf.lexend700 }}
          >
            Sunting Profil
          </Text>
        </TouchableOpacity>
      </View>

      <View className="mt-8 bg-white p-4 rounded-lg mx-4">
        <Text className="text-gray-500">Preferensi</Text>
        <View className="flex-row justify-between items-center mt-4">
          <View className="flex-row items-center">
            <View className="bg-gray-200 p-2 rounded-lg">
              <FontAwesome
                name="bell"
                size={20}
                color="black"
                className="w-6 h-6"
              />
            </View>
            <Text className="ml-4" style={{ fontFamily: gayaHuruf.lexend700 }}>
              Notifikasi
            </Text>
          </View>
          <Switch
            trackColor={{ false: "#767577", true: "#447055" }}
            thumbColor={apakahNotifikasiAktif ? "#34C759" : "#f4f3f4"}
            onValueChange={toogleNotifikasi}
            value={apakahNotifikasiAktif}
          />
        </View>
        <View className="flex-row justify-between items-center mt-4">
          <View className="flex-row items-center">
            <View className="bg-gray-200 p-2 rounded-lg">
              <FontAwesome
                name="eye"
                size={20}
                color="black"
                className="w-6 h-6"
              />
            </View>
            <Text className="ml-4" style={{ fontFamily: gayaHuruf.lexend700 }}>
              Penditeksi Wajah
            </Text>
          </View>
          <Switch
            trackColor={{ false: "#767577", true: "#447055" }}
            thumbColor={apakahPenditeksiWajahAktif ? "#34C759" : "#f4f3f4"}
            onValueChange={tooglePenditeksiWajah}
            value={apakahPenditeksiWajahAktif}
          />
        </View>
        <TouchableOpacity
          className="flex-row justify-between items-center mt-4"
          activeOpacity={0.6}
        >
          <View className="flex-row items-center">
            <View className="bg-gray-200 p-2 rounded-lg">
              <FontAwesome
                name="key"
                size={20}
                color="black"
                className="w-6 h-6"
              />
            </View>
            <Text className="ml-4" style={{ fontFamily: gayaHuruf.lexend700 }}>
              Kode PIN
            </Text>
          </View>
        </TouchableOpacity>
      </View>

      <View className="mt-8 bg-white p-4 rounded-lg mx-4">
        <TouchableOpacity
          className="flex-row justify-between items-center"
          activeOpacity={0.6}
          onPress={() => konfirmasiKeluar(setTampilkanPopup)}
        >
          <View className="flex-row items-center">
            <View className="bg-red-200 p-2 rounded-lg">
              <FontAwesome
                name="sign-out"
                size={20}
                color="black"
                className="w-6 h-6"
              />
            </View>
            <Text
              className="ml-4 text-red-600"
              style={{ fontFamily: gayaHuruf.lexend700 }}
            >
              Keluar
            </Text>
          </View>
        </TouchableOpacity>
      </View>

      <KonfirmasiKeluar
        muncul={tampilkanPopup}
        konfirmasi={() => keluar(pengarah)}
        batalkan={() => batalKeluar(setTampilkanPopup)}
      />
    </ScrollView>
  );
}
