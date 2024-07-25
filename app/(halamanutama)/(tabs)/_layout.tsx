import React from "react";
import { Tabs } from "expo-router";
import { Image } from "react-native";

export default function TataLetakTabs() {
  const berandaAktif = require("../../../assets/images/beranda(aktif).png");
  const berandaTidakAktif = require("../../../assets/images/beranda(tidakaktif).png");
  const keranjangAktif = require("../../../assets/images/keranjang(aktif).png");
  const keranjangTidakAktif = require("../../../assets/images/keranjang(tidakaktif).png");
  const pesananAktif = require("../../../assets/images/status(aktif).png");
  const pesananTidakAktif = require("../../../assets/images/status(tidakaktif).png");

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: { paddingHorizontal: 25 },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          tabBarIcon: ({ focused }) => (
            <Image
              source={focused ? berandaAktif : berandaTidakAktif}
              style={{ width: 32, height: 32 }}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="keranjang"
        options={{
          tabBarIcon: ({ focused }) => (
            <Image
              source={focused ? keranjangAktif : keranjangTidakAktif}
              style={{ width: 32, height: 32 }}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="pesanan"
        options={{
          tabBarIcon: ({ focused }) => (
            <Image
              source={focused ? pesananAktif : pesananTidakAktif}
              style={{ width: 32, height: 32 }}
            />
          ),
        }}
      />
    </Tabs>
  );
}
