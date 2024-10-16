import React, { useState } from "react";
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

// MODUL KAMI
import formatRupiah from "../../utils/formatRupiah";
import { gayaHuruf } from "../../constants/huruf";
import useDetailSayuranPopuler from "../../hooks/useDetailSayuranPopuler";
import { tambahKuantitas, kurangiKuantitas } from "../../utils/sayuranPopuler";

export default function SayuranPopuler() {
  const { id } = useGlobalSearchParams();
  const pengarah = useRouter();
  const [kuantitasSayuranPopuler, setKuantitasSayuranPopuler] = useState(1);

  const { sayuranPopuler, statusStokPopuler, memuatSayuranPopuler } =
    useDetailSayuranPopuler(id);

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
            className="text-lg ml-4"
          >
            Detail Sayuran Populer
          </Text>
          <TouchableOpacity
            activeOpacity={0.5}
            className="w-8 items-center justify-center"
          >
            <FontAwesome name="shopping-bag" size={20} color="#447055" />
          </TouchableOpacity>
        </View>
      </View>

      {memuatSayuranPopuler ? (
        <View className="flex-1 justify-center items-center">
          <ActivityIndicator size="large" color="#447055" />
        </View>
      ) : (
        <ScrollView className="bg-[#E7E8E2] rounded-lg">
          <View className="bg-[#E7E8E2] mb-4 flex items-center justify-center">
            <View className="w-full h-80">
              <Image
                source={{ uri: sayuranPopuler.Gambar }}
                className="w-full h-full object-cover"
              />
            </View>
          </View>

          <View className="rounded-t-[30px] bg-white">
            <Text
              style={{ fontFamily: gayaHuruf.poppins700 }}
              className="text-xl ml-2 p-4 mt-3 text-[#447055]"
            >
              {sayuranPopuler.Nama}
            </Text>
            <Text
              style={{ fontFamily: gayaHuruf.lexend400 }}
              className="text-md ml-6 text-black"
            >
              {sayuranPopuler.Berat}kg
            </Text>
            <View className="mx-auto w-[90%]">
              <Text
                style={{ fontFamily: gayaHuruf.lexend400 }}
                className="text-sm mt-4 text-gray-500 text-justify"
              >
                {sayuranPopuler.Deskripsi}
              </Text>
              {statusStokPopuler ? (
                <Text
                  style={{ fontFamily: gayaHuruf.lexend700 }}
                  className="text-red-500 text-sm mt-5 text-center"
                >
                  {statusStokPopuler}
                </Text>
              ) : null}
            </View>

            <View className="flex-row items-center justify-between mx-7 mt-6 mb-4">
              <View className="flex-row items-center">
                <TouchableOpacity
                  className="w-10 h-10 rounded-full items-center justify-center bg-gray-300"
                  onPress={() =>
                    kurangiKuantitas(
                      kuantitasSayuranPopuler,
                      setKuantitasSayuranPopuler
                    )
                  }
                >
                  <FontAwesome name="minus" size={20} color="black" />
                </TouchableOpacity>
                <Text
                  style={{ fontFamily: gayaHuruf.poppins700 }}
                  className="text-lg mx-6"
                >
                  {kuantitasSayuranPopuler}
                </Text>
                <TouchableOpacity
                  className="w-10 h-10 rounded-full items-center justify-center bg-gray-300"
                  onPress={() =>
                    tambahKuantitas(
                      kuantitasSayuranPopuler,
                      setKuantitasSayuranPopuler
                    )
                  }
                >
                  <FontAwesome name="plus" size={20} color="black" />
                </TouchableOpacity>
              </View>
              <Text
                style={{ fontFamily: gayaHuruf.poppins700 }}
                className="text-lg text-[#447055]"
              >
                {formatRupiah(sayuranPopuler.Harga * kuantitasSayuranPopuler)}
              </Text>
            </View>
          </View>
        </ScrollView>
      )}

      <View className="w-full h-20 bg-white justify-evenly items-center flex-row">
        <TouchableOpacity
          onPress={() =>
            pengarah.push("/detail/pesan?id=" + "H0cNLa76AGNseYz8jMJUe6zlwKI3")
          }
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
