import React from "react";
import { Image } from "react-native";
import { Stack, Tabs } from "expo-router";
// MODUL KAMI
import { pilihIkon } from "../../constants/pilihIkon";

export default function TataLetakUtama() {
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
          const ikonTerpilih = pilihIkon(route.name, focused);
          return ikonTerpilih ? (
            <Image source={ikonTerpilih} style={{ width: 24, height: 24 }} />
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
