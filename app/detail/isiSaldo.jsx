import React, { useState, useRef } from "react";
import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  Animated,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { useRouter } from "expo-router";

// MODUL KAMI
import { gayaHuruf } from "../../constants/huruf";

export default function isiSaldo() {
  const pengarah = useRouter();
  const BCA = require("../../assets/images/ikonBCA.png");
  const BRI = require("../../assets/images/ikonBRI.png");
  const MANDIRI = require("../../assets/images/ikonMandiri.png");
  const BNI = require("../../assets/images/ikonBNI.png");

  const [dropdownTerlihat, setDropdownTerlihat] = useState(false);
  const [bankDipilih, setBankDipilih] = useState(null);
  const tinggiDropdown = useRef(new Animated.Value(0)).current;
  const nilaiRotasi = useRef(new Animated.Value(0)).current;

  const toggleDropdown = () => {
    if (dropdownTerlihat) {
      Animated.timing(tinggiDropdown, {
        toValue: 0,
        duration: 300,
        useNativeDriver: false,
      }).start();
      Animated.timing(nilaiRotasi, {
        toValue: 0,
        duration: 300,
        useNativeDriver: false,
      }).start();
    } else {
      Animated.timing(tinggiDropdown, {
        toValue: 230,
        duration: 300,
        useNativeDriver: false,
      }).start();
      Animated.timing(nilaiRotasi, {
        toValue: 1,
        duration: 300,
        useNativeDriver: false,
      }).start();
    }
    setDropdownTerlihat(!dropdownTerlihat);
  };

  const rotasiChevron = nilaiRotasi.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "90deg"],
  });

  const pilihBank = (bank) => {
    setBankDipilih(bank);
    setDropdownTerlihat(false);
  };

  const konfirmasiButtonStyle = bankDipilih
    ? { backgroundColor: "#447055" }
    : { backgroundColor: "#BDC2C8" };

  return (
    <>
      <ScrollView className="flex-1 bg-[#E7E8E2] p-4">
        <View className="flex-row items-center mt-14 mb-8 px-2">
          <TouchableOpacity onPress={() => pengarah.back("../")}>
            <View className="w-10 h-10 rounded-full flex justify-center items-center">
              <FontAwesome name="arrow-left" size={24} color="green" />
            </View>
          </TouchableOpacity>

          <Text
            style={{ fontFamily: gayaHuruf.lexend900 }}
            className="text-lg ml-2"
          >
            Isi Saldo
          </Text>
        </View>

        <View className="bg-white p-4 rounded-lg mb-4">
          <TouchableOpacity
            activeOpacity={0.6}
            className="flex-row items-center p-2 justify-between"
            onPress={toggleDropdown}
          >
            <View className="flex-row items-center">
              <FontAwesome name="bank" size={24} color="#447055" />
              <View>
                <Text
                  style={{ fontFamily: "Poppins_700Bold" }}
                  className="text-base ml-2"
                >
                  Transfer Bank
                </Text>
                {bankDipilih && (
                  <Text
                    style={{ fontFamily: "Poppins_500Medium" }}
                    className="text-base ml-2 mt-1"
                  >
                    {bankDipilih}
                  </Text>
                )}
              </View>
            </View>
            <Animated.View style={{ transform: [{ rotate: rotasiChevron }] }}>
              <FontAwesome name="chevron-right" size={16} color="#447055" />
            </Animated.View>
          </TouchableOpacity>

          <Animated.View style={{ height: tinggiDropdown, overflow: "hidden" }}>
            <View>
              <View className="border-b border-gray-200" />
              <TouchableOpacity
                activeOpacity={0.6}
                className="flex-row items-start my-4"
                onPress={() => pilihBank("BCA")}
              >
                <View className="flex-row items-center justify-between w-full px-8">
                  <View className="flex-row items-center">
                    <Image source={BCA} className="w-8 h-8 rounded-sm" />
                    <Text
                      style={{ fontFamily: "Poppins_500Medium" }}
                      className="ml-2"
                    >
                      Bank BCA
                    </Text>
                  </View>
                  {bankDipilih === "BCA" && (
                    <FontAwesome name="check" size={16} color="#447055" />
                  )}
                </View>
              </TouchableOpacity>
              <View className="border-b border-gray-200 ml-6" />
              <TouchableOpacity
                activeOpacity={0.6}
                className="flex-row items-start my-4"
                onPress={() => pilihBank("BRI")}
              >
                <View className="flex-row items-center justify-between w-full px-8">
                  <View className="flex-row items-center">
                    <Image source={BRI} className="w-8 h-8 rounded-sm" />
                    <Text
                      style={{ fontFamily: "Poppins_500Medium" }}
                      className="ml-2"
                    >
                      Bank BRI
                    </Text>
                  </View>
                  {bankDipilih === "BRI" && (
                    <FontAwesome name="check" size={16} color="#447055" />
                  )}
                </View>
              </TouchableOpacity>
              <View className="border-b border-gray-200 ml-6" />
              <TouchableOpacity
                activeOpacity={0.6}
                className="flex-row items-start my-4"
                onPress={() => pilihBank("Mandiri")}
              >
                <View className="flex-row items-center justify-between w-full px-8">
                  <View className="flex-row items-center">
                    <Image source={MANDIRI} className="w-8 h-8 rounded-sm" />
                    <Text
                      style={{ fontFamily: "Poppins_500Medium" }}
                      className="ml-2"
                    >
                      Bank Mandiri
                    </Text>
                  </View>
                  {bankDipilih === "Mandiri" && (
                    <FontAwesome name="check" size={16} color="#447055" />
                  )}
                </View>
              </TouchableOpacity>
              <View className="border-b border-gray-200 ml-6" />
              <TouchableOpacity
                activeOpacity={0.6}
                className="flex-row items-start my-4"
                onPress={() => pilihBank("BNI")}
              >
                <View className="flex-row items-center justify-between w-full px-8">
                  <View className="flex-row items-center">
                    <Image source={BNI} className="w-8 h-8 rounded-sm" />
                    <Text
                      style={{ fontFamily: "Poppins_500Medium" }}
                      className="ml-2"
                    >
                      Bank BNI
                    </Text>
                  </View>
                  {bankDipilih === "BNI" && (
                    <FontAwesome name="check" size={16} color="#447055" />
                  )}
                </View>
              </TouchableOpacity>
            </View>
          </Animated.View>
        </View>
      </ScrollView>
      <View className="h-20">
        <TouchableOpacity
          activeOpacity={0.6}
          onPress={() => pengarah.push("detail/pembayaranSaldo")}
          style={konfirmasiButtonStyle}
          className="w-96 h-14 m-auto items-center justify-center rounded-lg"
          disabled={!bankDipilih}
        >
          <Text
            style={{ fontFamily: "Poppins_700Bold" }}
            className="text-white text-lg"
          >
            Konfirmasi
          </Text>
        </TouchableOpacity>
      </View>
    </>
  );
}
