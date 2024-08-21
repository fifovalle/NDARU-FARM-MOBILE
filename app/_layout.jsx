import "../global.css";
import React from "react";
import { Stack } from "expo-router";
// MODUL KAMI
import useGayaHuruf from "../hooks/useGayaHuruf";
import usePengarahTataLetakUtama from "../hooks/usePengarahTataLetakUtama";
import IndikatorMuatan from "../components/IndikatorMuatan";

export default function TataLetakUtama() {
  const { apakahHurufTerpasang } = useGayaHuruf();

  usePengarahTataLetakUtama(apakahHurufTerpasang);

  if (!apakahHurufTerpasang) {
    return <IndikatorMuatan />;
  }

  return (
    <Stack screenOptions={{ headerShown: false, animation: "fade" }}>
      <Stack.Screen name="layarPertama" />
    </Stack>
  );
}
