import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  ScrollView,
} from "react-native";
import React from "react";
import { useRouter } from "expo-router";

// MODUL KAMI
import { gayaHuruf } from "../../constants/huruf";
import usePembayaran from "../../hooks/usePembayaran";

export default function Transaksi() {
  const pengarah = useRouter();
  const dataTidakAda = require("../../assets/images/dataTidakAda.png");

  const ikonPencarian = require("../../assets/images/ikonCari.png");
  const ikonkeranjang2 = require("../../assets/images/ikonKeranjang2.png");
  const { transaksi, statusWarna, formatRupiah, formatTanggal } =
    usePembayaran();

  return (
    <ScrollView className="flex-1 bg-[#E7E8E2] px-4">
      <View className="flex-row items-center mt-14 mb-8">
        <Text
          style={{ fontFamily: gayaHuruf.lexend900 }}
          className="text-lg ml-4"
        >
          Transaksi
        </Text>
      </View>
      <View className="flex-row items-center bg-white rounded-full px-4 py-2 mb-4">
        <Image className="w-7 h-7" source={ikonPencarian} />
        <TextInput
          style={{ fontFamily: gayaHuruf.lexend400 }}
          placeholder="Cari Transaksi..."
          className="ml-2 flex-1"
          placeholderTextColor="gray"
        />
      </View>
      {transaksi.length > 0 ? (
        transaksi.map((trans) => (
          <View
            key={trans.id}
            className="bg-white p-4 rounded-xl shadow-xl mb-7"
          >
            <TouchableOpacity
              onPress={() => pengarah.push("../detail/transaksi")}
              activeOpacity={0.6}
            >
              <View className="flex-row items-center justify-between mb-2">
                <View className="flex-row items-center">
                  <Image className="w-10 h-10" source={ikonkeranjang2} />
                  <View className="ml-3">
                    <Text
                      style={{ fontFamily: gayaHuruf.lexend700 }}
                      className="text-md text-gray-500"
                    >
                      Belanja
                    </Text>
                    <Text
                      style={{ fontFamily: gayaHuruf.lexend400 }}
                      className="text-sm text-gray-400"
                    >
                      {formatTanggal(trans.Waktu_Pembelian)}
                    </Text>
                  </View>
                </View>
                <View
                  className="flex-row items-center justify-center p-1 rounded-lg"
                  style={{
                    backgroundColor: statusWarna(trans.Status),
                  }}
                >
                  <Text
                    style={{ fontFamily: gayaHuruf.lexend700 }}
                    className="text-sm text-center w-32"
                  >
                    {trans.Status}
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
            <View className="border-b border-gray-300 mb-3" />
            {trans.Barang.map((barang) => (
              <View
                className="flex items-start justify-between"
                key={barang.Gambar}
              >
                <View className="flex-row items-center">
                  <View className="w-16 h-16 bg-gray-200 rounded-lg mr-4 flex items-center justify-center">
                    <Image
                      className="w-14 h-14"
                      source={{ uri: barang.Gambar }}
                    />
                  </View>
                  <View>
                    <Text
                      style={{ fontFamily: gayaHuruf.lexend700 }}
                      className="text-lg"
                    >
                      {barang.Nama}
                    </Text>
                    <Text
                      style={{ fontFamily: gayaHuruf.lexend400 }}
                      className="text-sm text-gray-500"
                    >
                      {barang.ID_Jasa
                        ? `${barang.Jumlah} Bulan`
                        : `${barang.Jumlah} Kg`}
                    </Text>
                  </View>
                </View>
              </View>
            ))}
            <View className="flex-row items-center justify-between w-full mt-4">
              <View className="flex items-start">
                <Text
                  style={{ fontFamily: gayaHuruf.lexend700 }}
                  className="text-md text-[#626262]"
                >
                  Total Belanja :
                </Text>
                <Text
                  style={{ fontFamily: gayaHuruf.lexend700 }}
                  className="text-lg text-green-700"
                >
                  {formatRupiah(trans.Total_Harga)}
                </Text>
              </View>
              <TouchableOpacity
                activeOpacity={0.5}
                className="mt-2 bg-[#447055] py-1 px-4 rounded-md"
              >
                <Text
                  style={{ fontFamily: gayaHuruf.lexend700 }}
                  className="text-center text-white"
                >
                  Beli Lagi
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        ))
      ) : (
        <View className="flex-1 items-center justify-center">
          <Image source={dataTidakAda} className="w-72 h-72 mb-4" />
          <Text
            className="text-gray-500 text-[1.3rem] text-center"
            style={{ fontFamily: gayaHuruf.lexend900 }}
          >
            Anda belum membeli apapun
          </Text>
        </View>
      )}
    </ScrollView>
  );
}
