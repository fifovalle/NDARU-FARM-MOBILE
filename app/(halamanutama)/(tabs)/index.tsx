import React, { useRef } from "react";
import {
  View,
  ScrollView,
  Text,
  TouchableOpacity,
  Image,
  Animated,
  NativeSyntheticEvent,
  NativeScrollEvent,
} from "react-native";
import {
  useFonts,
  Poppins_700Bold,
  Poppins_600SemiBold,
  Poppins_900Black_Italic,
} from "@expo-google-fonts/poppins";
import BarPencaharian from "../components/barPencaharian";
import Spanduk from "../components/spanduk";

export default function index() {
  const gulirVertikal = useRef(new Animated.Value(0)).current;
  const ikonPanah = require("../../../assets/images/ikon8.png");
  const ikonKategori1 = require("../../../assets/images/ikon9.png");
  const ikonKategori2 = require("../../../assets/images/ikon10.png");
  const ikonKategori3 = require("../../../assets/images/ikon11.png");
  const brokoli = require("../../../assets/images/brokoli.png");
  let [memuatFont] = useFonts({
    Poppins_700Bold,
    Poppins_600SemiBold,
    Poppins_900Black_Italic,
  });
  if (!memuatFont) {
    return null;
  }
  const tanganiGulirVertikal = (
    event: NativeSyntheticEvent<NativeScrollEvent>
  ) => {
    const posisiBergulir = event.nativeEvent.contentOffset.y;
    gulirVertikal.setValue(posisiBergulir);
  };

  const warnaLatar = gulirVertikal.interpolate({
    inputRange: [0, 50],
    outputRange: ["rgba(255, 255, 255, 0)", "rgba(255, 255, 255, 1)"],
    extrapolate: "clamp",
  });

  return (
    <View className="flex-1">
      <Animated.View
        style={{
          backgroundColor: warnaLatar,
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 10,
        }}
      >
        <BarPencaharian />
      </Animated.View>
      <ScrollView
        className="flex-1 mt-24 p-4"
        keyboardShouldPersistTaps="handled"
        onScroll={tanganiGulirVertikal}
        scrollEventThrottle={16}
      >
        <Spanduk />
        <View className="mb-4 mt-2">
          <View className="flex-row justify-between items-center mb-4">
            <Text
              className="text-lg text-[#275229]"
              style={{ fontFamily: "Poppins_700Bold" }}
            >
              Kategori
            </Text>
            <TouchableOpacity className="flex-row" activeOpacity={0.6}>
              <Text
                className="text-[#FAA322] mr-1"
                style={{ fontFamily: "Poppins_700Bold" }}
              >
                Lihat Semua
              </Text>
              <Image className="w-4 h-4 mt-1" source={ikonPanah} />
            </TouchableOpacity>
          </View>
          <View className="flex-row justify-around">
            <TouchableOpacity className="items-center" activeOpacity={0.5}>
              <View className="bg-[#275229] p-3 rounded-xl mb-2">
                <View className="bg-white rounded-full h-16 w-16 mx-auto">
                  <Image className="w-10 h-10 m-auto" source={ikonKategori1} />
                </View>
                <Text
                  className="text-white my-4"
                  style={{ fontFamily: "Poppins_600SemiBold" }}
                >
                  Sayuran
                </Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity className="items-center" activeOpacity={0.5}>
              <View className="bg-white border boder-[#275229] p-3 rounded-xl mb-2">
                <View className="bg-[#275229] rounded-full h-16 w-16 mx-auto">
                  <Image className="w-10 h-10 m-auto" source={ikonKategori2} />
                </View>
                <Text
                  className="text-[#275229] my-4"
                  style={{ fontFamily: "Poppins_600SemiBold" }}
                >
                  Perikanan
                </Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity className="items-center" activeOpacity={0.5}>
              <View className="bg-white border boder-[#275229] p-3 rounded-xl mb-2">
                <View className="bg-[#275229] rounded-full h-16 w-16 mx-auto">
                  <Image className="w-10 h-10 m-auto" source={ikonKategori3} />
                </View>
                <Text
                  className="text-[#275229] my-4"
                  style={{ fontFamily: "Poppins_600SemiBold" }}
                >
                  Pelatihan
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
        <View className="mb-4 mt-2">
          <View className="flex-row justify-between items-center mb-4">
            <Text
              className="text-lg text-[#275229]"
              style={{ fontFamily: "Poppins_700Bold" }}
            >
              Rekomendasi
            </Text>
            <TouchableOpacity className="flex-row" activeOpacity={0.6}>
              <Text
                className="text-[#FAA322] mr-1"
                style={{ fontFamily: "Poppins_700Bold" }}
              >
                Lihat Semua
              </Text>
              <Image className="w-4 h-4 mt-1" source={ikonPanah} />
            </TouchableOpacity>
          </View>
          <View className="flex-row justify-around">
            <TouchableOpacity className="items-center" activeOpacity={0.5}>
              <View className="bg-white border boder-[#275229] p-3 rounded-xl mb-2">
                <View className="bg-white h-32 w-32 mx-auto">
                  <Image className="w-full h-28 m-auto" source={brokoli} />
                </View>
                <Text
                  className="text-[#275229] mt-2 text-center"
                  style={{ fontFamily: "Poppins_700Bold" }}
                >
                  Brokoli
                </Text>
                <Text
                  className="text-black text-center text-sm"
                  style={{ fontFamily: "Poppins_600SemiBold" }}
                >
                  Sehat dan berwarna...
                </Text>
                <Text
                  className="text-[#275229] mb-2 text-center"
                  style={{ fontFamily: "Poppins_700Bold" }}
                >
                  Rp10.000/kg
                </Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity className="items-center" activeOpacity={0.5}>
              <View className="bg-white border boder-[#275229] p-3 rounded-xl mb-2">
                <View className="bg-white h-32 w-32 mx-auto">
                  <Image className="w-full h-28 m-auto" source={brokoli} />
                </View>
                <Text
                  className="text-[#275229] mt-2 text-center"
                  style={{ fontFamily: "Poppins_700Bold" }}
                >
                  Brokoli
                </Text>
                <Text
                  className="text-black text-center text-sm"
                  style={{ fontFamily: "Poppins_600SemiBold" }}
                >
                  Sehat dan berwarna...
                </Text>
                <Text
                  className="text-[#275229] mb-2 text-center"
                  style={{ fontFamily: "Poppins_700Bold" }}
                >
                  Rp10.000/kg
                </Text>
              </View>
            </TouchableOpacity>
          </View>
          <View className="flex-row justify-around">
            <TouchableOpacity className="items-center" activeOpacity={0.5}>
              <View className="bg-white border boder-[#275229] p-3 rounded-xl mb-2">
                <View className="bg-white h-32 w-32 mx-auto">
                  <Image className="w-full h-28 m-auto" source={brokoli} />
                </View>
                <Text
                  className="text-[#275229] mt-2 text-center"
                  style={{ fontFamily: "Poppins_700Bold" }}
                >
                  Brokoli
                </Text>
                <Text
                  className="text-black text-center text-sm"
                  style={{ fontFamily: "Poppins_600SemiBold" }}
                >
                  Sehat dan berwarna...
                </Text>
                <Text
                  className="text-[#275229] mb-2 text-center"
                  style={{ fontFamily: "Poppins_700Bold" }}
                >
                  Rp10.000/kg
                </Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity className="items-center" activeOpacity={0.5}>
              <View className="bg-white border boder-[#275229] p-3 rounded-xl mb-2">
                <View className="bg-white h-32 w-32 mx-auto">
                  <Image className="w-full h-28 m-auto" source={brokoli} />
                </View>
                <Text
                  className="text-[#275229] mt-2 text-center"
                  style={{ fontFamily: "Poppins_700Bold" }}
                >
                  Brokoli
                </Text>
                <Text
                  className="text-black text-center text-sm"
                  style={{ fontFamily: "Poppins_600SemiBold" }}
                >
                  Sehat dan berwarna...
                </Text>
                <Text
                  className="text-[#275229] mb-2 text-center"
                  style={{ fontFamily: "Poppins_700Bold" }}
                >
                  Rp10.000/kg
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
