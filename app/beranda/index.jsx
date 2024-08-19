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
import useHalamanBeranda from "../../hooks/useHalamanBeranda";
import { formatRupiah } from "../../helpers/formatRupiah";
import TeksDiSorot from "../../helpers/teksDiSorot";

export default function Index() {
  const ikonKeranjang = require("../../assets/images/ikonKeranjang1.png");
  const ikonCari = require("../../assets/images/ikonCari.png");
  const {
    namaPengguna,
    sayuranTersaring,
    statusGambar,
    kueriPencarian,
    setKueriPencarian,
    handleImageLoad,
  } = useHalamanBeranda();

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

  const jamSekarang = new Date().getHours();
  const ucapan =
    jamSekarang < 12
      ? "Selamat Pagi"
      : jamSekarang < 15
      ? "Selamat Siang"
      : jamSekarang < 18
      ? "Selamat Sore"
      : "Selamat Malam";

  return (
    <ScrollView className="bg-[#E7E8E2] flex-1">
      <View className="bg-[#556F50] p-4 flex-row items-center justify-between h-56 rounded-b-[35px]">
        <View className="mt-11 flex-row justify-between items-center w-full">
          <Text className="text-white text-lg mx-2">
            <Text style={{ fontFamily: gayaHurufSedang }}>{ucapan}</Text>{" "}
            <Text style={{ fontFamily: gayaHurufTebal }}>
              {namaPengguna || "Nama Pelanggan"}
            </Text>
          </Text>
          <TouchableOpacity activeOpacity={0.6}>
            <View className="relative mr-5">
              <Image className="w-10 h-10" source={ikonKeranjang}></Image>
              <View className="absolute -top-2 -right-2 bg-red-600 rounded-full w-4 h-4 flex items-center justify-center">
                <Text
                  style={{ fontFamily: gayaHurufTebal }}
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
            style={{ fontFamily: gayaHurufReguler }}
            placeholder="Silahkan Cari..."
            className="ml-2 w-80 text-gray-700"
            value={kueriPencarian}
            onChangeText={setKueriPencarian}
          />
        </View>
      </View>

      <View className="p-4">
        <Text
          style={{ fontFamily: gayaHurufHitam }}
          className="text-[#556F50] text-xl mb-4"
        >
          Sayuran Populer
        </Text>

        {sayuranTersaring.length === 0 ? (
          <View className="flex items-center justify-center">
            <Text
              style={{ fontFamily: gayaHurufSedang }}
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
  );
}
