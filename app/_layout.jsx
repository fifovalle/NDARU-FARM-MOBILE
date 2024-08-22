import "../global.css";
import React from "react";
import { Stack } from "expo-router";

// MODUL KAMI
import useGayaHuruf from "../hooks/useGayaHuruf";
import usePengarahTataLetakUtama from "../hooks/usePengarahTataLetakUtama";
import IndikatorMuatan from "../components/IndikatorMuatan";
import usePenggunaTerdaftar from "../hooks/usePenggunaTerdaftar";

export default function TataLetakUtama() {
  const { apakahHurufTerpasang } = useGayaHuruf();
  const { apakahLogin, memuatData } = usePenggunaTerdaftar();

  usePenggunaTerdaftar();
  usePengarahTataLetakUtama(apakahLogin, apakahHurufTerpasang, memuatData);

  if (memuatData || !apakahHurufTerpasang) {
    return <IndikatorMuatan />;
  }

  return (
    <Stack screenOptions={{ headerShown: false, animation: "fade" }}>
      <Stack.Screen name={apakahLogin ? "beranda" : "layarPertama"} />
    </Stack>
  );
}
