import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Image,
  TouchableOpacity,
  ScrollView,
  Alert,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import useGayaHuruf from "../../hooks/useGayaHuruf";
import MapView, { Marker } from "react-native-maps";
import Geolocation from "react-native-geolocation-service";

export default function Profil() {
  const fotoProfil = require("../../assets/images/profil.png");

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

  const [jenisKelamin, setJenisKelamin] = useState("pria");

  const warnaAktif = "#4C6C52";
  const warnaTidakAktif = "#E7E8E2";

  const [lokasi, setLokasi] = useState(null);
  const tampilkanPeta = () => {
    Geolocation.getCurrentPosition(
      (posisi) => {
        const koordinat = {
          latitude: posisi.coords.latitude,
          longitude: posisi.coords.longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        };
        setLokasi(koordinat);
      },
      (error) => {
        Alert.alert("Error", "Gagal mendapatkan lokasi: " + error.message);
      },
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
    );
  };

  const pilihGambar = async () => {
    let permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted === false) {
      Alert.alert("Permission Denied", "Izin akses galeri dibutuhkan!");
      return;
    }

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 4],
      quality: 1,
    });

    if (!result.canceled) {
      setFotoProfil({ uri: result.assets[0].uri });
    }
  };

  return (
    <ScrollView className="flex-1 bg-white">
      <View className=" w-full mt-12 items-center justify-center">
        <Text
          style={{ fontFamily: gayaHurufBlack }}
          className="text-xl text-[#447055]"
        >
          Profil Saya
        </Text>
      </View>
      <View className="bg-[#E7E8E2] mx-auto p-2 w-[90%] rounded-[30px] mt-24 mb-10">
        <View className="items-center transform translate-y-[-60px]">
          <View className="w-32 h-32 bg-gray-300 rounded-full mb-4 flex overflow-hidden border-[1.5px] border-[#447055]">
            <TouchableOpacity
              className="w-32 h-32 bg-gray-300 rounded-full mb-4 flex overflow-hidden border-[1.5px] border-[#447055]"
              onPress={pilihGambar}
            >
              <Image
                source={fotoProfil}
                className="w-full h-full object-cover rounded-full"
              />
            </TouchableOpacity>
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
          <View className="py-3 px-4 items-start mt-5">
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
            </View>

            <Text
              style={{ fontFamily: gayaHurufBold }}
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
                style={{ fontFamily: gayaHurufMedium }}
                placeholder="Nomor telepon Anda"
                className="flex-1 ml-2 text-gray-700"
              />
            </View>
            <Text
              style={{ fontFamily: gayaHurufBold }}
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
                style={{ fontFamily: gayaHurufMedium }}
                placeholder="Alamat Anda"
                className="flex-1 ml-2 text-gray-700"
              />
            </View>
            <Text
              style={{ fontFamily: gayaHurufBold }}
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
                style={{ fontFamily: gayaHurufMedium }}
                placeholder="Alamat Anda"
                className="flex-1 ml-2 text-gray-700"
              />
            </View>
            <Text
              style={{ fontFamily: gayaHurufBold }}
              className="text-lg text-[#447055]"
            >
              Kabupaten :
            </Text>
            <View className="flex-row items-center border border-gray-400 rounded-lg p-2 mb-4">
              <FontAwesome
                className="border border-gray-400 rounded-md py-2 px-4"
                name="map-marker"
                size={24}
                color="black"
              />
              <TextInput
                style={{ fontFamily: gayaHurufMedium }}
                placeholder="Alamat Anda"
                className="flex-1 ml-2 text-gray-700"
              />
            </View>
            <Text
              style={{ fontFamily: gayaHurufBold }}
              className="text-lg text-[#447055]"
            >
              Alamat :
            </Text>
            <View className="flex-row items-center border border-gray-400 rounded-lg p-2 mb-4">
              <FontAwesome
                className="border border-gray-400 rounded-md py-2 px-3"
                name="home"
                size={24}
                color="black"
              />
              <TextInput
                style={{ fontFamily: gayaHurufMedium }}
                placeholder="Alamat Anda"
                className="flex-1 ml-2 text-gray-700"
              />
            </View>
            <Text
              style={{ fontFamily: gayaHurufBold }}
              className="text-lg text-[#447055]"
            >
              Kode Pos :
            </Text>
            <View className="flex-row items-center border border-gray-400 rounded-lg p-2">
              <FontAwesome
                className="border border-gray-400 rounded-md py-2 px-3"
                name="envelope-open"
                size={24}
                color="black"
              />
              <TextInput
                style={{ fontFamily: gayaHurufMedium }}
                placeholder="Alamat Anda"
                className="flex-1 ml-2 text-gray-700"
              />
            </View>
            <TouchableOpacity
              activeOpacity={0.8}
              className="mt-4 bg-[#4C6C52] py-2 px-3 rounded-xl mx-auto"
              onPress={tampilkanPeta}
            >
              <Text
                style={{ fontFamily: gayaHurufBold }}
                className="text-white text-md"
              >
                Tampilkan Lokasi Saya
              </Text>
            </TouchableOpacity>

            {lokasi && (
              <MapView
                style={{ height: 200, width: "100%", marginTop: 20 }}
                region={lokasi}
              >
                <Marker coordinate={lokasi} />
              </MapView>
            )}
            <View className="mt-4">
              <Text
                style={{ fontFamily: gayaHurufBold }}
                className="text-lg text-[#447055] -mb-2"
              >
                Jenis Kelamin :
              </Text>
              <View className="flex-row items-center rounded-lg p-2">
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
                        jenisKelamin === "wanita"
                          ? warnaAktif
                          : warnaTidakAktif,
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
          </View>
          <TouchableOpacity
            activeOpacity={0.8}
            className="bg-[#4C6C52] py-3 w-56 rounded-xl items-center self-center mt-10 -mb-6"
          >
            <Text
              style={{ fontFamily: gayaHurufBold }}
              className="text-white text-lg"
            >
              Simpan Perubahan
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}
