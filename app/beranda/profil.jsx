import React, { useState, useEffect, useRef } from "react";
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
import firestore from "@react-native-firebase/firestore";
import auth from "@react-native-firebase/auth";
import useGayaHuruf from "../../hooks/useGayaHuruf";
import Toast from "react-native-toast-message";

export default function Profil() {
  const gambarBawaan = require("../../assets/images/pengguna-bawaan.png");

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

  const [fotoProfil, setFotoProfil] = useState(gambarBawaan);
  const [namaLengkap, setNamaLengkap] = useState("");
  const [umur, setUmur] = useState("");
  const [noTelepon, setNoTelepon] = useState("");
  const [provinsi, setProvinsi] = useState("");
  const [kota, setKota] = useState("");
  const [kabupaten, setKabupaten] = useState("");
  const [alamat, setAlamat] = useState("");
  const [kodePos, setKodePos] = useState("");
  const [jenisKelamin, setJenisKelamin] = useState("pria");
  const [memuat, setMemuat] = useState(true);

  const warnaAktif = "#4C6C52";
  const warnaTidakAktif = "#E7E8E2";

  const layarBergulir = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      setMemuat(true);
      try {
        const idPengguna = auth().currentUser.uid;
        const penggunaDoc = await firestore()
          .collection("pengguna")
          .doc(idPengguna)
          .get();

        if (penggunaDoc.exists) {
          const data = penggunaDoc.data();
          setNamaLengkap(data.Nama_Lengkap_Pengguna || "");
          setUmur(data.Umur_Pengguna || "");
          setNoTelepon(data.No_Telepon_Pengguna || "");
          setProvinsi(data.Provinsi_Pengguna || "");
          setKota(data.Kota_Pengguna || "");
          setKabupaten(data.Kabupaten_Pengguna || "");
          setAlamat(data.Alamat_Pengguna || "");
          setKodePos(data.Kode_Pos_Pengguna || "");
          setJenisKelamin(data.Jenis_Kelamin_Pengguna || "pria");
        }
      } catch (error) {
        Toast.show({
          type: "error",
          position: "top",
          text1: "Error",
          text2: "Gagal mengambil data pengguna.",
          onShow: () => {
            layarBergulir.current?.scrollTo({ y: 0, animated: true });
          },
        });
      } finally {
        setMemuat(false);
      }
    };

    fetchData();
  }, []);

  const pilihGambar = async () => {
    let permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (!permissionResult.granted) {
      Toast.show({
        type: "error",
        position: "top",
        text1: "Permission Denied",
        text2: "Izin akses galeri dibutuhkan!",
        onShow: () => {
          layarBergulir.current?.scrollTo({ y: 0, animated: true });
        },
      });
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

  const simpanPerubahan = async () => {
    if (
      !namaLengkap ||
      !umur ||
      !noTelepon ||
      !provinsi ||
      !kota ||
      !kabupaten ||
      !alamat ||
      !kodePos
    ) {
      Toast.show({
        type: "error",
        position: "top",
        text1: "Error",
        text2: "Semua field harus diisi!",
        onShow: () => {
          layarBergulir.current?.scrollTo({ y: 0, animated: true });
        },
      });
      return;
    }

    const idPengguna = auth().currentUser.uid;
    try {
      await firestore().collection("pengguna").doc(idPengguna).update({
        Nama_Lengkap_Pengguna: namaLengkap,
        Umur_Pengguna: umur,
        No_Telepon_Pengguna: noTelepon,
        Provinsi_Pengguna: provinsi,
        Kota_Pengguna: kota,
        Kabupaten_Pengguna: kabupaten,
        Alamat_Pengguna: alamat,
        Kode_Pos_Pengguna: kodePos,
        Jenis_Kelamin_Pengguna: jenisKelamin,
      });
      Toast.show({
        type: "success",
        position: "top",
        text1: "Sukses",
        text2: "Data berhasil diperbarui.",
        onShow: () => {
          layarBergulir.current?.scrollTo({ y: 0, animated: true });
        },
      });
    } catch (error) {
      Toast.show({
        type: "error",
        position: "top",
        text1: "Error",
        text2: "Gagal menyimpan data.",
        onShow: () => {
          layarBergulir.current?.scrollTo({ y: 0, animated: true });
        },
      });
    }
  };

  if (memuat) {
    return <Text>Memuat...</Text>;
  }

  return (
    <ScrollView ref={layarBergulir} className="flex-1 bg-white">
      <Toast />
      <View className="w-full mt pt-32 items-center justify-center">
        <Text
          style={{ fontFamily: gayaHurufBlack }}
          className="text-xl text-[#447055]"
        >
          Profil Saya
        </Text>
      </View>
      <View className="bg-[#E7E8E2] mx-auto p-2 w-[90%] rounded-[30px] mt-24 mb-10">
        <View className="items-center transform translate-y-[-60px]">
          <View className="w-32 h-32 bg-white rounded-full flex items-center justify-center mb-4 border-[1.5px] border-[#447055]">
            <TouchableOpacity
              className="w-28 h-28 rounded-full"
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
            {namaLengkap}
          </Text>
          <Text
            style={{ fontFamily: gayaHurufMedium }}
            className="text-[#447055] text-base"
          >
            {noTelepon}
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
                value={namaLengkap}
                onChangeText={setNamaLengkap}
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
                    value={umur}
                    onChangeText={setUmur}
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
                value={noTelepon}
                onChangeText={setNoTelepon}
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
                value={provinsi}
                onChangeText={setProvinsi}
                style={{ fontFamily: gayaHurufMedium }}
                placeholder="Provinsi"
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
                value={kota}
                onChangeText={setKota}
                style={{ fontFamily: gayaHurufMedium }}
                placeholder="Kota"
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
                className="border border-gray-400 rounded-md py-2 px-3"
                name="map-marker"
                size={20}
                color="black"
              />
              <TextInput
                value={kabupaten}
                onChangeText={setKabupaten}
                style={{ fontFamily: gayaHurufMedium }}
                placeholder="Kabupaten"
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
                size={20}
                color="black"
              />
              <TextInput
                value={alamat}
                onChangeText={setAlamat}
                style={{ fontFamily: gayaHurufMedium }}
                placeholder="Alamat"
                className="flex-1 ml-2 text-gray-700"
              />
            </View>
            <Text
              style={{ fontFamily: gayaHurufBold }}
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
                style={{ fontFamily: gayaHurufMedium }}
                placeholder="Kode Pos"
                className="flex-1 ml-2 text-gray-700"
              />
            </View>
            <Text
              style={{ fontFamily: gayaHurufBold }}
              className="text-lg text-[#447055] -mb-2 mt-4"
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
            activeOpacity={0.8}
            onPress={simpanPerubahan}
            className="bg-[#4C6C52] py-3 w-56 rounded-xl items-center self-center mt-5 -mb-5"
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
