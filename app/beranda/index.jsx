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
import useDataSayuranPopuler from "../../hooks/useDataSayuranPopuler";
import useDataJasaPopuler from "../../hooks/useDataJasaPopuler";
import useDataBeritaPopuler from "../../hooks/useDataBeritaPopuler";
import usePencarianSayuranPopuler from "../../hooks/usePencarianSayuranPopuler";
import usePencarianBeritaPopuler from "../../hooks/usePencarianBeritaPopuler";
import usePencarianJasaPopuler from "../../hooks/usePencarianJasaPopuler";
import formatRupiah from "../../utils/formatRupiah";
import formatTanggal from "../../utils/formatTanggal";
import SayuranPopuler from "../../components/sayuranPopuler";
import JasaPopuler from "../../components/jasaPopuler";
import BeritaPopuler from "../../components/beritaPopuler";
import Toast from "react-native-toast-message";
import { FontAwesome } from "@expo/vector-icons";
import useKeranjangBelanja from "../../hooks/useKeranjangBelanja";

export default function Index() {
  const pengarah = useRouter();
  const dataTidakAda = require("../../assets/images/dataTidakAda.png");
  const { dataSayuranPopuler, memuatSayuranPopuler } = useDataSayuranPopuler();
  const { dataJasaPopuler, memuatJasaPopuler } = useDataJasaPopuler();
  const { dataBeritaPopuler, memuatBeritaPopuler } = useDataBeritaPopuler();
  const [kataPencarian, setKataPencarian] = useState("");
  const ikonKeranjang = require("../../assets/images/ikonKeranjang1.png");
  const ikonCari = require("../../assets/images/ikonCari.png");
  const { hasilPencarianSayuranPopuler, menyorotiKataSayuranPopuler } =
    usePencarianSayuranPopuler(dataSayuranPopuler, kataPencarian);
  const { hasilPencarianJasaPopuler, menyorotiKataJasaPopuler } =
    usePencarianJasaPopuler(dataJasaPopuler, kataPencarian);
  const { hasilPencarianBeritaPopuler, menyorotiKataBeritaPopuler } =
    usePencarianBeritaPopuler(dataBeritaPopuler, kataPencarian);
  const { hitungKeranjang } = useKeranjangBelanja();

  return (
    <View className="flex-1 bg-[#E7E8E2]">
      <Toast />
      <View className="flex-row bg-[#447055] h-32 pt-12 w-screen -z-50">
        <View className="flex-row items-center mx-auto">
          <View className="bg-white rounded-2xl flex-row items-center px-3 py-2 w-64">
            <Image source={ikonCari} className="w-6 h-6" />
            <TextInput
              style={{ fontFamily: gayaHuruf.lexend400 }}
              placeholder="Silahkan Cari..."
              className="ml-2 w-80 text-gray-700"
              value={kataPencarian}
              onChangeText={(teks) => setKataPencarian(teks)}
            />
          </View>
          <TouchableOpacity
            className="ml-4"
            activeOpacity={0.6}
            onPress={() => pengarah.push("../../detail/keranjang")}
          >
            <View className="relative mr-5">
              <Image className="w-10 h-10" source={ikonKeranjang}></Image>
              {hitungKeranjang() > 0 && (
                <View className="absolute -top-2 -right-2 bg-red-600 rounded-full w-4 h-4 flex items-center justify-center">
                  <Text
                    style={{ fontFamily: gayaHuruf.poppins700 }}
                    className="text-white text-xs"
                  >
                    {hitungKeranjang()}
                  </Text>
                </View>
              )}
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            className="ml-2"
            activeOpacity={0.6}
            onPress={() => pengarah.push("../../beranda/pesan")}
          >
            <View className="relative mr-5">
              <FontAwesome name="envelope" size={24} color="white" />
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
      <ScrollView className="bg-[#E7E8E2]">
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
            memuat={memuatBeritaPopuler}
            hasilPencarian={hasilPencarianBeritaPopuler}
            kataPencarian={kataPencarian}
            pengarah={pengarah}
            gayaHuruf={gayaHuruf}
            dataTidakAda={dataTidakAda}
            formatTanggal={formatTanggal}
            menyorotiKata={menyorotiKataBeritaPopuler}
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
    </View>
  );
}
