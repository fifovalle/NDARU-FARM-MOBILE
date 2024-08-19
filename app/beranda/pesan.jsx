import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Image,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { useRouter } from "expo-router";
import useGayaHuruf from "../../hooks/useGayaHuruf";
import useHalamanPesan from "../../hooks/useHalamanPesan";
import auth from "@react-native-firebase/auth";
import TeksDiSorot from "../../helpers/teksDiSorot";

export default function Pesan() {
  const jalur = useRouter();
  const penggunaSekarang = auth().currentUser?.uid;
  const { dataPengguna, jumlahPesanBelumTerbaca } = useHalamanPesan();
  const ikonPencarian = require("../../assets/images/ikonCari.png");
  const ikonWortel = require("../../assets/images/ikonWortel.png");

  const [searchText, setSearchText] = useState(""); // State untuk teks pencarian

  const gayaHurufRegular = useGayaHuruf({
    android: "Lexend_400Regular",
    ios: "Lexend_400Regular",
  });

  const gayaHurufBlack = useGayaHuruf({
    android: "Lexend_900Black",
    ios: "Lexend_900Black",
  });

  const gayaHurufBold = useGayaHuruf({
    android: "Poppins_700Bold",
    ios: "Poppins_700Bold",
  });

  const gayaHurufSedang = useGayaHuruf({
    android: "Poppins_500Medium",
    ios: "Poppins_500Medium",
  });

  const filteredData = dataPengguna.filter((pengguna) =>
    pengguna.Nama_Lengkap_Pengguna.toLowerCase().includes(
      searchText.toLowerCase()
    )
  );

  return (
    <View className="flex-1 bg-[#E7E8E2] px-3">
      <View className="flex-row items-center p-4 mt-12 mb-3">
        <Text style={{ fontFamily: gayaHurufBlack }} className="text-lg ml-2">
          Pesan
        </Text>
      </View>

      <View className="flex-row items-center bg-white rounded-full px-4 py-2 mb-2">
        <Image className="w-7 h-7" source={ikonPencarian} />
        <TextInput
          style={{ fontFamily: gayaHurufRegular }}
          placeholder="Cari Kontak..."
          className="ml-2 flex-1"
          placeholderTextColor="gray"
          value={searchText}
          onChangeText={setSearchText}
        />
      </View>

      <ScrollView className="px-4">
        {filteredData.length > 0 ? (
          filteredData
            .filter((pengguna) => pengguna.id !== penggunaSekarang)
            .map((pengguna) => {
              const isMatch =
                pengguna.Nama_Lengkap_Pengguna.toLowerCase().includes(
                  searchText.toLowerCase()
                );

              return (
                <TouchableOpacity
                  key={pengguna.id}
                  onPress={() => {
                    jalur.push({
                      pathname: "/detail/detailPesan",
                      params: {
                        Target_Pengguna: pengguna.id,
                        Pengirim: penggunaSekarang,
                        Nama_Lengkap_Pengguna: pengguna.Nama_Lengkap_Pengguna,
                      },
                    });
                  }}
                  activeOpacity={0.6}
                  className="flex-row items-center py-2 my-2"
                >
                  <View className="w-20 h-20 bg-gray-500 rounded-full mr-3 overflow-hidden flex items-center justify-center">
                    <Image
                      source={ikonWortel}
                      className="w-20 h-20 object-cover"
                    />
                  </View>
                  <View className="flex-1">
                    <Text
                      style={{
                        fontFamily: isMatch ? gayaHurufBold : gayaHurufBlack,
                        color: isMatch ? "black" : "yellow",
                      }}
                      className="text-lg"
                    >
                      {TeksDiSorot(
                        pengguna.Nama_Lengkap_Pengguna,
                        searchText,
                        gayaHurufBold,
                        gayaHurufRegular
                      )}
                    </Text>
                  </View>
                  <View className="bg-red-600 w-6 h-6 rounded-full justify-center items-center">
                    <Text
                      style={{ fontFamily: gayaHurufBold }}
                      className="text-white text-xs"
                    >
                      {jumlahPesanBelumTerbaca[pengguna.id] || 0}
                    </Text>
                  </View>
                </TouchableOpacity>
              );
            })
        ) : (
          <View className="flex items-center justify-center py-10">
            <Text
              style={{ fontFamily: gayaHurufSedang }}
              className="text-grey-500 text-sm mt-10"
            >
              Nama tidak ditemukan
            </Text>
          </View>
        )}
        <View className="border-b border-gray-300" />
      </ScrollView>
    </View>
  );
}
