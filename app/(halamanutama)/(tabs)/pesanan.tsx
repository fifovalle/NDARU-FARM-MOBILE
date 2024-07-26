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

export default function Pesanan() {
  const gulirVertikal = useRef(new Animated.Value(0)).current;
  const brokoli = require("../../../assets/images/brokoli.png");
  const ikonSilang = require("../../../assets/images/ikon12.png");
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
        <View className="mb-4 mt-5">
          <View className="flex-row justify-between items-center mb-4">
            <Text
              className="text-lg text-[#275229]"
              style={{ fontFamily: "Poppins_700Bold" }}
            >
              Status Pesanan Anda
            </Text>
            <TouchableOpacity className="flex-row" activeOpacity={0.6}>
              <Text
                className="text-[#FAA322] mr-1"
                style={{ fontFamily: "Poppins_700Bold" }}
              >
                1 Barang
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <View
          className="mb-2 mt-2 bg-white rounded-xl"
          style={{
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,
            elevation: 5,
          }}
        >
          <View className="flex-row items-center">
            <Image className="w-32 h-24" source={brokoli} />
            <View>
              <Text
                className="text-xl text-[#275229] px-4 pt-4"
                style={{ fontFamily: "Poppins_700Bold" }}
              >
                Brokoli
              </Text>
              <Text
                className="text-[#000] px-4"
                style={{ fontFamily: "Poppins_600SemiBold" }}
              >
                Sehat dan berwarna...
              </Text>
              <Text
                className="text-[#275229] px-4"
                style={{ fontFamily: "Poppins_600SemiBold" }}
              >
                Rp300.000
              </Text>
              <Text
                className="text-[#FAA322] px-4 py-2 pb-4"
                style={{ fontFamily: "Poppins_700Bold" }}
              >
                Dikemas
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
