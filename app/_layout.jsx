import "../global.css";
import React, { useEffect } from "react";
import { Stack, useRouter } from "expo-router";
import { View, Image } from "react-native";
import useHurufKhusus from "../hooks/useHurufKhusus";
import useStatusPengguna from "../hooks/useStatusPengguna";
import usePeriksaPengguna from "../hooks/usePeriksaPengguna";

export default function RootLayout() {
  const giftMemuat = require("../assets/video/memuat.gif");
  const { hurufTerpasang } = useHurufKhusus();
  const { memuat: statusPenggunaMemuat, apakahSudahMasuk } =
    useStatusPengguna();
  const { koleksiTidakKosong, memuat: koleksiMemuat } = usePeriksaPengguna();
  const jalur = useRouter();

  useEffect(() => {
    if (!statusPenggunaMemuat && !koleksiMemuat && hurufTerpasang) {
      if (apakahSudahMasuk) {
        if (koleksiTidakKosong) {
          jalur.replace("beranda");
        } else {
          jalur.replace("awal");
        }
      } else {
        jalur.replace("awal");
      }
    }
  }, [
    statusPenggunaMemuat,
    koleksiMemuat,
    hurufTerpasang,
    apakahSudahMasuk,
    koleksiTidakKosong,
    jalur,
  ]);

  if (statusPenggunaMemuat || koleksiMemuat || !hurufTerpasang) {
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
