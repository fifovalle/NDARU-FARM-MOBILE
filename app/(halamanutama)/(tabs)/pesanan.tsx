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
      </ScrollView>
    </View>
  );
}
