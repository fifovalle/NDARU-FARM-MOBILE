import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  Image,
  ScrollView,
  TouchableOpacity,
  ImageBackground,
} from "react-native";
import { useRouter, useGlobalSearchParams } from "expo-router";
import { FontAwesome } from "@expo/vector-icons";
import firestore from "@react-native-firebase/firestore";
import useGayaHuruf from "../../hooks/useGayaHuruf";

export default function DetailPesan() {
  const router = useRouter();
  const { ID_Pengguna, Nama_Lengkap_Pengguna } = useGlobalSearchParams();
  const [pesan, setPesan] = useState("");
  const [pesanTerkirim, setPesanTerkirim] = useState([]);
  const ikonWortel = require("../../assets/images/ikonWortel.png");
  const layarPesan = require("../../assets/images/gambarPesan.png");

  const gayaHurufBlack = useGayaHuruf({
    android: "Lexend_900Black",
    ios: "Lexend_900Black",
  });

  const gayaHurufMedium = useGayaHuruf({
    android: "Poppins_500Medium",
    ios: "Poppins_500Medium",
  });

  useEffect(() => {
    const unsubscribe = firestore()
      .collection("pesan")
      .orderBy("Waktu_Pengiriman", "asc")
      .onSnapshot((snapshot) => {
        const pesanData = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setPesanTerkirim(pesanData);
      });

    return () => unsubscribe();
  }, []);

  const kirimPesan = async () => {
    if (pesan.trim()) {
      try {
        await firestore().collection("pesan").add({
          ID_Pengirim: ID_Pengguna,
          ISI_Pesan: pesan,
          Waktu_Pengiriman: firestore.FieldValue.serverTimestamp(),
        });
        setPesan("");
      } catch (error) {
        console.error("Gagal mengirim pesan:", error);
      }
    }
  };

  const renderPesan = (item) => {
    const isPengguna = item.ID_Pengirim === ID_Pengguna;
    return (
      <View
        key={item.id}
        className={`flex-row ${
          isPengguna ? "justify-end" : "justify-start"
        } mb-2`}
      >
        {!isPengguna && (
          <View className="w-12 h-12 bg-white rounded-full mr-2 overflow-hidden flex items-center justify-center">
            <Image source={ikonWortel} className="w-12 h-12 object-cover" />
          </View>
        )}
        <TouchableOpacity
          activeOpacity={0.7}
          className={`${
            isPengguna ? "bg-[#447055]" : "bg-gray-300"
          } rounded-lg p-3 max-w-[60%]`}
        >
          <Text
            style={{ fontFamily: gayaHurufMedium }}
            className={`${isPengguna ? "text-white" : "text-gray-700"}`}
          >
            {item.ISI_Pesan}
          </Text>
          <View className="items-end">
            <Text
              style={{ fontFamily: gayaHurufMedium }}
              className={`${
                isPengguna ? "text-white" : "text-gray"
              } text-xs ml-2`}
            >
              {item.Waktu_Pengiriman
                ? new Date(
                    item.Waktu_Pengiriman.seconds * 1000
                  ).toLocaleTimeString()
                : "Mengirim..."}
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View className="flex-1 bg-[#E7E8E2] px-2">
      {/* Header */}
      <View className="flex-row items-center p-4 border-b border-gray-300 mt-12">
        <TouchableOpacity
          onPress={() => router.back("../beranda/pesan")}
          className="mr-4"
        >
          <FontAwesome name="arrow-left" size={24} color="green" />
        </TouchableOpacity>
        <View className="flex-1 flex-row items-center">
          <View className="w-14 h-14 bg-white rounded-full mr-3 overflow-hidden flex items-center justify-center">
            <Image source={ikonWortel} className="w-14 h-14 object-cover" />
          </View>
          <View>
            <Text
              style={{ fontFamily: gayaHurufBlack }}
              className="text-green-900"
            >
              {Nama_Lengkap_Pengguna}
            </Text>
            <Text style={{ fontFamily: gayaHurufMedium }} className="text-sm">
              online
            </Text>
          </View>
        </View>
        <TouchableOpacity activeOpacity={0.4}>
          <FontAwesome name="search" size={20} color="green" />
        </TouchableOpacity>
      </View>

      <ImageBackground className="w-screen flex-1" source={layarPesan}>
        <ScrollView className="px-4 py-2">
          <View className="flex items-center">
            <Text
              style={{ fontFamily: gayaHurufMedium }}
              className="text-center mb-2 mt-2 text-white bg-black w-20 rounded-lg"
            >
              Hari ini
            </Text>
          </View>

          {pesanTerkirim.map((item) => renderPesan(item))}
        </ScrollView>
      </ImageBackground>

      <View className="flex-row items-center p-4 border-t border-gray-300 w-full mb-2">
        <View className="flex-row w-full h-[70px] bg-white rounded-full overflow-hidden flex items-center justify-center">
          <TouchableOpacity activeOpacity={0.4} className="mr-2">
            <FontAwesome name="plus-circle" size={26} color="black" />
          </TouchableOpacity>
          <View className="flex-row items-center ml-3 bg-[#E7E8E2] rounded-full w-72">
            <TextInput
              style={{ fontFamily: gayaHurufMedium }}
              placeholder="Tulis pesan ..."
              className="flex-1 p-3 text-gray-700"
              value={pesan}
              onChangeText={setPesan}
            />
            <TouchableOpacity
              activeOpacity={0.4}
              className="p-2 mr-4"
              onPress={kirimPesan}
            >
              <FontAwesome name="send" size={22} color="black" />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
}
