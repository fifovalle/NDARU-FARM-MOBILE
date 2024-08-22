import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { useRouter, useGlobalSearchParams } from "expo-router";
import formatRupiah from "../../utils/formatRupiah";
import firestore from "@react-native-firebase/firestore";

// MODUL KAMI
import { gayaHuruf } from "../../constants/huruf";
import { tambahKuantitas, kurangiKuantitas } from "../../utils/sayuranPopuler";

export default function SayuranPopuler() {
  const { id } = useGlobalSearchParams();
  const [sayuran, setSayuran] = useState(null);
  const [loading, setLoading] = useState(true);
  const pengarah = useRouter();
  const ikonWortel = require("../../assets/images/ikonWortel.png");
  const [kuantitas, setKuantitas] = useState(1);

  useEffect(() => {
    const fetchSayuran = async () => {
      try {
        const doc = await firestore().collection("sayuran").doc(id).get();
        if (doc.exists) {
          setSayuran(doc.data());
        } else {
          console.log("Sayuran tidak ditemukan");
        }
      } catch (error) {
        console.error("Error fetching sayuran: ", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSayuran();
  }, [id]);

  if (loading) {
    return (
      <View className="flex-1 justify-center items-center">
        <ActivityIndicator size="large" color="#447055" />
      </View>
    );
  }

  return (
    <View className="flex-1 bg-[#E7E8E2]">
      <View className="flex-row items-center mb-4 mt-12">
        <TouchableOpacity
          className="w-10 h-10 rounded-full items-center justify-center"
          onPress={() => pengarah.back()}
        >
          <FontAwesome name="arrow-left" size={24} color="green" />
        </TouchableOpacity>
        <View className="flex-row justify-between w-96 px-6">
          <Text
            style={{ fontFamily: gayaHuruf.lexend900 }}
            className="text-lg ml-4 text-[#447055]"
          >
            Detail Sayuran
          </Text>
          <TouchableOpacity
            activeOpacity={0.5}
            className="w-8 items-center justify-center"
          >
            <FontAwesome name="shopping-bag" size={20} color="#447055" />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView className="bg-[#E7E8E2] rounded-lg">
        <View className="bg-[#E7E8E2] mb-4 flex items-center justify-center">
          <View className="w-full h-80">
            <Image
              source={{ uri: sayuran.Gambar_Sayuran }}
              className="w-full h-full object-cover"
            />
          </View>
        </View>

        <View className="rounded-t-[30px] bg-white">
          <Text
            style={{ fontFamily: gayaHuruf.poppins700 }}
            className="text-xl ml-2 p-4 mt-3 text-[#447055]"
          >
            {sayuran.Nama_Sayuran}
          </Text>
          <Text
            style={{ fontFamily: gayaHuruf.lexend400 }}
            className="text-md ml-6 text-black"
          >
            {sayuran.Sayuran_Per_Kilo}kg
          </Text>
          <View className="mx-auto w-[90%]">
            <Text
              style={{ fontFamily: gayaHuruf.lexend400 }}
              className="text-sm mt-4 text-gray-500 text-justify"
            >
              {sayuran.Deskripsi_Sayuran}
            </Text>
          </View>

          <View className="flex-row items-center justify-between mx-7 mt-6 mb-4">
            <View className="flex-row items-center">
              <TouchableOpacity
                className="w-10 h-10 rounded-full items-center justify-center bg-gray-300"
                onPress={() => kurangiKuantitas(kuantitas, setKuantitas)}
              >
                <FontAwesome name="minus" size={20} color="black" />
              </TouchableOpacity>
              <Text
                style={{ fontFamily: gayaHuruf.poppins700 }}
                className="text-lg mx-6"
              >
                {kuantitas}
              </Text>
              <TouchableOpacity
                className="w-10 h-10 rounded-full items-center justify-center bg-gray-300"
                onPress={() => tambahKuantitas(kuantitas, setKuantitas)}
              >
                <FontAwesome name="plus" size={20} color="black" />
              </TouchableOpacity>
            </View>
            <Text
              style={{ fontFamily: gayaHuruf.poppins700 }}
              className="text-lg text-[#447055]"
            >
              {formatRupiah(sayuran.Harga_Sayuran * kuantitas)}
            </Text>
          </View>
        </View>
      </ScrollView>

      <View className="w-full h-20 bg-white justify-evenly items-center flex-row">
        <TouchableOpacity
          onPress={() => pengarah.push("/detail/detailPesan")}
          activeOpacity={0.5}
          className="w-[45px] h-12 border-2 border-[#447055] rounded-lg"
        >
          <View className="items-center my-auto">
            <FontAwesome name="envelope" size={24} color="#447055" />
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.5}
          onPress={() => pengarah.push("/detail/detailKeranjang")}
          className="w-[45px] h-12 border-2 border-[#447055] rounded-lg"
        >
          <View className="items-center my-auto">
            <FontAwesome name="shopping-cart" size={24} color="#447055" />
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => pengarah.push("../detail/checkout")}
          className="bg-[#447055] rounded-lg w-72 items-center justify-center p-3"
        >
          <Text
            style={{ fontFamily: gayaHuruf.poppins700 }}
            className="text-lg text-white"
          >
            Beli Sekarang
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
