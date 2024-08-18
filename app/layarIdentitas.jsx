import {
  View,
  Text,
  TextInput,
  Image,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import React from "react";
import { router } from "expo-router";
import { RadioButton } from "react-native-paper";
import useGayaHuruf from "../hooks/useGayaHuruf";
import useDataPengguna from "../hooks/useDataPengguna";
import Toast from "react-native-toast-message";

export default function LayarIdentitas() {
  const {
    namaLengkap,
    setNamaLengkap,
    umur,
    setUmur,
    jenisKelamin,
    setJenisKelamin,
    memuat,
    simpanDataPengguna,
  } = useDataPengguna();

  const gayaHurufRegular = useGayaHuruf({
    android: "Lexend_400Regular",
    ios: "Lexend_400Regular",
  });

  const gayaHurufBlack = useGayaHuruf({
    android: "Lexend_900Black",
    ios: "Inter-Blak",
  });

  const gayaHurufBold = useGayaHuruf({
    android: "Poppins_700Bold",
    ios: "Poppins_700Bold",
  });

  const simpanData = async () => {
    try {
      await simpanDataPengguna(namaLengkap, umur, jenisKelamin);
      router.push("/beranda");
    } catch (error) {
      Toast.show({
        type: "error",
        position: "top",
        text1: "Error",
        text2: error.message || "Gagal menyimpan data. Coba lagi nanti.",
      });
    }
  };

  return (
    <ScrollView className="flex-1 bg-[#E7E8E2]">
      <Toast />
      <View className="p-6 mt-[70px]">
        <View className="flex-1 items-center justify-center">
          <Image
            source={require("../assets/images/gambarIdentitas.png")}
            className="h-[350px] w-[350px]"
            style={{ resizeMode: "contain" }}
          />
        </View>

        <View className="mt-8">
          <View className="mb-4">
            <Text
              style={{ fontFamily: gayaHurufBlack }}
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
                style={{ fontFamily: gayaHurufRegular }}
                placeholder="Masukan Nama Lengkap Anda"
                className="ml-2 flex-1 text-gray-600"
                value={namaLengkap}
                onChangeText={setNamaLengkap}
                editable={!memuat}
              />
            </View>
          </View>

          <View className="mb-4">
            <Text
              style={{ fontFamily: gayaHurufBlack }}
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
                style={{ fontFamily: gayaHurufRegular }}
                placeholder="Masukan Umur Anda"
                className="ml-2 flex-1 text-gray-600"
                value={umur}
                onChangeText={setUmur}
                editable={!memuat}
              />
            </View>
          </View>

          <View className="mb-8">
            <Text
              style={{ fontFamily: gayaHurufBlack }}
              className="text-lg text-[#447055]"
            >
              Jenis Kelamin :
            </Text>
            <View className="flex-row items-center mt-2 mx-2">
              <RadioButton
                value="Pria"
                status={jenisKelamin === "Pria" ? "checked" : "unchecked"}
                color="#447055"
                onPress={() => setJenisKelamin("Pria")}
                disabled={memuat}
              />
              <Text style={{ fontFamily: gayaHurufRegular }}>Pria</Text>

              <RadioButton
                value="Wanita"
                status={jenisKelamin === "Wanita" ? "checked" : "unchecked"}
                color="#447055"
                onPress={() => setJenisKelamin("Wanita")}
                disabled={memuat}
              />
              <Text style={{ fontFamily: gayaHurufRegular }}>Wanita</Text>
            </View>
          </View>

          <TouchableOpacity
            onPress={simpanData}
            activeOpacity={0.8}
            className={`bg-[#447055] rounded-lg p-4 flex-row items-center justify-center ${
              memuat ? "opacity-50" : ""
            }`}
            disabled={memuat}
          >
            {memuat ? (
              <ActivityIndicator size="small" color="#fff" />
            ) : (
              <Text
                style={{ fontFamily: gayaHurufBold }}
                className="text-white text-center text-lg"
              >
                Simpan
              </Text>
            )}
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}
