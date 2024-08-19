import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  Animated,
} from "react-native";
import React, { useState, useRef } from "react";
import { router } from "expo-router";
import useGayaHuruf from "../../hooks/useGayaHuruf";
import { FontAwesome } from "@expo/vector-icons";

export default function Transaksi() {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const ikonWortel = require("../../assets/images/ikonWortel.png");
  const ikonPencarian = require("../../assets/images/ikonCari.png");
  const [terpilihSemua, setTerpilihSemua] = useState(false);
  const [terpilihSatuan, setTerpilihSatuan] = useState(false);
  const [kuantitas, setKuantitas] = useState("1"); // Kuantitas sebagai string untuk mendukung input langsung
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

  const toggleTerpilih = () => {
    setTerpilihSemua(!terpilihSemua);
    setTerpilihSatuan(!terpilihSemua); // Sesuaikan dengan status terpilihSemua
    Animated.timing(fadeAnim, {
      toValue: terpilihSemua ? 0 : 1,
      duration: 100,
      useNativeDriver: true,
    }).start();
  };

  const toggleTerpilihSatuan = () => {
    setTerpilihSatuan(!terpilihSatuan);
  };

  const tambahKuantitas = () => {
    setKuantitas((prevKuantitas) => {
      const nilai = parseInt(prevKuantitas) + 1;
      return nilai.toString();
    });
  };

  const kurangiKuantitas = () => {
    setKuantitas((prevKuantitas) => {
      const nilai = parseInt(prevKuantitas);
      return nilai > 1 ? (nilai - 1).toString() : "1";
    });
  };

  const handleChangeKuantitas = (text) => {
    // Mengizinkan nilai kosong
    const nilai = parseInt(text);
    if (text === "" || (!isNaN(nilai) && nilai >= 1)) {
      setKuantitas(text);
    }
  };

  return (
    <View className="flex-1 bg-[#E7E8E2] px-4">
      <View className="flex-row items-center mt-14 mb-8">
        <TouchableOpacity onPress={() => router.back("../")}>
          <View className="w-10 h-10 rounded-full flex justify-center items-center">
            <FontAwesome name="arrow-left" size={24} color="green" />
          </View>
        </TouchableOpacity>
        <Text style={{ fontFamily: gayaHurufBlack }} className="text-lg ml-4">
          Keranjang
        </Text>
      </View>

      <View className="flex-row items-center bg-white rounded-full px-4 py-2 mb-4">
        <Image className="w-7 h-7" source={ikonPencarian} />
        <TextInput
          style={{ fontFamily: gayaHurufRegular }}
          placeholder="Cari sayuran..."
          className="ml-2 flex-1"
          placeholderTextColor="gray"
        />
      </View>

      <View className="bg-white p-4 rounded-xl shadow-xl">
        <View className="flex-row items-center justify-between mb-2">
          <View className="flex-row items-center">
            <TouchableOpacity
              activeOpacity={0.3}
              className="w-9 h-9 justify-center items-center ml-1"
              onPress={toggleTerpilih}
            >
              <FontAwesome
                name="check-square"
                size={24}
                color={terpilihSemua ? "green" : "gray"}
              />
            </TouchableOpacity>
            <View className="ml-2">
              <Text
                style={{ fontFamily: gayaHurufMedium }}
                className="text-md text-gray-600"
              >
                {terpilihSemua ? "1 Produk terpilih" : "0 Produk terpilih"}
              </Text>
            </View>
          </View>
          <Animated.View
            style={{
              opacity: fadeAnim,
              pointerEvents: terpilihSemua ? "auto" : "none",
            }}
          >
            <TouchableOpacity activeOpacity={0.5}>
              <View className="flex-row items-center justify-center border border-red-600 p-1 mr-3 rounded-lg">
                <FontAwesome name="trash-o" size={24} color="#d00c0c" />
                <Text
                  style={{ fontFamily: gayaHurufBold }}
                  className="text-sm text-center w-16 text-[#d00c0c]"
                >
                  Hapus
                </Text>
              </View>
            </TouchableOpacity>
          </Animated.View>
        </View>
        <View className="border-b border-gray-300 mb-6 " />
        <View className="flex-row items-center justify-between">
          <View className="flex-row items-center">
            <TouchableOpacity onPress={toggleTerpilihSatuan}>
              <View className="w-9 h-9 ml-2">
                <FontAwesome
                  name="check-square"
                  size={24}
                  color={terpilihSatuan ? "green" : "gray"}
                />
              </View>
            </TouchableOpacity>
            <View className="w-16 h-16 bg-gray-200 rounded-lg mr-4 flex items-center">
              <Image className="w-14 h-14" source={ikonWortel} />
            </View>
            <View>
              <Text style={{ fontFamily: gayaHurufBold }} className="text-lg">
                Wortel
              </Text>
              <Text
                style={{ fontFamily: gayaHurufRegular }}
                className="text-sm text-gray-600"
              >
                RP 50.000
              </Text>
            </View>
          </View>
          <View className="items-end mr-2 flex-row w-28 h-8 border-2 rounded-full border-gray-300 justify-center">
            <TouchableOpacity
              activeOpacity={0.3}
              className="my-auto"
              onPress={
                kuantitas === "" ? () => setKuantitas("1") : kurangiKuantitas
              }
            >
              <FontAwesome
                className="mr-3"
                name={kuantitas === "1" ? "trash-o" : "minus"}
                size={16}
                color="gray"
              />
            </TouchableOpacity>
            <TextInput
              value={kuantitas}
              keyboardType="numeric"
              className="my-auto w-1/4 text-center"
              editable={true}
              onChangeText={handleChangeKuantitas}
            />
            <TouchableOpacity
              activeOpacity={0.3}
              className="my-auto"
              onPress={tambahKuantitas}
            >
              <FontAwesome
                className="ml-3"
                name="plus"
                size={16}
                color="gray"
              />
            </TouchableOpacity>
          </View>
        </View>
        <View className="flex-row items-center justify-between mt-3">
          <View className="flex-row items-center">
            <TouchableOpacity onPress={toggleTerpilihSatuan}>
              <View className="w-9 h-9 ml-2">
                <FontAwesome
                  name="check-square"
                  size={24}
                  color={terpilihSatuan ? "green" : "gray"}
                />
              </View>
            </TouchableOpacity>
            <View className="w-16 h-16 bg-gray-200 rounded-lg mr-4 flex items-center">
              <Image className="w-14 h-14" source={ikonWortel} />
            </View>
            <View>
              <Text style={{ fontFamily: gayaHurufBold }} className="text-lg">
                Fuckcoy
              </Text>
              <Text
                style={{ fontFamily: gayaHurufRegular }}
                className="text-sm text-gray-600"
              >
                RP 50.000
              </Text>
            </View>
          </View>
          <View className="items-end mr-2 flex-row w-28 h-8 border-2 rounded-full border-gray-300 justify-center">
            <TouchableOpacity
              activeOpacity={0.3}
              className="my-auto"
              onPress={
                kuantitas === "" ? () => setKuantitas("1") : kurangiKuantitas
              }
            >
              <FontAwesome
                className="mr-3"
                name={kuantitas === "1" ? "trash-o" : "minus"}
                size={16}
                color="gray"
              />
            </TouchableOpacity>
            <TextInput
              value={kuantitas}
              keyboardType="numeric"
              className="my-auto w-1/4 text-center"
              editable={true}
              onChangeText={handleChangeKuantitas}
            />
            <TouchableOpacity
              activeOpacity={0.3}
              className="my-auto"
              onPress={tambahKuantitas}
            >
              <FontAwesome
                className="ml-3"
                name="plus"
                size={16}
                color="gray"
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
}
