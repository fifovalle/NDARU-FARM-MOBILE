import React from "react";
import { Image } from "react-native";
import { Stack, Tabs } from "expo-router";

export default function TataLetakUtama() {
  const ikonBeranda = require("../../assets/images/ikonHome.png");
  const ikonBerandaAktif = require("../../assets/images/ikonHomeActive.png");
  const ikonTransaksi = require("../../assets/images/ikonTransaksi.png");
  const ikonTransaksiAktif = require("../../assets/images/ikonTransaksiActive.png");
  const ikonPesan = require("../../assets/images/ikonPesan.png");
  const ikonPesanAktif = require("../../assets/images/ikonPesanActive.png");
  const ikonProfil = require("../../assets/images/ikonProfil.png");
  const ikonProfilAktif = require("../../assets/images/ikonProfilActive.png");

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
          let ikon;
          switch (route.name) {
            case "index":
              ikon = focused ? ikonBerandaAktif : ikonBeranda;
              break;
            case "transaksi":
              ikon = focused ? ikonTransaksiAktif : ikonTransaksi;
              break;
            case "pesan":
              ikon = focused ? ikonPesanAktif : ikonPesan;
              break;
            case "profil":
              ikon = focused ? ikonProfilAktif : ikonProfil;
              break;
            default:
              ikon = null;
          }
          return ikon ? (
            <Image source={ikon} style={{ width: 24, height: 24 }} />
          ) : null;
        },
      })}
    >
      <Stack.Screen name="index" />
      <Stack.Screen name="transaksi" />
      <Stack.Screen name="pesan" />
      <Stack.Screen name="profil" />
    </Tabs>
  );
}
