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
import useDataSemuaJasaPopuler from "../../hooks/useDataSemuaJasaPopuler";
import formatRupiah from "../../utils/formatRupiah";
import usePencarianJasaPopuler from "../../hooks/usePencarianJasaPopuler";

export default function SemuaJasaPopuler() {
  const [kataPencarian, setKataPencarian] = useState("");
  const pengarah = useRouter();
  const dataTidakAda = require("../../assets/images/dataTidakAda.png");
  const ikonCari = require("../../assets/images/ikonCari.png");
  const { semuaDataJasaPopuler, memuatSemuaJasaPopuler } =
    useDataSemuaJasaPopuler();
  const { hasilPencarianJasaPopuler, menyorotiKataJasaPopuler } =
    usePencarianJasaPopuler(semuaDataJasaPopuler, kataPencarian);

  return (
    <View className="flex-1 bg-[#E7E8E2]">
      <View className="flex-row items-center mt-14 px-4 mb-2">
        <TouchableOpacity onPress={() => pengarah.back("../")} className="mr-4">
          <View className="w-10 h-10 rounded-full flex justify-center items-center">
            <FontAwesome name="arrow-left" size={24} color="green" />
          </View>
        </TouchableOpacity>
        <View className="flex-1 flex-row items-center">
          <Text style={{ fontFamily: gayaHuruf.lexend900 }} className="text-lg">
            Jasa Populer
          </Text>
        </View>
        <TouchableOpacity
          onPress={() => pengarah.push("../detail/keranjang")}
          activeOpacity={0.4}
        >
          <View className="w-10 h-10 rounded flex justify-center items-center mr-5">
            <FontAwesome name="shopping-cart" size={24} color="#447055" />
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
          {memuatSemuaJasaPopuler ? (
            <ActivityIndicator size="large" color="#556F50" />
          ) : (
            <View className="flex-1">
              {kataPencarian && hasilPencarianJasaPopuler.length === 0 ? (
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
                    ? hasilPencarianJasaPopuler
                    : semuaDataJasaPopuler
                  ).map((jasa) => (
                    <View
                      key={jasa.id}
                      className="bg-white rounded-xl p-4 mb-4 w-[48%]"
                    >
                      <TouchableOpacity
                        activeOpacity={0.5}
                        onPress={() =>
                          pengarah.push(`/detail/jasaPopuler?id=${jasa.id}`)
                        }
                      >
                        <Image
                          source={{ uri: jasa.Gambar_Jasa }}
                          className="w-full h-32 object-cover rounded-xl"
                        />
                      </TouchableOpacity>

                      <Text
                        className="text-xl mt-2 text-[#556F50]"
                        style={{ fontFamily: gayaHuruf.poppins700 }}
                      >
                        {menyorotiKataJasaPopuler(
                          jasa.Nama_Jasa,
                          kataPencarian
                        )}
                      </Text>
                      <Text
                        style={{ fontFamily: gayaHuruf.lexend400 }}
                        className="text-gray-500"
                      >
                        {jasa.Jangka_Waktu_Jasa} Bulan
                      </Text>

                      <View className="flex-row items-center justify-between mt-2">
                        <Text
                          style={{ fontFamily: gayaHuruf.poppins700 }}
                          className="text-black"
                        >
                          {formatRupiah(jasa.Harga_Jasa)}
                        </Text>
                      </View>

                      <TouchableOpacity activeOpacity={0.7} className="w-full">
                        <View className="mt-3 flex bg-[#447055] rounded-md p-2">
                          <Text
                            style={{ fontFamily: gayaHuruf.poppins500 }}
                            className="text-[#ffffff] text-center"
                          >
                            + Keranjang
                          </Text>
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
