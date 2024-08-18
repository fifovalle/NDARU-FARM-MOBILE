import "../global.css";
import React, { useEffect, useState } from "react";
import { Stack, useRouter } from "expo-router";
import useHurufKhusus from "../hooks/useHurufKhusus";
import auth from "@react-native-firebase/auth";
import { View, Text, ActivityIndicator, Image } from "react-native";

export default function RootLayout() {
  const [memuat, setMemuat] = useState(true);
  const giftMemuat = require("../assets/video/memuat.gif");
  const [apakahSudahMasuk, aturapakahSudahMasuk] = useState(false);
  const { hurufTerpasang } = useHurufKhusus();
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = auth().onAuthStateChanged((pengguna) => {
      aturapakahSudahMasuk(!!pengguna);
      setMemuat(false);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  useEffect(() => {
    if (!memuat && hurufTerpasang) {
      if (apakahSudahMasuk) {
        router.replace("beranda");
      } else {
        router.replace("awal");
      }
    }
  }, [memuat, apakahSudahMasuk, hurufTerpasang, router]);

  if (memuat || !hurufTerpasang) {
    return (
      <View className="flex-1 items-center justify-center bg-[#fff]">
        <Image className="w-[70px] h-[70px]" source={giftMemuat} />
      </View>
    );
  }

  return (
    <Stack
      screenOptions={{
        headerShown: false,
        animation: "fade",
      }}
    >
      <Stack.Screen name="beranda" />
      <Stack.Screen name="awal" />
    </Stack>
  );
}
