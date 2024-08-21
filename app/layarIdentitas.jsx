import {
  View,
  Text,
  TextInput,
  Image,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import React, { useRef } from "react";
import { useRouter } from "expo-router";
import { FontAwesome } from "@expo/vector-icons";
import useGayaHuruf from "../hooks/useGayaHuruf";
import useHalamanIdentitas from "../hooks/useHalamanIdentitas";
import Toast from "react-native-toast-message";

export default function LayarIdentitas() {
  const jalur = useRouter();
  const segeraBergulir = useRef(null);
  const {
    namaLengkap,
    setNamaLengkap,
    umur,
    setUmur,
    noTelepon,
    setNoTelepon,
    jenisKelamin,
    setJenisKelamin,
    memuat,
    simpanDataPengguna,
  } = useHalamanIdentitas();

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

  const warnaAktif = "#4C6C52";
  const warnaTidakAktif = "#E7E8E2";

  const simpanData = async () => {
    try {
      await simpanDataPengguna(namaLengkap, umur, noTelepon, jenisKelamin);
      jalur.push("/beranda");
    } catch (error) {
      Toast.show({
        type: "error",
        position: "top",
        text1: "Error",
        text2: error.message || "Gagal menyimpan data. Coba lagi nanti.",
        onShow: () => {
          segeraBergulir.current?.scrollTo({ y: 0, animated: true });
        },
      });
    }
  };

  return (
    <ScrollView ref={segeraBergulir} className="flex-1 bg-[#E7E8E2]">
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

          <View className="mb-4">
            <Text
              style={{ fontFamily: gayaHurufBlack }}
              className="text-lg text-[#447055]"
            >
              Nomor Telepon :
            </Text>
            <View className="flex-row items-center border border-gray-400 rounded-lg p-2 mt-2">
              <View className="h-10 w-10 border border-gray-400 rounded">
                <Text
                  style={{ fontFamily: gayaHurufRegular }}
                  className="m-auto"
                >
                  +62
                </Text>
              </View>
              <TextInput
                inputMode="numeric"
                style={{ fontFamily: gayaHurufRegular }}
                placeholder="Masukan nomor telepon Anda"
                className="ml-2 flex-1 text-gray-600"
                value={noTelepon}
                onChangeText={setNoTelepon}
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
                      fontFamily: gayaHurufMedium,
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
                      fontFamily: gayaHurufMedium,
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
