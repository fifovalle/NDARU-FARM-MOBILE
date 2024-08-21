import { useEffect } from "react";
import * as SplashScreen from "expo-splash-screen";
import {
  Lexend_300Light,
  Lexend_400Regular,
  Lexend_500Medium,
  Lexend_700Bold,
  Lexend_900Black,
  useFonts,
} from "@expo-google-fonts/lexend";
import { Poppins_500Medium, Poppins_700Bold } from "@expo-google-fonts/poppins";

export default function useGayaHuruf() {
  const [apakahHurufTerpasang] = useFonts({
    Lexend_300Light,
    Lexend_400Regular,
    Lexend_500Medium,
    Lexend_700Bold,
    Lexend_900Black,
    Poppins_500Medium,
    Poppins_700Bold,
  });

  useEffect(() => {
    if (apakahHurufTerpasang) {
      SplashScreen.hideAsync();
    }
  }, [apakahHurufTerpasang]);

  return { apakahHurufTerpasang };
}
