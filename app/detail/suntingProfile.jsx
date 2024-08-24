import React, { useRef } from "react";
import {
  View,
  Text,
  TextInput,
  Image,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import Toast from "react-native-toast-message";
import { useRouter } from "expo-router";

// MODUL KAMI
import { gayaHuruf } from "../../constants/huruf";
import useProfilPengguna from "../../hooks/useProfilPengguna";
export default function SuntingProfil() {
  const pengarah = useRouter();
  const segeraBergulirKeAtas = useRef(null);
  const gambarBawaan = require("../../assets/images/pengguna-bawaan.png");

  const {
    jenisKelamin,
    setJenisKelamin,
    namaLengkap,
    setNamaLengkap,
    umur,
    setUmur,
    nomorTelepon,
    setNomorTelepon,
    provinsi,
    setProvinsi,
    kota,
    setKota,
    kabupaten,
    setKabupaten,
    alamat,
    setAlamat,
    kodePos,
    setKodePos,
    gambarProfil,
    warnaAktif,
    warnaTidakAktif,
    simpanProfil,
    pilihGambar,
    memuatGambar,
    memuatSimpanData,
  } = useProfilPengguna(segeraBergulirKeAtas);

  return (
    <ScrollView ref={segeraBergulirKeAtas} className="flex-1 bg-[#E7E8E2]">
      <Toast />
      <View className="flex-row items-center mb-4 mt-12 -z-10">
        <TouchableOpacity
          className="p-2 rounded-full"
          activeOpacity={0.6}
          onPress={() => pengarah.back("")}
        >
          <FontAwesome name="arrow-left" size={24} color="green" />
        </TouchableOpacity>
        <Text
          style={{ fontFamily: gayaHuruf.poppins700 }}
          className="text-lg ml-2 text-[#447055]"
        >
          Sunting Profil Saya
        </Text>
      </View>

      <View className="bg-white mx-auto p-2 w-[90%] rounded-[30px] mt-24 mb-10">
        <View className="items-center transform translate-y-[-60px]">
          <View className="w-32 h-32 bg-white rounded-full flex items-center justify-center mb-4 border-[1.5px] border-[#447055]">
            <TouchableOpacity
              onPress={pilihGambar}
              activeOpacity={0.7}
              className="w-28 h-28 rounded-full"
            >
              {memuatGambar ? (
                <ActivityIndicator
                  className="w-full h-full"
                  size="large"
                  color="#447055"
                />
              ) : (
                <Image
                  source={gambarProfil ? { uri: gambarProfil } : gambarBawaan}
                  className="w-full h-full rounded-full mb-20"
                />
              )}
            </TouchableOpacity>
          </View>
          <Text
            style={{ fontFamily: gayaHuruf.poppins700 }}
            className="text-[#447055] text-xl text-center"
          >
            {namaLengkap || "Nama Lengkap"}
          </Text>
          <Text
            style={{ fontFamily: gayaHuruf.poppins500 }}
            className="text-[#447055] text-base"
          >
            {nomorTelepon || "Nomor Telepon"}
          </Text>
          <View className="py-3 px-4 items-start mt-5">
            <Text
              style={{ fontFamily: gayaHuruf.poppins700 }}
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
                value={namaLengkap}
                onChangeText={setNamaLengkap}
                style={{ fontFamily: gayaHuruf.poppins500 }}
                placeholder="Nama Lengkap Anda"
                className="flex-1 ml-2 text-gray-700"
              />
            </View>
            <View className="flex-row justify-between mb-4">
              <View className="flex-1 mr-2">
                <Text
                  style={{ fontFamily: gayaHuruf.poppins700 }}
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
                    value={umur}
                    onChangeText={setUmur}
                    style={{ fontFamily: gayaHuruf.poppins500 }}
                    placeholder="Umur Anda"
                    className="flex-1 ml-2 text-gray-700"
                  />
                </View>
              </View>
            </View>

            <Text
              style={{ fontFamily: gayaHuruf.poppins700 }}
              className="text-lg text-[#447055]"
            >
              Nomor Telepon :
            </Text>
            <View className="flex-row items-center border border-gray-400 rounded-lg p-2 mb-4">
              <FontAwesome
                className="border border-gray-400 rounded-md p-2 px-3"
                name="phone"
                size={24}
                color="black"
              />
              <TextInput
                value={nomorTelepon}
                onChangeText={setNomorTelepon}
                inputMode="numeric"
                style={{ fontFamily: gayaHuruf.poppins500 }}
                placeholder="Nomor telepon Anda"
                className="flex-1 ml-2 text-gray-700"
              />
            </View>
            <Text
              style={{ fontFamily: gayaHuruf.poppins700 }}
              className="text-lg text-[#447055]"
            >
              Provinsi :
            </Text>
            <View className="flex-row items-center border border-gray-400 rounded-lg p-2 mb-4">
              <FontAwesome
                className="border border-gray-400 rounded-md py-2 px-3"
                name="map"
                size={20}
                color="black"
              />
              <TextInput
                value={provinsi}
                onChangeText={setProvinsi}
                style={{ fontFamily: gayaHuruf.poppins500 }}
                placeholder="Provinsi"
                className="flex-1 ml-2 text-gray-700"
              />
            </View>
            <Text
              style={{ fontFamily: gayaHuruf.poppins700 }}
              className="text-lg text-[#447055]"
            >
              Kota :
            </Text>
            <View className="flex-row items-center border border-gray-400 rounded-lg p-2 mb-4">
              <FontAwesome
                className="border border-gray-400 rounded-md py-2 px-3"
                name="building"
                size={20}
                color="black"
              />
              <TextInput
                value={kota}
                onChangeText={setKota}
                style={{ fontFamily: gayaHuruf.poppins500 }}
                placeholder="Kota"
                className="flex-1 ml-2 text-gray-700"
              />
            </View>
            <Text
              style={{ fontFamily: gayaHuruf.poppins700 }}
              className="text-lg text-[#447055]"
            >
              Kabupaten :
            </Text>
            <View className="flex-row items-center border border-gray-400 rounded-lg p-2 mb-4">
              <FontAwesome
                className="border border-gray-400 rounded-md py-2 px-3"
                name="map-marker"
                size={20}
                color="black"
              />
              <TextInput
                value={kabupaten}
                onChangeText={setKabupaten}
                style={{ fontFamily: gayaHuruf.poppins500 }}
                placeholder="Kabupaten"
                className="flex-1 ml-2 text-gray-700"
              />
            </View>
            <Text
              style={{ fontFamily: gayaHuruf.poppins700 }}
              className="text-lg text-[#447055]"
            >
              Alamat :
            </Text>
            <View className="flex-row items-start border border-gray-400 rounded-lg p-2 mb-4">
              <FontAwesome
                className="border border-gray-400 rounded-md py-2 px-3"
                name="home"
                size={20}
                color="black"
              />
              <TextInput
                value={alamat}
                onChangeText={setAlamat}
                style={{ fontFamily: gayaHuruf.poppins500 }}
                placeholder="Alamat"
                className="flex-1 ml-2 text-gray-700"
                multiline
                numberOfLines={4}
                textAlignVertical="top"
              />
            </View>
            <Text
              style={{ fontFamily: gayaHuruf.poppins700 }}
              className="text-lg text-[#447055]"
            >
              Kode Pos :
            </Text>
            <View className="flex-row items-center border border-gray-400 rounded-lg p-2 mb-4">
              <FontAwesome
                className="border border-gray-400 rounded-md py-2 px-3"
                name="envelope-open"
                size={20}
                color="black"
              />
              <TextInput
                value={kodePos}
                onChangeText={setKodePos}
                inputMode="numeric"
                style={{ fontFamily: gayaHuruf.poppins500 }}
                placeholder="Kode Pos"
                className="flex-1 ml-2 text-gray-700"
              />
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
                    activeOpacity={0.7}
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
                    activeOpacity={0.7}
                    className="border border-gray-400 rounded-lg p-3 bg-[#447055] w-22 items-center justify-center"
                    onPress={() => setJenisKelamin("wanita")}
                    style={{
                      backgroundColor:
                        jenisKelamin === "wanita"
                          ? warnaAktif
                          : warnaTidakAktif,
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
              {memuatSimpanData ? (
                <TouchableOpacity
                  activeOpacity={0.7}
                  className="bg-[#447055] rounded-lg p-4 w-full mt-10 -mb-20 mx-auto opacity-20"
                  disabled={true}
                >
                  <ActivityIndicator color="#FFF" className="w-48" />
                </TouchableOpacity>
              ) : (
                <TouchableOpacity
                  activeOpacity={0.7}
                  className="bg-[#447055] rounded-lg p-4 w-full mt-10 -mb-20 mx-auto"
                >
                  <Text
                    style={{ fontFamily: gayaHuruf.poppins700 }}
                    className="text-center text-white text-lg"
                    onPress={simpanProfil}
                  >
                    Simpan Perubahan
                  </Text>
                </TouchableOpacity>
              )}
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}
