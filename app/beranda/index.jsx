import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TextInput,
  Image,
  TouchableOpacity,
} from "react-native";
import useGayaHuruf from "../../hooks/useGayaHuruf";
import firestore from "@react-native-firebase/firestore";
import auth from "@react-native-firebase/auth";

export default function Index() {
  const [namaPengguna, setNamaPengguna] = useState("");

  const ikonKeranjang = require("../../assets/images/ikonKeranjang1.png");
  const ikonCari = require("../../assets/images/ikonCari.png");
  const ikonWortel = require("../../assets/images/ikonWortel.png");
  const gayaHurufRegular = useGayaHuruf({
    android: "Lexend_400Regular",
    ios: "Lexend_400Regular",
  });

  const gayaHurufBlack = useGayaHuruf({
    android: "Lexend_900Black",
    ios: "Lexend_900Black",
  });

  const gayaHurufMedium = useGayaHuruf({
    android: "Poppins_500Medium",
    ios: "Poppins_500Medium",
  });

  const gayaHurufBold = useGayaHuruf({
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
    const fetchUserData = async () => {
      const userId = auth().currentUser.uid;
      try {
        const userDoc = await firestore()
          .collection("pengguna")
          .doc(userId)
          .get();
        if (userDoc.exists) {
          setNamaPengguna(userDoc.data().Nama_Lengkap_Pengguna || "");
        }
      } catch (error) {
        console.error("Error fetching user data: ", error);
      }
    };

    fetchUserData();
  }, []);

  return (
    <ScrollView className="bg-[#E7E8E2] flex-1">
      <View className="bg-[#556F50] p-4 flex-row items-center justify-between h-56 rounded-b-[35px]">
        <View className="mt-11 flex-row justify-between items-center w-full">
          <Text
            style={{ fontFamily: gayaHurufBold }}
            className="text-white text-lg"
          >
            {ucapan} {namaPengguna || "Nama Pelanggan"}
          </Text>
          <TouchableOpacity activeOpacity={0.6}>
            <View className="relative mr-5">
              <Image className="w-10 h-10" source={ikonKeranjang}></Image>
              <View className="absolute -top-2 -right-2 bg-red-600 rounded-full w-4 h-4 flex items-center justify-center">
                <Text
                  style={{ fontFamily: gayaHurufBold }}
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
            style={{ fontFamily: gayaHurufRegular }}
            placeholder="Silahkan Cari..."
            className="ml-2 w-80 text-gray-700"
          />
        </View>
      </View>

      <View className="p-4">
        <Text
          style={{ fontFamily: gayaHurufBlack }}
          className="text-[#556F50] text-xl mb-4"
        >
          Sayuran Populer
        </Text>
        <View className="flex-row justify-between flex-wrap">
          {Array(4)
            .fill(null)
            .map((_, index) => (
              <View
                key={index}
                className="bg-white rounded-xl p-4 mb-4 w-[48%]"
              >
                <TouchableOpacity activeOpacity={0.5}>
                  <Image
                    source={ikonWortel}
                    className="w-full h-32 object-cover"
                  />
                </TouchableOpacity>

                <Text
                  style={{ fontFamily: gayaHurufBold }}
                  className="text-[#556F50] text-lg font-semibold mt-2"
                >
                  Wortel
                </Text>
                <Text
                  style={{ fontFamily: gayaHurufRegular }}
                  className="text-gray-500"
                >
                  1kg
                </Text>
                <View className="flex-row items-center justify-between mt-2">
                  <Text
                    style={{ fontFamily: gayaHurufBold }}
                    className="text-black"
                  >
                    Rp10.000
                  </Text>
                  <Text
                    style={{ fontFamily: gayaHurufMedium }}
                    className="text-gray-500"
                  >
                    Stok 10
                  </Text>
                </View>
                <TouchableOpacity activeOpacity={0.6} className="w-full">
                  <View className="mt-3 flex bg-[#447055] rounded-md p-2">
                    <Text
                      style={{ fontFamily: gayaHurufMedium }}
                      className="text-[#ffffff] text-center"
                    >
                      + Keranjang
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>
            ))}
        </View>
      </View>
    </ScrollView>
  );
}
