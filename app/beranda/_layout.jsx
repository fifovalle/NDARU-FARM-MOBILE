import React from "react";
import { Image } from "react-native";
import { Tabs } from "expo-router";

// MODUL KAMI
import { pilihIkon } from "../../constants/pilihIkon";
import { useTabsFotoProfilPengguna } from "../../hooks/useTabsFotoProfilPengguna";

export default function TataLetakUtama() {
  const { fotoPengguna, memuatFotoPengguna } = useTabsFotoProfilPengguna();
  const gambarBawaan = require("../../assets/images/pengguna-bawaan.png");

  const gambarProfil =
    fotoPengguna && !memuatFotoPengguna ? fotoPengguna : gambarBawaan;

  return (
    <Tabs
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarStyle: {
          height: 60,
          backgroundColor: "#fff",
          borderTopWidth: 1,
          borderTopColor: "#ddd",
        },
        tabBarLabelStyle: {
          display: "none",
        },
        tabBarIcon: ({ focused }) => {
          const ikonTerpilih = pilihIkon(route.name, focused, gambarProfil);
          const apakahLayarProfil = route.name === "profil" && focused;

          return ikonTerpilih ? (
            <Image
              source={ikonTerpilih}
              className={`w-7 h-7 ${apakahLayarProfil ? "rounded-full" : ""}`}
            />
          ) : null;
        },
      })}
    >
      <Tabs.Screen name="index" />
      <Tabs.Screen name="transaksi" />
      <Tabs.Screen name="pesan" />
      <Tabs.Screen name="profil" />
    </Tabs>
  );
}
