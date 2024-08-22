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

// MODUL KAMI
import { gayaHuruf } from "../constants/huruf";
import useIdentitasPengguna from "../hooks/useIdentitasPengguna";

export default function LayarIdentitas() {
  const segeraBergulirKeAtas = useRef(null);
  const warnaAktif = "#4C6C52";
  const warnaTidakAktif = "#E7E8E2";
  const gambarIdentitasPengguna = require("../assets/images/gambarIdentitas.png");
  const {
    namaLengkapPengguna,
    setNamaLengkapPengguna,
    umurPengguna,
    setUmurPengguna,
    nomorTeleponPengguna,
    setNomorTeleponPengguna,
    jenisKelaminPengguna,
    setJenisKelaminPengguna,
    simpanIdentitas,
    memuat,
  } = useIdentitasPengguna(segeraBergulirKeAtas);

  return (
    <ScrollView ref={segeraBergulirKeAtas} className="flex-1 bg-[#E7E8E2]">
      <Toast />
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
                value={namaLengkapPengguna}
                onChangeText={setNamaLengkapPengguna}
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
                value={umurPengguna}
                onChangeText={setUmurPengguna}
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
                value={nomorTeleponPengguna}
                onChangeText={setNomorTeleponPengguna}
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
                  onPress={() => setJenisKelaminPengguna("Pria")}
                  style={{
                    backgroundColor:
                      jenisKelaminPengguna === "Pria"
                        ? warnaAktif
                        : warnaTidakAktif,
                  }}
                >
                  <Text
                    style={{
                      fontFamily: gayaHuruf.lexend500,
                      color: jenisKelaminPengguna === "Pria" ? "#FFF" : "#000",
                    }}
                  >
                    Pria
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  className="border border-gray-400 rounded-lg p-3 bg-[#447055] w-22 items-center justify-center"
                  onPress={() => setJenisKelaminPengguna("Wanita")}
                  style={{
                    backgroundColor:
                      jenisKelaminPengguna === "Wanita"
                        ? warnaAktif
                        : warnaTidakAktif,
                  }}
                >
                  <Text
                    style={{
                      fontFamily: gayaHuruf.lexend500,
                      color:
                        jenisKelaminPengguna === "Wanita" ? "#FFF" : "#000",
                    }}
                  >
                    Wanita
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
        <View className="flex items-center justify-center">
          {memuat ? (
            <TouchableOpacity
              className="border border-gray-400 rounded-lg p-3 bg-[#447055] w-[100%] items-center justify-center"
              style={{ opacity: 0.5 }}
              disabled={true}
            >
              <Text
                style={{ fontFamily: gayaHuruf.lexend500 }}
                className="text-white text-lg"
              >
                <ActivityIndicator size="small" color="#FFF" />
              </Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              activeOpacity={0.7}
              className="border border-gray-400 rounded-lg p-3 bg-[#447055] w-[100%] items-center justify-center"
              onPress={simpanIdentitas}
            >
              <Text
                style={{ fontFamily: gayaHuruf.lexend500 }}
                className="text-white text-lg"
              >
                Simpan
              </Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </ScrollView>
  );
}
