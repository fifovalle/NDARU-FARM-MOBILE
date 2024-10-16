import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Image,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { useRouter } from "expo-router";

// MODUL KAMI
import { gayaHuruf } from "../../constants/huruf";
import useDataPesanPengguna from "../../hooks/useDataPesanPengguna";
import usePencarianPesan from "../../hooks/usePencarianPesan";

export default function Pesan() {
  const pengarah = useRouter();
  const [kataPencarian, setKataPencarian] = useState("");
  const dataTidakAda = require("../../assets/images/dataTidakAda.png");
  const gambarBawaan = require("../../assets/images/pengguna-bawaan.png");

  const ikonPencarian = require("../../assets/images/ikonCari.png");
  const dataTidakDitemukan = require("../../assets/images/dataTidakAda.png");

  const {
    dataPesanPengguna,
    memuatPesanPengguna,
    perbaruiStatusBaca,
    jumlahPesanBelumDibaca,
  } = useDataPesanPengguna();

  const { hasilPencarianPesan, menyorotiKataPesan } = usePencarianPesan(
    dataPesanPengguna,
    kataPencarian
  );

  if (memuatPesanPengguna) {
    return (
      <View className="flex-1 justify-center items-center bg-[#E7E8E2] px-3">
        <Text style={{ fontFamily: gayaHuruf.lexend400 }} className="text-lg">
          <ActivityIndicator size={20} color="#447055" />
        </Text>
      </View>
    );
  }

  return (
    <View className="flex-1 bg-[#E7E8E2] px-3">
      <View className="flex-row items-center p-4 mt-12 mb-3">
        <Text
          style={{ fontFamily: gayaHuruf.lexend900 }}
          className="text-lg ml-2"
        >
          Pesan
        </Text>
      </View>

      <View className="flex-row items-center bg-white rounded-full px-4 py-2 mb-2">
        <Image className="w-7 h-7" source={ikonPencarian} />
        <TextInput
          style={{ fontFamily: gayaHuruf.lexend400 }}
          placeholder="Cari Kontak..."
          className="ml-2 flex-1"
          placeholderTextColor="gray"
          value={kataPencarian}
          onChangeText={setKataPencarian}
        />
      </View>

      {dataPesanPengguna.length > 0 ? (
        <ScrollView className="px-4">
          {hasilPencarianPesan.length > 0 ? (
            hasilPencarianPesan.map((pesan) => (
              <TouchableOpacity
                key={pesan.id}
                onPress={async () => {
                  await perbaruiStatusBaca(pesan.id);
                  pengarah.push("detail/pesan?id=" + pesan.ID_Pengirim);
                }}
                activeOpacity={0.6}
                className="flex-row items-center py-2 my-4"
              >
                <View className="w-20 h-20 rounded-full mr-3 overflow-hidden flex items-center justify-center bg-white">
                  <Image
                    source={
                      pesan.pengirim.Foto_Pengguna
                        ? { uri: pesan.pengirim.Foto_Pengguna }
                        : gambarBawaan
                    }
                    className="w-16 h-16 mt-5 object-cover"
                  />
                </View>
                <View className="flex-1">
                  <Text
                    style={{
                      fontFamily: gayaHuruf.lexend900,
                      color: "black",
                    }}
                    className="text-lg"
                  >
                    {menyorotiKataPesan(
                      pesan.pengirim.Nama_Lengkap_Pengguna.length >= 7
                        ? `${pesan.pengirim.Nama_Lengkap_Pengguna.slice(
                            0,
                            1
                          ).toUpperCase()}${pesan.pengirim.Nama_Lengkap_Pengguna.slice(
                            1,
                            10
                          )}...`
                        : `${pesan.pengirim.Nama_Lengkap_Pengguna.slice(
                            0,
                            1
                          ).toUpperCase()}${pesan.pengirim.Nama_Lengkap_Pengguna.slice(
                            1
                          )}`
                    )}
                  </Text>
                  <Text
                    style={{
                      fontFamily: gayaHuruf.lexend400,
                      color: "black",
                    }}
                    className="text-lg"
                  >
                    {pesan.Pesan}
                  </Text>
                </View>
                {jumlahPesanBelumDibaca > 0 && (
                  <View className="bg-red-600 w-6 h-6 rounded-full justify-center items-center">
                    <Text
                      style={{ fontFamily: gayaHuruf.lexend700 }}
                      className="text-white text-xs"
                    >
                      {jumlahPesanBelumDibaca}
                    </Text>
                  </View>
                )}
              </TouchableOpacity>
            ))
          ) : (
            <View className="flex-1 items-center justify-center">
              <View className="flex-1 items-center justify-center">
                <Image source={dataTidakAda} className="w-72 h-72 mb-4" />
                <Text
                  className="text-gray-500 text-[1.3rem] text-center"
                  style={{ fontFamily: gayaHuruf.lexend900 }}
                >
                  Tidak ada hasil untuk "{kataPencarian}"
                </Text>
              </View>
            </View>
          )}
        </ScrollView>
      ) : (
        <View className="flex-1 items-center justify-center">
          <Image source={dataTidakDitemukan} className="w-72 h-72 mb-4" />
          <Text
            className="text-gray-500 text-[1.3rem] text-center"
            style={{ fontFamily: gayaHuruf.lexend900 }}
          >
            Tidak ada pesan!
          </Text>
        </View>
      )}
    </View>
  );
}
