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

// MODUL KAMI
import { gayaHuruf } from "../../constants/huruf";
import useDataSemuaBeritaPopuler from "../../hooks/useDataSemuaBeritaPopuler";
import usePencarianBeritaPopuler from "../../hooks/usePencarianBeritaPopuler";
import formatTanggal from "../../utils/formatTanggal";

export default function SemuaJasaPopuler() {
  const [kataPencarian, setKataPencarian] = useState("");
  const pengarah = useRouter();
  const dataTidakAda = require("../../assets/images/dataTidakAda.png");
  const ikonCari = require("../../assets/images/ikonCari.png");
  const { semuaDataBeritaPopuler, memuatSemuaBeritaPopuler } =
    useDataSemuaBeritaPopuler();
  const { hasilPencarianBeritaPopuler, menyorotiKataBeritaPopuler } =
    usePencarianBeritaPopuler(semuaDataBeritaPopuler, kataPencarian);

  return (
    <View className="flex-1 bg-[#E7E8E2]">
      <View className="flex-row items-center mt-14 px-4 mb-2">
        <TouchableOpacity onPress={() => pengarah.back("../")} className="mr-4">
          <View className="w-10 h-10 rounded-full flex justify-center items-center">
            <FontAwesome name="arrow-left" size={24} color="green" />
          </View>
        </TouchableOpacity>
        <View className="flex-1 flex-row items-center">
          <Text
            style={{ fontFamily: gayaHuruf.lexend900 }}
            className="text-lg text-[#447055]"
          >
            Berita Populer
          </Text>
        </View>
      </View>

      <ScrollView className="flex-1">
        <View className="p-4">
          <View className="bg-white rounded-2xl flex-row items-center px-3 py-2">
            <Image source={ikonCari} className="w-6 h-6" />
            <TextInput
              style={{ fontFamily: gayaHuruf.lexend400 }}
              placeholder="Cari Berita..."
              className="ml-2 w-80 text-gray-700"
              value={kataPencarian}
              onChangeText={(teks) => setKataPencarian(teks)}
            />
          </View>
        </View>

        {memuatSemuaBeritaPopuler ? (
          <ActivityIndicator size="large" color="#556F50" />
        ) : (
          <View className="flex-1">
            {kataPencarian && hasilPencarianBeritaPopuler.length === 0 ? (
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
                {hasilPencarianBeritaPopuler.map((berita, indeks) => (
                  <TouchableOpacity
                    key={indeks}
                    activeOpacity={0.7}
                    className="flex items-center justify-center mb-6 px-2 mx-auto"
                    onPress={() =>
                      pengarah.push("../detail/beritaPopuler?id=" + berita.id)
                    }
                  >
                    <View className="flex-row bg-white rounded-xl p-6">
                      <View className="w-32 h-32 flex items-center justify-center rounded-xl">
                        <Image
                          className="w-28 h-28 rounded-xl"
                          source={{ uri: berita.Gambar_Berita }}
                        />
                      </View>
                      <View className="px-4 w-[200px]">
                        <Text style={{ fontFamily: gayaHuruf.poppins700 }}>
                          {menyorotiKataBeritaPopuler(
                            berita.Judul_Berita.length >= 7
                              ? `${berita.Judul_Berita.slice(
                                  0,
                                  1
                                ).toUpperCase()}${berita.Judul_Berita.slice(
                                  1,
                                  25
                                )}...`
                              : `${berita.Judul_Berita.slice(
                                  0,
                                  1
                                ).toUpperCase()}${berita.Judul_Berita.slice(
                                  1
                                )}`,
                            kataPencarian
                          )}
                        </Text>
                        <Text
                          className="text-sm text-gray-500 mt-1"
                          style={{ fontFamily: gayaHuruf.lexend400 }}
                        >
                          {berita.Isi_Berita.length >= 7
                            ? `${berita.Isi_Berita.slice(
                                0,
                                1
                              ).toUpperCase()}${berita.Isi_Berita.slice(
                                1,
                                50
                              )}...`
                            : `${berita.Isi_Berita.slice(
                                0,
                                1
                              ).toUpperCase()}${berita.Isi_Berita.slice(1)}`}
                        </Text>
                        <Text
                          className="text-sm text-gray-700 mt-3"
                          style={{ fontFamily: gayaHuruf.lexend400 }}
                        >
                          {formatTanggal(berita.Tanggal_Berita)}
                        </Text>
                        <Text
                          className="text-sm text-gray-500 self-end"
                          style={{ fontFamily: gayaHuruf.lexend400 }}
                        >
                          {berita.Kategori_Berita}
                        </Text>
                      </View>
                    </View>
                  </TouchableOpacity>
                ))}
              </View>
            )}
          </View>
        )}
      </ScrollView>
    </View>
  );
}
