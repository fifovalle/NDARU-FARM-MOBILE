import "../global.css";
import React, { useEffect, useState } from "react";
import { Stack, useRouter } from "expo-router";
import auth from "@react-native-firebase/auth";
import { View, Text, ActivityIndicator, StyleSheet } from "react-native";

export default function RootLayout() {
  const [loading, setLoading] = useState(true);
  const [apakahSudahMasuk, aturapakahSudahMasuk] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = auth().onAuthStateChanged((pengguna) => {
      aturapakahSudahMasuk(!!pengguna);
      setLoading(false);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  useEffect(() => {
    if (!loading) {
      if (apakahSudahMasuk) {
        router.replace("beranda");
      } else {
        router.replace("awal");
      }
    }
  }, [loading, apakahSudahMasuk, router]);

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text style={styles.text}>Memuat...</Text>
      </View>
    );
  }

  return (
    <Stack
      screenOptions={{
        headerShown: false,
        animation: "fade",
      }}
    >
      <Stack.Screen name="beranda" />
      <Stack.Screen name="awal" />
    </Stack>
  );
}

// Gaya inline
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  text: {
    marginTop: 10,
    fontSize: 18,
    color: "#333",
  },
});
