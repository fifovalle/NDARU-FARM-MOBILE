import React, { useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  Image,
  ScrollView,
  TouchableOpacity,
  ImageBackground,
  ActivityIndicator,
  Keyboard,
} from "react-native";
import { useRouter, useGlobalSearchParams } from "expo-router";
import { FontAwesome } from "@expo/vector-icons";
import auth from "@react-native-firebase/auth";

// MODUL KAMI
import { gayaHuruf } from "../../constants/huruf";
import useDataPesanMasuk from "../../hooks/useDataPesanMasuk";
import { gulirOtomatisKeBawah } from "../../utils/gulirOtomatisKeBawah";

export default function Pesan() {
  const { id } = useGlobalSearchParams();
  const pengarah = useRouter();
  const layarPesan = require("../../assets/images/gambarPesan.png");

  const {
    dataPengguna,
    memuatPengguna,
    daftarPesan,
    kirimPesan,
    pesanBaru,
    setPesanBaru,
    memuatTampilkanPesan,
    memuatKirimPesan,
  } = useDataPesanMasuk(id);

  const { gulirSegera, tanganiKirimPesan, tanganiScrollSaatMengetik } =
    gulirOtomatisKeBawah();

  useEffect(() => {
    tanganiScrollSaatMengetik();
  }, []);

  return (
    <View className="flex-1 bg-[#E7E8E2] px-2">
      <View className="flex-row items-center p-4 border-b border-gray-300 mt-12">
        <TouchableOpacity
          onPress={() => pengarah.back("beranda/pesan")}
          className="mr-4"
        >
          <FontAwesome name="arrow-left" size={24} color="green" />
        </TouchableOpacity>
        <View className="flex-1 flex-row items-center">
          <View className="w-14 h-14 bg-white rounded-full mr-3 overflow-hidden flex items-center justify-center">
            <Image
              source={{
                uri: dataPengguna?.Foto_Pengguna
                  ? dataPengguna.Foto_Pengguna
                  : "https://disk.mediaindonesia.com/files/news/2022/11/03/wa15.jpg",
              }}
              className="w-14 h-14 object-cover"
            />
          </View>
          <View>
            {memuatPengguna ? (
              <ActivityIndicator size="small" color="green" />
            ) : (
              <>
                <Text
                  style={{ fontFamily: gayaHuruf.lexend900 }}
                  className="text-green-900"
                >
                  {dataPengguna.Nama_Lengkap_Pengguna.length >= 7
                    ? `${dataPengguna.Nama_Lengkap_Pengguna.slice(
                        0,
                        1
                      ).toUpperCase()}${dataPengguna.Nama_Lengkap_Pengguna.slice(
                        1,
                        20
                      )}...`
                    : `${dataPengguna.Nama_Lengkap_Pengguna.slice(
                        0,
                        1
                      ).toUpperCase()}${dataPengguna.Nama_Lengkap_Pengguna.slice(
                        1
                      )}`}
                </Text>
                <Text
                  style={{ fontFamily: gayaHuruf.poppins500 }}
                  className="text-sm"
                >
                  {dataPengguna?.status || "online"}
                </Text>
              </>
            )}
          </View>
        </View>
        <TouchableOpacity activeOpacity={0.4}>
          <FontAwesome name="search" size={20} color="green" />
        </TouchableOpacity>
      </View>

      <ImageBackground className="w-screen flex-1" source={layarPesan}>
        <ScrollView
          ref={gulirSegera}
          className="px-4"
          onContentSizeChange={() =>
            gulirSegera.current.scrollToEnd({ animated: true })
          }
        >
          <View className="flex items-center">
            <Text
              style={{ fontFamily: gayaHuruf.poppins500 }}
              className="text-center mb-2 mt-2 text-white bg-black w-20 rounded-lg"
            >
              Hari ini
            </Text>
          </View>

          <View className="flex-1 mb-4">
            {memuatTampilkanPesan ? (
              <ActivityIndicator size="large" color="#447055" />
            ) : (
              daftarPesan.map((pesan) => (
                <View
                  key={pesan.id}
                  className={`flex-row  ${
                    pesan.ID_Pengirim === auth().currentUser.uid
                      ? "justify-end"
                      : "justify-start"
                  }`}
                >
                  <View
                    className={`w-9 h-9 bg-white rounded-full mr-2 overflow-hidden flex items-center justify-center ${
                      pesan.ID_Pengirim === auth().currentUser.uid
                        ? "hidden"
                        : ""
                    }`}
                  >
                    <Image
                      source={{
                        uri: dataPengguna?.Foto_Pengguna
                          ? dataPengguna.Foto_Pengguna
                          : "https://disk.mediaindonesia.com/files/news/2022/11/03/wa15.jpg",
                      }}
                      className="w-9 h-9 object-cover"
                    />
                  </View>
                  <TouchableOpacity
                    activeOpacity={0.7}
                    className={`bg-${
                      pesan.ID_Pengirim === auth().currentUser.uid
                        ? "[#447055]"
                        : "[#E7E8E2]"
                    } rounded-lg p-3 max-w-[60%] mb-2`}
                  >
                    <Text
                      style={{ fontFamily: gayaHuruf.poppins500 }}
                      className={`text-${
                        pesan.ID_Pengirim === auth().currentUser.uid
                          ? "white"
                          : "gray-700"
                      }`}
                    >
                      {pesan.Pesan}
                    </Text>
                    <View className="items-end">
                      <Text
                        style={{ fontFamily: gayaHuruf.poppins500 }}
                        className={`text-${
                          pesan.ID_Pengirim === auth().currentUser.uid
                            ? "white"
                            : "gray-700"
                        }`}
                      >
                        <Text>
                          {new Date(
                            pesan.Waktu_Pengiriman_Pesan?.toDate()
                          ).toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </Text>
                      </Text>
                    </View>
                  </TouchableOpacity>
                </View>
              ))
            )}
          </View>
        </ScrollView>
      </ImageBackground>

      <View className="flex-row w-full h-[70px] bg-white rounded-full overflow-hidden flex items-center justify-center">
        <TouchableOpacity activeOpacity={0.4} className="mr-2">
          <FontAwesome name="plus-circle" size={26} color="black" />
        </TouchableOpacity>
        <View className="flex-row items-center ml-3 bg-[#E7E8E2] rounded-full w-72">
          <TextInput
            style={{ fontFamily: gayaHuruf.poppins500 }}
            placeholder="Tulis pesan..."
            className="flex-1 p-3 text-gray-700"
            value={pesanBaru}
            onChangeText={setPesanBaru}
          />
          <TouchableOpacity
            activeOpacity={0.4}
            className="p-2 mr-4"
            onPress={() => tanganiKirimPesan(kirimPesan, pesanBaru)}
            disabled={memuatKirimPesan}
          >
            {memuatKirimPesan ? (
              <ActivityIndicator size={22} color="black" />
            ) : (
              <FontAwesome name="send" size={22} color="black" />
            )}
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
