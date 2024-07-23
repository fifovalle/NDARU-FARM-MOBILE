import "../global.css";
import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      {/* <Stack.Screen name="(halamanautentikasi)" /> */}
      <Stack.Screen name="(halamanutama)" />
    </Stack>
  );
}
