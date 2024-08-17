import React from "react";
import { Image } from "react-native";
import { Tabs } from "expo-router";

export default function TataLetakUtama() {
  const ikonBeranda = require("../../assets/images/ikonHome.png");
  const ikonBerandaAktif = require("../../assets/images/ikonHomeActive.png");
  const ikonTransaksi = require("../../assets/images/ikonTransaksi.png");
  const ikonTransaksiAktif = require("../../assets/images/ikonTransaksiActive.png");

  return (
    <Tabs
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarStyle: {
          height: 60,
        },
        tabBarLabelStyle: {
          display: "none",
        },
        tabBarIcon: ({ focused }) => {
          const ikon =
            route.name === "index"
              ? focused
                ? ikonBerandaAktif
                : ikonBeranda
              : route.name === "transaksi"
              ? focused
                ? ikonTransaksiAktif
                : ikonTransaksi
              : null;

          return <Image source={ikon} style={{ width: 24, height: 24 }} />;
        },
      })}
    >
      <Tabs.Screen name="index" />
      <Tabs.Screen name="transaksi" />
    </Tabs>
  );
}
