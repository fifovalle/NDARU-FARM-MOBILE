import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  TextInput,
  Image,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import useGayaHuruf from "../../hooks/useGayaHuruf";
import useDetailSayuran from "../../hooks/useDetailSayuran";
import { formatRupiah } from "../../utils/formatRupiah";
import TeksDiSorot from "../../utils/teksDiSorot";
import { FontAwesome } from "@expo/vector-icons";
import { router } from "expo-router";

export default function Index() {
  const [loading, setLoading] = useState(true);
  const dataTIdakAda = require("../../assets/images/dataTidakAda.png");
  const ikonCari = require("../../assets/images/ikonCari.png");
  const {
    sayuranTersaring,
    statusGambar,
    kueriPencarian,
    setKueriPencarian,
    handleImageLoad,
  } = useDetailSayuran();

  const gayaHurufReguler = useGayaHuruf({
    android: "Lexend_400Regular",
    ios: "Lexend_400Regular",
  });

  const gayaHurufHitam = useGayaHuruf({
    android: "Lexend_900Black",
    ios: "Lexend_900Black",
  });

  const gayaHurufSedang = useGayaHuruf({
    android: "Poppins_500Medium",
    ios: "Poppins_500Medium",
  });

  const gayaHurufTebal = useGayaHuruf({
    android: "Poppins_700Bold",
    ios: "Poppins_700Bold",
  });

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
      }, 2000);
    };

    loadData();
  }, []);

  return (
    <View className="flex-1 bg-[#E7E8E2] ">
      <View className="flex-row items-center mt-14 px-4 mb-2">
        <TouchableOpacity onPress={() => router.back("../")} className="mr-4">
          <View className="w-10 h-10 rounded-full flex justify-center items-center">
            <FontAwesome name="arrow-left" size={24} color="green" />
          </View>
        </TouchableOpacity>
        <View className="flex-1 flex-row items-center">
          <Text
            style={{ fontFamily: gayaHurufHitam }}
            className="text-lg tex-[#447055]"
          >
            Sayuran Populer
          </Text>
        </View>
        <TouchableOpacity
          onPress={() => router.push("../detail/detailKeranjang")}
          activeOpacity={0.4}
        >
          <View className="w-10 h-10 rounded flex justify-center items-center mr-5">
            <FontAwesome name="shopping-cart" size={24} color="#447055" />
          </View>
        </TouchableOpacity>
      </View>

      {loading ? (
        <View className="flex-1 justify-center items-center">
          <ActivityIndicator size="large" color="#556F50" />
        </View>
      ) : (
        <ScrollView className="flex-1">
          <View className="p-4">
            <View className="bg-white rounded-2xl flex-row items-center px-3 py-2">
              <Image source={ikonCari} className="w-6 h-6" />
              <TextInput
                style={{ fontFamily: gayaHurufReguler }}
                placeholder="Silahkan Cari..."
                className="ml-2 w-80 text-gray-700"
                value={kueriPencarian}
                onChangeText={setKueriPencarian}
              />
            </View>
          </View>

          <View className="p-4">
            {sayuranTersaring.length === 0 ? (
              <View className="flex items-center justify-center">
                <Image className="w-80 h-80" source={dataTIdakAda} />
                <Text
                  style={{ fontFamily: gayaHurufSedang }}
                  className="text-grey text-center text-gray-500 text-sm mt-10 font-bold"
                >
                  Tidak ada sayuran!
                </Text>
              </View>
            ) : (
              <View className="flex-row justify-between flex-wrap">
                {sayuranTersaring.map((sayuran, indeks) => (
                  <View
                    key={indeks}
                    className="bg-white rounded-xl p-4 mb-4 w-[48%]"
                  >
                    <TouchableOpacity activeOpacity={0.5}>
                      {!statusGambar[sayuran.id] && (
                        <View className="w-full h-32 flex items-center justify-center">
                          <ActivityIndicator size="large" color="#556F50" />
                        </View>
                      )}
                      <Image
                        source={{ uri: sayuran.Foto_Sayuran }}
                        className={`w-full h-32 object-cover rounded-xl ${
                          statusGambar[sayuran.id] ? "block" : "hidden"
                        }`}
                        onLoad={() => handleImageLoad(sayuran.id)}
                      />
                    </TouchableOpacity>

                    <Text
                      className="text-[#556F50] text-lg font-semibold mt-2"
                      style={{ fontFamily: gayaHurufTebal }}
                    >
                      {TeksDiSorot(
                        sayuran.Nama_Sayuran,
                        kueriPencarian,
                        gayaHurufTebal,
                        gayaHurufReguler
                      )}
                    </Text>
                    <Text
                      style={{ fontFamily: gayaHurufReguler }}
                      className="text-gray-500"
                    >
                      {sayuran.Kuantitas_Sayuran}kg
                    </Text>
                    <View className="flex-row items-center justify-between mt-2">
                      <Text
                        style={{ fontFamily: gayaHurufTebal }}
                        className="text-black"
                      >
                        {formatRupiah(sayuran.Harga_Sayuran)}
                      </Text>
                      <Text
                        style={{ fontFamily: gayaHurufSedang }}
                        className="text-gray-500"
                      >
                        Stok {sayuran.Stok_Sayuran}
                      </Text>
                    </View>
                    <TouchableOpacity activeOpacity={0.6} className="w-full">
                      <View className="mt-3 flex bg-[#447055] rounded-md p-2">
                        <Text
                          style={{ fontFamily: gayaHurufSedang }}
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
        </ScrollView>
      )}
    </View>
  );
}
