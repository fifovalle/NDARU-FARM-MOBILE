import React, { useState } from "react";
import { View, Text, ScrollView, Image, TouchableOpacity } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { router } from "expo-router";
import useGayaHuruf from "../../hooks/useGayaHuruf";

export default function DetailPerSayuranPopuler() {
  const ikonWortel = require("../../assets/images/ikonWortel.png");
  const [kuantitas, setKuantitas] = useState(1);
  const hargaPerKilo = 20000;
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

  const tambahKuantitas = () => {
    setKuantitas(kuantitas + 1);
  };

  const kurangiKuantitas = () => {
    if (kuantitas > 1) {
      setKuantitas(kuantitas - 1);
    }
  };
  return (
    <View className="flex-1 bg-[#E7E8E2]">
      <View className="flex-row items-center mb-4 mt-12">
        <TouchableOpacity
          className="w-10 h-10 rounded-full items-center justify-center"
          onPress={() => router.back()}
        >
          <FontAwesome name="arrow-left" size={24} color="green" />
        </TouchableOpacity>
        <View className="flex-row justify-between w-96 px-6">
          <Text
            style={{ fontFamily: gayaHurufBlack }}
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
            <Image source={ikonWortel} className="w-full h-full object-cover" />
          </View>
        </View>
        <View className="rounded-t-[30px] bg-white">
          <Text
            style={{ fontFamily: gayaHurufBold }}
            className="text-xl ml-2 p-4 mt-3 text-[#447055]"
          >
            Iphone 12 Pro Max
          </Text>
          <Text
            style={{ fontFamily: gayaHurufRegular }}
            className="text-md ml-6 text-black"
          >
            1kg (per bungkus)
          </Text>
          <View className="mx-auto w-[90%]">
            <Text
              style={{ fontFamily: gayaHurufRegular }}
              className="text-sm mt-4 text-gray-500 text-justify"
            >
              Wortel segar pilihan, kaya akan nutrisi dan vitamin A yang baik
              untuk kesehatan mata dan kulit. Wortel ini ditanam secara organik,
              bebas dari pestisida, dan dipanen langsung dari kebun setiap hari
              untuk memastikan kesegarannya. Dengan warna oranye yang cerah dan
              tekstur yang renyah, wortel ini sangat cocok untuk dikonsumsi
              langsung, dijadikan jus, atau digunakan sebagai bahan dalam
              berbagai hidangan seperti sup, salad, dan tumisan. Selain itu,
              wortel juga dikenal memiliki kandungan antioksidan tinggi yang
              baik untuk menjaga daya tahan tubuh.
            </Text>
          </View>
          <View className="flex-row items-center justify-between mx-7 mt-6 mb-4">
            <View className="flex-row items-center">
              <TouchableOpacity
                className="w-10 h-10 rounded-full items-center justify-center bg-gray-300"
                onPress={kurangiKuantitas}
              >
                <FontAwesome name="minus" size={20} color="black" />
              </TouchableOpacity>
              <Text
                style={{ fontFamily: gayaHurufBold }}
                className="text-lg mx-6"
              >
                {kuantitas}
              </Text>
              <TouchableOpacity
                className="w-10 h-10 rounded-full items-center justify-center bg-gray-300"
                onPress={tambahKuantitas}
              >
                <FontAwesome name="plus" size={20} color="black" />
              </TouchableOpacity>
            </View>
            <Text
              style={{ fontFamily: gayaHurufBold }}
              className="text-lg text-[#447055]"
            >
              Rp{(hargaPerKilo * kuantitas).toLocaleString("id-ID")}
            </Text>
          </View>
        </View>
      </ScrollView>
      <View className="w-full h-20 bg-white justify-evenly items-center flex-row">
        <TouchableOpacity
          onPress={() => router.push("/detail/detailPesan")}
          activeOpacity={0.5}
          className="w-[45px] h-12 border-2 border-[#447055] rounded-lg"
        >
          <View className="items-center my-auto">
            <FontAwesome name="envelope" size={24} color="#447055" />
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.5}
          onPress={() => router.push("/detail/detailKeranjang")}
          className="w-[45px] h-12 border-2 border-[#447055] rounded-lg"
        >
          <View className="items-center my-auto">
            <FontAwesome name="shopping-cart" size={24} color="#447055" />
          </View>
        </TouchableOpacity>
        <View className=" items-center">
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => router.push("../detail/checkout")}
            className="bg-[#447055] rounded-lg w-72 items-center justify-center p-3"
          >
            <Text
              style={{ fontFamily: gayaHurufBold }}
              className="text-lg text-[white]"
            >
              Beli Sekarang
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
