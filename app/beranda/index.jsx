import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TextInput,
  Image,
  TouchableOpacity,
} from "react-native";
import { useRouter } from "expo-router";

// MODUL KAMI
import { gayaHuruf } from "../../constants/huruf";
import { ucapanSalam } from "../../constants/ucapanSalam";
import useNamaPelanggan from "../../hooks/useNamaPelanggan";
import useDataSayuranPopuler from "../../hooks/useDataSayuranPopuler";
import useDataJasaPopuler from "../../hooks/useDataJasaPopuler";
import usePencarianSayuranPopuler from "../../hooks/usePencarianSayuranPopuler";
import usePencarianJasaPopuler from "../../hooks/usePencarianJasaPopuler";
import formatRupiah from "../../utils/formatRupiah";
import SayuranPopuler from "../../components/sayuranPopuler";
import JasaPopuler from "../../components/jasaPopuler";
import BeritaPopuler from "../../components/beritaPopuler";

export default function Index() {
  const pengarah = useRouter();
  const ucapan = ucapanSalam();
  const dataTidakAda = require("../../assets/images/dataTidakAda.png");
  const { namaPelanggan } = useNamaPelanggan();
  const { dataSayuranPopuler, memuatSayuranPopuler } = useDataSayuranPopuler();
  const { dataJasaPopuler, memuatJasaPopuler } = useDataJasaPopuler();
  const [kataPencarian, setKataPencarian] = useState("");
  const ikonKeranjang = require("../../assets/images/ikonKeranjang1.png");
  const ikonCari = require("../../assets/images/ikonCari.png");
  const { hasilPencarianSayuranPopuler, menyorotiKataSayuranPopuler } =
    usePencarianSayuranPopuler(dataSayuranPopuler, kataPencarian);
  const { hasilPencarianJasaPopuler, menyorotiKataJasaPopuler } =
    usePencarianJasaPopuler(dataJasaPopuler, kataPencarian);

  return (
    <ScrollView className="bg-[#E7E8E2] flex-1">
      <View className="bg-[#556F50] p-4 flex-row items-center justify-between h-56 rounded-b-[35px]">
        <View className="mt-11 flex-row justify-between items-center w-[93%]">
          <Text className="text-white text-lg mx-2">
            <Text style={{ fontFamily: gayaHuruf.poppins500 }}>{ucapan}</Text>{" "}
            <Text style={{ fontFamily: gayaHuruf.poppins700 }}>
              {namaPelanggan}
            </Text>
          </Text>
          <TouchableOpacity
            activeOpacity={0.6}
            onPress={() => pengarah.push("../../detail/checkout")}
          >
            <View className="relative mr-5">
              <Image className="w-10 h-10" source={ikonKeranjang}></Image>
              <View className="absolute -top-2 -right-2 bg-red-600 rounded-full w-4 h-4 flex items-center justify-center">
                <Text
                  style={{ fontFamily: gayaHuruf.poppins700 }}
                  className="text-white text-xs"
                >
                  1
                </Text>
              </View>
            </View>
          </TouchableOpacity>
        </View>
      </View>

      <View className="p-4">
        <View className="bg-white rounded-2xl flex-row items-center px-3 py-2">
          <Image source={ikonCari} className="w-6 h-6" />
          <TextInput
            style={{ fontFamily: gayaHuruf.lexend400 }}
            placeholder="Silahkan Cari..."
            className="ml-2 w-80 text-gray-700"
            value={kataPencarian}
            onChangeText={(teks) => setKataPencarian(teks)}
          />
        </View>
      </View>

      <View className="p-4">
        <SayuranPopuler
          memuat={memuatSayuranPopuler}
          hasilPencarian={hasilPencarianSayuranPopuler}
          kataPencarian={kataPencarian}
          pengarah={pengarah}
          gayaHuruf={gayaHuruf}
          dataTidakAda={dataTidakAda}
          formatRupiah={formatRupiah}
          menyorotiKata={menyorotiKataSayuranPopuler}
        />

        <JasaPopuler
          memuat={memuatJasaPopuler}
          hasilPencarian={hasilPencarianJasaPopuler}
          kataPencarian={kataPencarian}
          pengarah={pengarah}
          gayaHuruf={gayaHuruf}
          dataTidakAda={dataTidakAda}
          formatRupiah={formatRupiah}
          menyorotiKata={menyorotiKataJasaPopuler}
        />

        <BeritaPopuler
          memuat={memuatJasaPopuler}
          hasilPencarian={hasilPencarianJasaPopuler}
          kataPencarian={kataPencarian}
          pengarah={pengarah}
          gayaHuruf={gayaHuruf}
          dataTidakAda={dataTidakAda}
          formatRupiah={formatRupiah}
          menyorotiKata={menyorotiKataJasaPopuler}
        />
      </View>
      <View className="justify-center items-center py-6">
        <Text
          className="text-gray-500"
          style={{ fontFamily: gayaHuruf.poppins500 }}
        >
          Dibuat oleh Bhineka Dev. © {new Date().getFullYear()}
        </Text>
      </View>
    </ScrollView>
  );
}
