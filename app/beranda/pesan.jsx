import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  Image,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { useRouter } from "expo-router";
import useGayaHuruf from "../../hooks/useGayaHuruf";
import firestore from "@react-native-firebase/firestore";

export default function Pesan() {
  const router = useRouter();
  const ikonPencarian = require("../../assets/images/ikonCari.png");
  const ikonWortel = require("../../assets/images/ikonWortel.png");

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

  const [dataPengguna, setDataPengguna] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const snapshot = await firestore().collection("pengguna").get();
        const penggunaData = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setDataPengguna(penggunaData);
      } catch (error) {}
    };

    fetchData();
  }, []);

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
          placeholder="Cari pesan"
          className="ml-2 flex-1"
          placeholderTextColor="gray"
        />
      </View>

      <ScrollView className="px-4">
        {dataPengguna.map((pengguna) => (
          <TouchableOpacity
            key={pengguna.id}
            onPress={() => {
              router.push({
                pathname: "/detail/detailPesan",
                params: {
                  ID_Pengguna: pengguna.id,
                  Nama_Lengkap_Pengguna: pengguna.Nama_Lengkap_Pengguna,
                },
              });
            }}
            activeOpacity={0.6}
            className="flex-row items-center py-2 my-2"
          >
            <View className="w-20 h-20 bg-gray-500 rounded-full mr-3 overflow-hidden flex items-center justify-center">
              <Image source={ikonWortel} className="w-20 h-20 object-cover" />
            </View>
            <View className="flex-1">
              <Text
                style={{ fontFamily: gayaHurufBlack }}
                className="text-green-900 text-lg"
              >
                {pengguna.Nama_Lengkap_Pengguna}
              </Text>
              <Text
                style={{ fontFamily: gayaHurufBlack }}
                className="text-gray-600"
              >
                {pengguna.isiPesan}
              </Text>
            </View>
            <View className="bg-red-600 w-6 h-6 rounded-full justify-center items-center">
              <Text
                style={{ fontFamily: gayaHurufBold }}
                className="text-white text-xs"
              >
                {pengguna.jumlahPesan}
              </Text>
            </View>
          </TouchableOpacity>
        ))}
        <View className="border-b border-gray-300" />
      </ScrollView>
    </View>
  );
}
