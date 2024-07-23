import React from "react";
import { View, ScrollView } from "react-native";
import {
  useFonts,
  Poppins_700Bold,
  Poppins_600SemiBold,
  Poppins_900Black_Italic,
} from "@expo-google-fonts/poppins";
import BarPencaharian from "./components/barPencaharian";
import Spanduk from "./components/spanduk";

export default function index() {
  let [memuatFont] = useFonts({
    Poppins_700Bold,
    Poppins_600SemiBold,
    Poppins_900Black_Italic,
  });
  if (!memuatFont) {
    return null;
  }

  return (
    <ScrollView className="flex-1 p-4" keyboardShouldPersistTaps="handled">
      <View className="flex-1">
        <BarPencaharian />
        <Spanduk />
      </View>
    </ScrollView>
  );
}
