import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Animated,
} from "react-native";
import React, { useState, useRef } from "react";
import { useRouter } from "expo-router";
import { FontAwesome, Ionicons } from "@expo/vector-icons";
import Toast from "react-native-toast-message";

// MODUL KAMI
import { gayaHuruf } from "../../constants/huruf";

export default function Keranjang() {
  const [namaLengkap, setNamaLengkap] = useState("");
  const [nomorTelepon, setNomorTelepon] = useState("");
  const [isNamaFocused, setNamaFocused] = useState(false);
  const [isTeleponFocused, setTeleponFocused] = useState(false);
  const [labelAlamat, setLabelAlamat] = useState("");
  const [isAlamatTerbuka, setIsAlamatTerbuka] = useState(false);
  const [aktifTombol, setAktifTombol] = useState("provinsi");

  const pengarah = useRouter();

  const pilihLabel = (label) => {
    setLabelAlamat(label);
  };

  const rotateAnim = useRef(new Animated.Value(0)).current;

  const alamatAnim = useRef(new Animated.Value(0)).current;

  const toggleAlamat = () => {
    setIsAlamatTerbuka(!isAlamatTerbuka);

    Animated.timing(rotateAnim, {
      toValue: isAlamatTerbuka ? 0 : 1,
      duration: 300,
      useNativeDriver: true,
    }).start();

    Animated.timing(alamatAnim, {
      toValue: isAlamatTerbuka ? 0 : 1,
      duration: 300,
      useNativeDriver: false,
    }).start();
  };

  const rotateChevron = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "90deg"],
  });

  const alamatHeight = alamatAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 240],
  });

  const setActiveButton = (button) => {
    setAktifTombol(button);
  };

  return (
    <View className="flex-1 bg-[#E7E8E2]">
      <Toast />
      <View className="flex-row items-center mt-14 mb-8 px-4 -z-50">
        <TouchableOpacity onPress={() => pengarah.back("../")}>
          <View className="w-10 h-10 rounded-full flex justify-center items-center">
            <FontAwesome name="arrow-left" size={24} color="green" />
          </View>
        </TouchableOpacity>

        <Text
          style={{ fontFamily: gayaHuruf.lexend900 }}
          className="text-lg ml-4"
        >
          Ubah Alamat
        </Text>
      </View>

      <ScrollView className="px-4">
        <View className="bg-white p-3 rounded-xl shadow-xl mb-4">
          <View className="p-2">
            <Text
              style={{ fontFamily: gayaHuruf.lexend400 }}
              className="text-gray-500"
            >
              Nama Lengkap
            </Text>
            <View className="flex-row items-center border-b border-gray-300">
              <TextInput
                value={namaLengkap}
                onChangeText={setNamaLengkap}
                onFocus={() => setNamaFocused(true)}
                onBlur={() => setNamaFocused(false)}
                style={{ fontFamily: gayaHuruf.lexend700 }}
                className="py-1 flex-1"
                placeholder="Masukkan nama lengkap"
              />
              {isNamaFocused && namaLengkap !== "" && (
                <TouchableOpacity onPress={() => setNamaLengkap("")}>
                  <Ionicons name="close-circle" size={20} color="green" />
                </TouchableOpacity>
              )}
            </View>
          </View>

          <View className="p-2">
            <Text
              style={{ fontFamily: gayaHuruf.lexend400 }}
              className="text-gray-500"
            >
              Nomor Telepon
            </Text>
            <View className="flex-row items-center border-b border-gray-300">
              <TextInput
                value={nomorTelepon}
                onChangeText={setNomorTelepon}
                onFocus={() => setTeleponFocused(true)}
                onBlur={() => setTeleponFocused(false)}
                style={{ fontFamily: gayaHuruf.lexend700 }}
                className="py-1 flex-1"
                placeholder="Masukkan nomor telepon"
              />
              {isTeleponFocused && nomorTelepon !== "" && (
                <TouchableOpacity onPress={() => setNomorTelepon("")}>
                  <Ionicons name="close-circle" size={20} color="green" />
                </TouchableOpacity>
              )}
            </View>
          </View>

          <View className="p-2">
            <Text
              style={{ fontFamily: gayaHuruf.lexend400 }}
              className="text-gray-500"
            >
              Label Alamat
            </Text>
            <View className="border-b border-gray-300 py-1">
              <Text style={{ fontFamily: gayaHuruf.lexend700 }}>
                {labelAlamat !== "" ? labelAlamat : "Pilih label"}
              </Text>
            </View>
            <View className="flex-row items-center mt-2 mb-1">
              {["Toko", "Rumah", "Perusahaan"].map((label) => (
                <TouchableOpacity
                  key={label}
                  className={`items-center mt-1 mr-1 rounded-full ${
                    labelAlamat === label
                      ? "bg-green-500"
                      : "border border-green-500"
                  } px-4 py-1`}
                  onPress={() => pilihLabel(label)}
                >
                  <Text
                    className={`text-${
                      labelAlamat === label ? "white" : "green-500"
                    } text-md text-center`}
                    style={{ fontFamily: gayaHuruf.lexend400 }}
                  >
                    {label}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          <View className="px-2 mb-2">
            <Text
              style={{ fontFamily: gayaHuruf.lexend400 }}
              className="text-gray-500"
            >
              Provinsi, kota, Kecamatan, Kode Pos
            </Text>
            <View className="flex-row items-center border-b border-gray-300">
              <Text style={{ fontFamily: gayaHuruf.lexend700 }}>
                JAWA BARAT, KAB. BANDUNG BARAT, BATUJAJAR, 40551
              </Text>
              <TouchableOpacity
                className="ml-2 p-1 rounded-full"
                onPress={toggleAlamat}
              >
                <Animated.View
                  className="ml-6 p-1 rounded-full"
                  style={{ transform: [{ rotate: rotateChevron }] }}
                >
                  <Ionicons name="chevron-forward" size={20} color="green" />
                </Animated.View>
              </TouchableOpacity>
            </View>

            <Animated.View style={{ height: alamatHeight, overflow: "hidden" }}>
              {isAlamatTerbuka && (
                <ScrollView
                  horizontal={true}
                  showsHorizontalScrollIndicator={false}
                  className="flex-row mt-2 w-[100%] h-[20%]"
                >
                  <View className="flex-row items-center">
                    <TouchableOpacity
                      className={`items-center mt-1 mr-1 rounded-full ${
                        aktifTombol === "provinsi"
                          ? "bg-green-500"
                          : "border border-green-500"
                      } px-4 py-1`}
                      onPress={() => setActiveButton("provinsi")}
                    >
                      <Text
                        className={`text-${
                          aktifTombol === "provinsi" ? "white" : "green-500"
                        } text-md text-center`}
                        style={{ fontFamily: gayaHuruf.lexend400 }}
                      >
                        Provinsi
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      className={`items-center mt-1 mr-1 rounded-full ${
                        aktifTombol === "kota"
                          ? "bg-green-500"
                          : "border border-green-500"
                      } px-4 py-1`}
                      onPress={() => setActiveButton("kota")}
                    >
                      <Text
                        className={`text-${
                          aktifTombol === "kota" ? "white" : "green-500"
                        } text-md text-center`}
                        style={{ fontFamily: gayaHuruf.lexend400 }}
                      >
                        Kota
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      className={`items-center mt-1 mr-1 rounded-full ${
                        aktifTombol === "kecamatan"
                          ? "bg-green-500"
                          : "border border-green-500"
                      } px-4 py-1`}
                      onPress={() => setActiveButton("kecamatan")}
                    >
                      <Text
                        className={`text-${
                          aktifTombol === "kecamatan" ? "white" : "green-500"
                        } text-md text-center`}
                        style={{ fontFamily: gayaHuruf.lexend400 }}
                      >
                        Kecamatan
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      className={`items-center mt-1 mr-1 rounded-full ${
                        aktifTombol === "kodePos"
                          ? "bg-green-500"
                          : "border border-green-500"
                      } px-4 py-1`}
                      onPress={() => setActiveButton("kodePos")}
                    >
                      <Text
                        className={`text-${
                          aktifTombol === "kodePos" ? "white" : "green-500"
                        } text-md text-center`}
                        style={{ fontFamily: gayaHuruf.lexend400 }}
                      >
                        Kode Pos
                      </Text>
                    </TouchableOpacity>
                  </View>
                </ScrollView>
              )}
              {isAlamatTerbuka && (
                <ScrollView className="border border-gray-300 h-60 p-1 ml-2 mt-3 mb-1">
                  <TouchableOpacity activeOpacity={0.5}>
                    <Text
                      className="p-2"
                      style={{ fontFamily: gayaHuruf.lexend400 }}
                    >
                      JAWA BARAT
                    </Text>
                  </TouchableOpacity>
                  <View className="border-b border-gray-300 w-[298px] ml-1 mb-1" />
                  <TouchableOpacity activeOpacity={0.5}>
                    <Text
                      className="p-2"
                      style={{ fontFamily: gayaHuruf.lexend400 }}
                    >
                      KAB. BANDUNG BARAT
                    </Text>
                  </TouchableOpacity>
                  <View className="border-b border-gray-300 w-[298px] ml-1 mb-1" />
                  <TouchableOpacity activeOpacity={0.5}>
                    <Text
                      className="p-2"
                      style={{ fontFamily: gayaHuruf.lexend400 }}
                    >
                      BATUJAJAR
                    </Text>
                  </TouchableOpacity>
                  <View className="border-b border-gray-300 w-[298px] ml-1 mb-1" />
                  <TouchableOpacity activeOpacity={0.5}>
                    <Text
                      className="p-2"
                      style={{ fontFamily: gayaHuruf.lexend400 }}
                    >
                      40551
                    </Text>
                  </TouchableOpacity>
                  <View className="border-b border-gray-300 w-[298px] ml-1 mb-1" />
                </ScrollView>
              )}
            </Animated.View>
          </View>
          <View className="flex-row items-center border-2 p-2 ml-2 rounded-lg border-gray-300">
            <View className="flex-row items-center justify-center">
              <Ionicons name="location-sharp" size={24} color="green" />
              <Text
                style={{ fontFamily: gayaHuruf.lexend400 }}
                className="ml-3 w-[230px]"
              >
                Jalan Desa Cibeber, RT.9/RW.6, Cibeber, Kec. Cibeber, Cimahi
              </Text>
              <TouchableOpacity
                activeOpacity={0.5}
                className="ml-2 w-12 h-12 justify-center items-center rounded-full"
              >
                <Text
                  style={{ fontFamily: gayaHuruf.lexend700 }}
                  className=" text-[#6B8F71]"
                >
                  Ubah
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
