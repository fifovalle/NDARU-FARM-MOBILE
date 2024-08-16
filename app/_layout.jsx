import "../global.css";
import useHurufKhusus from "../hooks/useHurufKhusus";
import React from "react";
import { Stack } from "expo-router";

export default function TataLetakUtama() {
  const { hurufTerpasang } = useHurufKhusus();

  if (!hurufTerpasang) {
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
