import React from "react";
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
import { formatRupiah } from "../../helpers/formatRupiah";
import TeksDiSorot from "../../helpers/teksDiSorot";
import { FontAwesome } from "@expo/vector-icons";
import { router } from "expo-router";

export default function Index() {
  const ikonCari = require("../../assets/images/ikonCari.png");
  const {
    namaPengguna,
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
              <Text
                style={{ fontFamily: gayaHurufReguler }}
                className="text-grey-500 text-sm mt-10"
              >
                Sayuran yang anda cari tidak ditemukan!
              </Text>
            </View>
          ) : (
            <View className="flex-row justify-between flex-wrap">
              {sayuranTersaring.map((item, index) => (
                <View
                  key={index}
                  className="bg-white rounded-xl p-4 mb-4 w-[48%]"
                >
                  <TouchableOpacity activeOpacity={0.5}>
                    {!statusGambar[item.id] && (
                      <View className="w-full h-32 flex items-center justify-center">
                        <ActivityIndicator size="large" color="#556F50" />
                      </View>
                    )}
                    <Image
                      source={{ uri: item.Foto }}
                      className={`w-full h-32 object-cover rounded-xl ${
                        statusGambar[item.id] ? "block" : "hidden"
                      }`}
                      onLoad={() => handleImageLoad(item.id)}
                    />
                  </TouchableOpacity>

                  <Text
                    className="text-[#556F50] text-lg font-semibold mt-2"
                    style={{ fontFamily: gayaHurufTebal }}
                  >
                    {TeksDiSorot(
                      item.Nama_Sayuran,
                      kueriPencarian,
                      gayaHurufTebal,
                      gayaHurufReguler
                    )}
                  </Text>
                  <Text
                    style={{ fontFamily: gayaHurufReguler }}
                    className="text-gray-500"
                  >
                    {item.Kuantitas}kg
                  </Text>
                  <View className="flex-row items-center justify-between mt-2">
                    <Text
                      style={{ fontFamily: gayaHurufTebal }}
                      className="text-black"
                    >
                      {formatRupiah(item.Harga)}
                    </Text>
                    <Text
                      style={{ fontFamily: gayaHurufSedang }}
                      className="text-gray-500"
                    >
                      Stok {item.Stok}
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
    </View>
  );
}
