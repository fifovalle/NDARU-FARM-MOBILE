import React, { useEffect, useState } from "react";
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
import { formatRupiah } from "../../utils/formatRupiah";
import TeksDiSorot from "../../utils/teksDiSorot";
import { FontAwesome } from "@expo/vector-icons";
import { router } from "expo-router";

export default function Index() {
  const dataTIdakAda = require("../../assets/images/dataTidakAda.png");
  const ikonKeranjang = require("../../assets/images/ikonKeranjang1.png");
  const ikonCari = require("../../assets/images/ikonCari.png");
  const [loading, setLoading] = useState(true);
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

  useEffect(() => {
    const fetchData = async () => {
      try {
        await new Promise((resolve) => setTimeout(resolve, 2000));
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <View className="flex-1 items-center justify-center bg-[#E7E8E2]">
        <ActivityIndicator size="large" color="#556F50" />
        <Text
          style={{ fontFamily: gayaHurufSedang }}
          className="mt-4 text-gray-500"
        >
          Memuat...
        </Text>
      </View>
    );
  }
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
          <TouchableOpacity
            activeOpacity={0.6}
            onPress={() => router.push("../../detail/checkout")}
          >
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
        <View className="p-4 flex-row justify-between items-center">
          <Text
            style={{ fontFamily: gayaHurufHitam }}
            className="text-[#556F50] text-xl"
          >
            Sayuran Populer
          </Text>
          <TouchableOpacity
            activeOpacity={0.6}
            onPress={() => router.push("../detail/detailSayuranPopuler")}
          >
            <View className="flex-row items-center">
              <Text
                style={{ fontFamily: gayaHurufSedang }}
                className="text-[#447055] text-sm mr-[4px] underline"
              >
                Lihat Semua
              </Text>
              <FontAwesome name="caret-right" size={20} color="#447055" />
            </View>
          </TouchableOpacity>
        </View>

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
            {sayuranTersaring.map((sayuran, index) => (
              <View
                key={index}
                className="bg-white rounded-xl p-4 mb-4 w-[48%]"
              >
                <TouchableOpacity
                  activeOpacity={0.5}
                  onPress={() =>
                    router.push(
                      `../detail/detailPerSayuranPopuler?id=${sayuran.id}`
                    )
                  }
                >
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
  );
}
