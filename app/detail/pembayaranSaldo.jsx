import React, { useState, useRef } from "react";
import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  Animated,
  Clipboard, // Import Clipboard
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { gayaHuruf } from "../../constants/huruf";
import Toast from "react-native-toast-message";

export default function PembayaranSaldo() {
  const pengarah = useRouter();
  const BCA = require("../../assets/images/ikonBCA.png");
  const BRI = require("../../assets/images/ikonBRI.png");
  const MANDIRI = require("../../assets/images/ikonMandiri.png");
  const BNI = require("../../assets/images/ikonBNI.png");

  const teksUntukDisalin = "1234 5678 9101 1213";

  const [dropdownTerlihat, setDropdownTerlihat] = useState({
    mBanking: false,
    ATM: false,
  });

  const tinggiDropdownmBanking = useRef(new Animated.Value(0)).current;
  const tinggiDropdownATM = useRef(new Animated.Value(0)).current;

  const rotasiChevronmBanking = useRef(new Animated.Value(0)).current;
  const rotasiChevronATM = useRef(new Animated.Value(0)).current;

  const toggleDropdown = (type) => {
    if (type === "mBanking") {
      if (dropdownTerlihat.mBanking) {
        Animated.timing(tinggiDropdownmBanking, {
          toValue: 0,
          duration: 300,
          useNativeDriver: false,
        }).start();
        Animated.timing(rotasiChevronmBanking, {
          toValue: 0,
          duration: 300,
          useNativeDriver: false,
        }).start();
      } else {
        Animated.timing(tinggiDropdownmBanking, {
          toValue: 100,
          duration: 300,
          useNativeDriver: false,
        }).start();
        Animated.timing(rotasiChevronmBanking, {
          toValue: 1,
          duration: 300,
          useNativeDriver: false,
        }).start();
      }
      setDropdownTerlihat((prev) => ({
        ...prev,
        mBanking: !prev.mBanking,
      }));
    } else if (type === "ATM") {
      if (dropdownTerlihat.ATM) {
        Animated.timing(tinggiDropdownATM, {
          toValue: 0,
          duration: 300,
          useNativeDriver: false,
        }).start();
        Animated.timing(rotasiChevronATM, {
          toValue: 0,
          duration: 300,
          useNativeDriver: false,
        }).start();
      } else {
        Animated.timing(tinggiDropdownATM, {
          toValue: 100,
          duration: 300,
          useNativeDriver: false,
        }).start();
        Animated.timing(rotasiChevronATM, {
          toValue: 1,
          duration: 300,
          useNativeDriver: false,
        }).start();
      }
      setDropdownTerlihat((prev) => ({
        ...prev,
        ATM: !prev.ATM,
      }));
    }
  };

  const rotasiChevronmBankingInterpolate = rotasiChevronmBanking.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "90deg"],
  });

  const rotasiChevronATMInterpolate = rotasiChevronATM.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "90deg"],
  });

  const salinTeks = () => {
    Clipboard.setString(teksUntukDisalin);
    Toast.show({
      type: "success",
      text1: "Teks disalin!",
      text2: "Teks telah disalin ke clipboard.",
    });
  };

  return (
    <ScrollView className="flex-1 bg-[#E7E8E2] p-4">
      <Toast ref={(ref) => Toast.setRef(ref)} />
      <View className="flex-row items-center mt-14 mb-8 px-2 -z-20">
        <TouchableOpacity onPress={() => pengarah.back("../")}>
          <View className="w-10 h-10 rounded-full flex justify-center items-center">
            <FontAwesome name="arrow-left" size={24} color="green" />
          </View>
        </TouchableOpacity>

        <Text
          style={{ fontFamily: gayaHuruf.lexend900 }}
          className="text-lg ml-2"
        >
          Pembayaran
        </Text>
      </View>
      <View className="flex-row justify-between bg-white px-4 py-3 mb-4 rounded-lg">
        <Text
          style={{ fontFamily: gayaHuruf.poppins700 }}
          className="text-md text-[#447055]"
        >
          Biaya Admin
        </Text>
        <Text
          style={{ fontFamily: gayaHuruf.poppins700 }}
          className="text-base text-black"
        >
          Rp 5.000
        </Text>
      </View>

      <View className="bg-white p-4 rounded-lg">
        <View className="flex-row items-center">
          <Image source={BCA} className="w-8 h-8 rounded-sm" />
          <Text style={{ fontFamily: "Poppins_500Medium" }} className="ml-2">
            Bank BCA
          </Text>
        </View>
        <View className="ml-8">
          <View className="border-b border-gray-200 w-screen my-3" />
          <Text style={{ fontFamily: "Poppins_500Medium" }}>
            No. Rekening :
          </Text>
          <View className="flex-row justify-between">
            <Text
              className="text-lg text-[#447055]"
              style={{ fontFamily: "Poppins_700Bold" }}
            >
              {teksUntukDisalin}
            </Text>
            <TouchableOpacity
              className="w-14 h-6 rounded-lg flex items-center justify-center"
              activeOpacity={0.3}
              onPress={salinTeks}
            >
              <Text
                className="text-[#447055]"
                style={{ fontFamily: "Poppins_700Bold" }}
              >
                SALIN
              </Text>
            </TouchableOpacity>
          </View>
          <View className="border-b border-gray-200 w-screen my-3" />
          <Text
            className="text-sm text-[#447055] mb-4"
            style={{ fontFamily: "Poppins_500Medium" }}
          >
            Proses verfikasi kurang dari 10 menit setelah pembayaran berhasil
          </Text>
          <Text
            className="text-sm mb-4"
            style={{ fontFamily: "Poppins_500Medium" }}
          >
            Bayar pesanan ke Virtual Account di atas sebelum membuat pesanan
            kembali dengan Virtual Account agar nomor tetap sama.
          </Text>
          <Text className="text-sm" style={{ fontFamily: "Poppins_500Medium" }}>
            Hanya menerima dari Bank BRI
          </Text>
        </View>
      </View>

      <View className="flex-1 bg-[#E7E8E2]">
        <View className="bg-white p-4 mt-6 rounded-lg">
          <TouchableOpacity
            activeOpacity={0.6}
            onPress={() => toggleDropdown("mBanking")}
          >
            <View className="flex-row justify-between items-center">
              <Text
                className="text-md text-[#447055]"
                style={{ fontFamily: "Poppins_500Medium" }}
              >
                Panduan Transfer mBanking
              </Text>
              <Animated.View
                style={{
                  transform: [{ rotate: rotasiChevronmBankingInterpolate }],
                }}
              >
                <FontAwesome name="chevron-right" size={16} color="#447055" />
              </Animated.View>
            </View>
          </TouchableOpacity>
          <Animated.View
            style={{ height: tinggiDropdownmBanking, overflow: "hidden" }}
          >
            <View className="border-b border-gray-200 w-screen my-3" />
            <View className="flex-row items-center mb-3">
              <View className="bg-gray-500 rounded-full w-4 h-4 justify-center items-center flex">
                <Text
                  style={{ fontFamily: "Poppins_700Bold" }}
                  className="text-white text-xs"
                >
                  1
                </Text>
              </View>
              <Text
                style={{ fontFamily: "Poppins_500Medium" }}
                className="ml-2 text-sm"
              >
                Pilih{" "}
                <Text style={{ fontFamily: "Poppins_700Bold" }}>Transfer</Text>{" "}
                pada aplikasi mBanking.
              </Text>
            </View>
            <View className="flex-row items-center mb-3">
              <View className="bg-gray-500 rounded-full w-4 h-4 justify-center items-center flex">
                <Text
                  style={{ fontFamily: "Poppins_700Bold" }}
                  className="text-white text-xs"
                >
                  2
                </Text>
              </View>
              <Text
                style={{ fontFamily: "Poppins_500Medium" }}
                className="ml-2 text-sm"
              >
                Masukkan{" "}
                <Text style={{ fontFamily: "Poppins_700Bold" }}>
                  Virtual Account
                </Text>{" "}
                yang dituju.
              </Text>
            </View>
            <View className="flex-row items-center mb-3">
              <View className="bg-gray-500 rounded-full w-4 h-4 justify-center items-center flex">
                <Text
                  style={{ fontFamily: "Poppins_700Bold" }}
                  className="text-white text-xs"
                >
                  3
                </Text>
              </View>
              <Text
                style={{ fontFamily: "Poppins_500Medium" }}
                className="ml-2 text-sm"
              >
                Pilih{" "}
                <Text style={{ fontFamily: "Poppins_700Bold" }}>Rekening</Text>{" "}
                untuk melakukan pembayaran.
              </Text>
            </View>
            <View className="flex-row items-center mb-3">
              <View className="bg-gray-500 rounded-full w-4 h-4 justify-center items-center flex">
                <Text
                  style={{ fontFamily: "Poppins_700Bold" }}
                  className="text-white text-xs"
                >
                  4
                </Text>
              </View>
              <Text
                style={{ fontFamily: "Poppins_500Medium" }}
                className="ml-2 text-sm"
              >
                Selesaikan transaksi untuk{" "}
                <Text style={{ fontFamily: "Poppins_700Bold" }}>
                  Pembayaran
                </Text>{" "}
                Anda.
              </Text>
            </View>
          </Animated.View>
        </View>

        <View className="bg-white p-4 rounded-lg mt-2">
          <TouchableOpacity
            activeOpacity={0.6}
            onPress={() => toggleDropdown("ATM")}
          >
            <View className="flex-row justify-between items-center">
              <Text
                className="text-md text-[#447055]"
                style={{ fontFamily: "Poppins_500Medium" }}
              >
                Panduan Transfer ATM
              </Text>
              <Animated.View
                style={{
                  transform: [{ rotate: rotasiChevronATMInterpolate }],
                }}
              >
                <FontAwesome name="chevron-right" size={16} color="#447055" />
              </Animated.View>
            </View>
          </TouchableOpacity>
          <Animated.View
            style={{ height: tinggiDropdownATM, overflow: "hidden" }}
          >
            <View className="border-b border-gray-200 w-screen my-3" />
            <View className="flex-row items-center mb-3">
              <View className="bg-gray-500 rounded-full w-4 h-4 justify-center items-center flex">
                <Text
                  style={{ fontFamily: "Poppins_700Bold" }}
                  className="text-white text-xs"
                >
                  1
                </Text>
              </View>
              <Text
                style={{ fontFamily: "Poppins_500Medium" }}
                className="ml-2 text-sm"
              >
                Pilih{" "}
                <Text style={{ fontFamily: "Poppins_700Bold" }}>Transfer</Text>{" "}
                pada mesin ATM.
              </Text>
            </View>
            <View className="flex-row items-center mb-3">
              <View className="bg-gray-500 rounded-full w-4 h-4 justify-center items-center flex">
                <Text
                  style={{ fontFamily: "Poppins_700Bold" }}
                  className="text-white text-xs"
                >
                  2
                </Text>
              </View>
              <Text
                style={{ fontFamily: "Poppins_500Medium" }}
                className="ml-2 text-sm"
              >
                Pilih{" "}
                <Text style={{ fontFamily: "Poppins_700Bold" }}>
                  Virtual Account
                </Text>{" "}
                yang dituju.
              </Text>
            </View>
            <View className="flex-row items-center mb-3">
              <View className="bg-gray-500 rounded-full w-4 h-4 justify-center items-center flex">
                <Text
                  style={{ fontFamily: "Poppins_700Bold" }}
                  className="text-white text-xs"
                >
                  3
                </Text>
              </View>
              <Text
                style={{ fontFamily: "Poppins_500Medium" }}
                className="ml-2 text-sm"
              >
                Masukkan{" "}
                <Text style={{ fontFamily: "Poppins_700Bold" }}>
                  Kode Virtual
                </Text>{" "}
                dan nomor rekening.
              </Text>
            </View>
            <View className="flex-row items-center mb-3">
              <View className="bg-gray-500 rounded-full w-4 h-4 justify-center items-center flex">
                <Text
                  style={{ fontFamily: "Poppins_700Bold" }}
                  className="text-white text-xs"
                >
                  4
                </Text>
              </View>
              <Text
                style={{ fontFamily: "Poppins_500Medium" }}
                className="ml-2 text-sm"
              >
                Selesaikan transaksi untuk{" "}
                <Text style={{ fontFamily: "Poppins_700Bold" }}>
                  Pembayaran
                </Text>{" "}
                Anda.
              </Text>
            </View>
          </Animated.View>
        </View>
      </View>
    </ScrollView>
  );
}
