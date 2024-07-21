import { Stack } from "expo-router";

export default function TataLetakAutentikasi() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="daftar" />
    </Stack>
  );
}
