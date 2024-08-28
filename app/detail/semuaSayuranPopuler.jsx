import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TextInput,
  Image,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { useRouter } from "expo-router";
import { FontAwesome } from "@expo/vector-icons";
import Toast from "react-native-toast-message";

// MODUL KAMI
import { gayaHuruf } from "../../constants/huruf";
import useDataSemuaSayuranPopuler from "../../hooks/useDataSemuaSayuranPopuler";
import formatRupiah from "../../utils/formatRupiah";
import usePencarianSayuranPopuler from "../../hooks/usePencarianSayuranPopuler";
import useKeranjangBelanja from "../../hooks/useKeranjangBelanja";
import useTambahKeranjangSayuran from "../../hooks/useTambahKeranjangSayuran";

export default function SemuaSayuranPopuler() {
  const [kataPencarian, setKataPencarian] = useState("");
  const pengarah = useRouter();
  const dataTidakAda = require("../../assets/images/dataTidakAda.png");
  const ikonCari = require("../../assets/images/ikonCari.png");
  const { semuaDataSayuranPopuler, memuatSemuaSayuranPopuler } =
    useDataSemuaSayuranPopuler();
  const { hasilPencarianSayuranPopuler, menyorotiKataSayuranPopuler } =
    usePencarianSayuranPopuler(semuaDataSayuranPopuler, kataPencarian);
  const { hitungKeranjang } = useKeranjangBelanja();
  const { tambahKeKeranjang, memuat } = useTambahKeranjangSayuran();

  return (
    <View className="flex-1 bg-[#E7E8E2]">
      <Toast />
      <View className="flex-row items-center mt-14 px-4 mb-2 -z-50">
        <TouchableOpacity onPress={() => pengarah.back("../")} className="mr-4">
          <View className="w-10 h-10 rounded-full flex justify-center items-center">
            <FontAwesome name="arrow-left" size={24} color="green" />
          </View>
        </TouchableOpacity>
        <View className="flex-1 flex-row items-center">
          <Text style={{ fontFamily: gayaHuruf.lexend900 }} className="text-lg">
            Sayuran Populer
          </Text>
        </View>
        <TouchableOpacity
          onPress={() => pengarah.push("../detail/keranjang")}
          activeOpacity={0.4}
        >
          <View className="w-10 h-10 rounded flex justify-center items-center mr-5">
            <FontAwesome name="shopping-cart" size={24} color="#447055" />
            {hitungKeranjang() > 0 && (
              <View className="absolute -top-0 -right-1 bg-red-600 rounded-full w-4 h-4 flex items-center justify-center">
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
      </View>

      <ScrollView className="flex-1">
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
          {memuatSemuaSayuranPopuler ? (
            <ActivityIndicator size="large" color="#556F50" />
          ) : (
            <View className="flex-1">
              {kataPencarian && hasilPencarianSayuranPopuler.length === 0 ? (
                <View className="flex-1 items-center justify-center">
                  <Image source={dataTidakAda} className="w-72 h-72 mb-4" />
                  <Text
                    className="text-gray-500 text-[1.3rem] text-center"
                    style={{ fontFamily: gayaHuruf.lexend900 }}
                  >
                    Tidak ada hasil untuk "{kataPencarian}"
                  </Text>
                </View>
              ) : (
                <View className="flex-row flex-wrap justify-between">
                  {(kataPencarian
                    ? hasilPencarianSayuranPopuler
                    : semuaDataSayuranPopuler
                  ).map((sayuran) => (
                    <View
                      key={sayuran.id}
                      className="bg-white rounded-xl p-4 mb-4 w-[48%]"
                    >
                      <TouchableOpacity
                        activeOpacity={0.5}
                        onPress={() =>
                          pengarah.push(
                            `/detail/sayuranPopuler?id=${sayuran.id}`
                          )
                        }
                      >
                        <Image
                          source={{ uri: sayuran.Gambar_Sayuran }}
                          className="w-full h-32 object-cover rounded-xl"
                        />
                      </TouchableOpacity>
                      <Text
                        className="text-xl mt-2 text-[#556F50]"
                        style={{ fontFamily: gayaHuruf.poppins700 }}
                      >
                        {menyorotiKataSayuranPopuler(
                          sayuran.Nama_Sayuran,
                          kataPencarian
                        )}
                      </Text>
                      <Text
                        style={{ fontFamily: gayaHuruf.lexend400 }}
                        className="text-gray-500"
                      >
                        {sayuran.Sayuran_Per_Kilo} Kg
                      </Text>
                      <View className="flex-row items-center justify-between mt-2">
                        <Text
                          style={{ fontFamily: gayaHuruf.poppins700 }}
                          className="text-black"
                        >
                          {formatRupiah(sayuran.Harga_Sayuran)}
                        </Text>
                        <Text
                          style={{ fontFamily: gayaHuruf.poppins500 }}
                          className="text-gray-500"
                        >
                          Stok {sayuran.Stok_Sayuran}
                        </Text>
                      </View>

                      <TouchableOpacity
                        onPress={() => tambahKeKeranjang(sayuran)}
                        activeOpacity={0.7}
                        className="w-full"
                      >
                        <View className="mt-3 flex bg-[#447055] rounded-md p-2">
                          {memuat === sayuran.id ? (
                            <ActivityIndicator size="small" color="#ffffff" />
                          ) : (
                            <Text
                              style={{ fontFamily: gayaHuruf.poppins500 }}
                              className="text-[#ffffff] text-center"
                            >
                              + Keranjang
                            </Text>
                          )}
                        </View>
                      </TouchableOpacity>
                    </View>
                  ))}
                </View>
              )}
            </View>
          )}
        </View>
      </ScrollView>
    </View>
  );
}
