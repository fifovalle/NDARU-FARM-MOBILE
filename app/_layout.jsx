import "../global.css";
import React, { useEffect } from "react";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { Poppins_700Bold } from "@expo-google-fonts/poppins";

import {
  Lexend_300Light,
  Lexend_400Regular,
  Lexend_500Medium,
  Lexend_700Bold,
  Lexend_900Black,
  useFonts,
} from "@expo-google-fonts/lexend";

export default function TataLetakUtama() {
  const [fontTerpasang, adaError] = useFonts({
    Lexend_300Light,
    Lexend_400Regular,
    Lexend_500Medium,
    Lexend_700Bold,
    Lexend_900Black,
    Poppins_700Bold,
  });

  useEffect(() => {
    if (fontTerpasang || adaError) {
      SplashScreen.hideAsync();
    }
  }, [fontTerpasang, adaError]);

  if (!fontTerpasang && !adaError) {
    return null;
  }

  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="index" />
    </Stack>
  );
}
