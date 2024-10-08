import { View, Text, TouchableOpacity } from "react-native";
import React, { useEffect } from "react";
import { router } from "expo-router";
import { FontAwesome, Ionicons } from "@expo/vector-icons";
import Animated, {
  Easing,
  useSharedValue,
  withTiming,
  useAnimatedStyle,
  withRepeat,
  withSpring,
} from "react-native-reanimated";

// MODUL KAMI
import { gayaHuruf } from "../../constants/huruf";

export default function Checkout() {
  const circleOpacity = useSharedValue(0);
  const backgroundOpacity = useSharedValue(0);
  const checkOpacity = useSharedValue(0);
  const scale = useSharedValue(0.5);
  const textOpacity = useSharedValue(0); // Opasitas untuk teks
  const chevronOpacity = useSharedValue(0); // Opasitas untuk ikon chevron
  const backgroundPosition = useSharedValue(0); // Untuk posisi vertikal background

  useEffect(() => {
    circleOpacity.value = withTiming(1, {
      duration: 100,
      easing: Easing.out(Easing.exp),
    });

    circleOpacity.value = withRepeat(withSpring(1.2, { damping: 2 }), 3, true);

    setTimeout(() => {
      circleOpacity.value = withTiming(0, {
        duration: 1500,
        easing: Easing.out(Easing.exp),
      });
    }, 1500);

    setTimeout(() => {
      backgroundOpacity.value = withTiming(1, {
        duration: 500,
        easing: Easing.out(Easing.exp),
      });

      backgroundPosition.value = withTiming(-10, {
        duration: 300,
        easing: Easing.out(Easing.exp),
      });

      setTimeout(() => {
        backgroundPosition.value = withTiming(0, {
          duration: 400,
          easing: Easing.out(Easing.exp),
        });
      }, 900);
    }, 1800);

    setTimeout(() => {
      checkOpacity.value = withTiming(1, {
        duration: 500,
        easing: Easing.out(Easing.exp),
      });
      scale.value = withTiming(1, {
        duration: 500,
        easing: Easing.out(Easing.exp),
      });
    }, 1500);

    // Animasi teks muncul
    setTimeout(() => {
      textOpacity.value = withTiming(1, {
        duration: 500,
        easing: Easing.out(Easing.exp),
      });
    }, 2900); // Tunggu hingga ceklis muncul

    // Animasi ikon chevron muncul
    setTimeout(() => {
      chevronOpacity.value = withTiming(1, {
        duration: 500,
        easing: Easing.out(Easing.exp),
      });
    }, 2900); // Tunggu hingga teks muncul
  }, []);

  const circleStyle = useAnimatedStyle(() => {
    return {
      opacity: circleOpacity.value,
      width: 150,
      height: 150,
      borderRadius: 75,
      backgroundColor: "rgba(0, 62, 0, 0.361)", // Warna lingkaran
      justifyContent: "center",
      alignItems: "center",
      transform: [{ scale: circleOpacity.value }], // Tambahkan transform scale
    };
  });

  const backgroundAnimatedStyle = useAnimatedStyle(() => {
    return {
      opacity: backgroundOpacity.value,
      backgroundColor: "white",
      width: 100,
      height: 100,
      borderRadius: 50,
      justifyContent: "center",
      alignItems: "center",
      transform: [{ translateY: backgroundPosition.value }], // Efek bounce atas-bawah
    };
  });

  const checkAnimatedStyle = useAnimatedStyle(() => {
    return {
      opacity: checkOpacity.value,
      transform: [{ scale: scale.value }],
    };
  });

  const textAnimatedStyle = useAnimatedStyle(() => {
    return {
      opacity: textOpacity.value,
    };
  });

  const chevronAnimatedStyle = useAnimatedStyle(() => {
    return {
      opacity: chevronOpacity.value,
    };
  });

  return (
    <View className="flex-1 justify-center items-center bg-green-700">
      <Animated.View style={circleStyle} className="absolute" />
      <Animated.View style={backgroundAnimatedStyle}>
        <Animated.View style={checkAnimatedStyle}>
          <Ionicons name="checkmark" size={80} color="green" />
        </Animated.View>
      </Animated.View>
      <Animated.Text
        style={[
          { fontFamily: gayaHuruf.poppins700, fontSize: 24 },
          textAnimatedStyle,
        ]}
        className="mt-5 text-white"
      >
        Pesanan Berhasil!
      </Animated.Text>

      <Animated.Text
        style={[
          { fontFamily: gayaHuruf.poppins500, fontSize: 14 },
          textAnimatedStyle,
        ]}
        className="text-center text-white"
      >
        Terimakasih sudah memesan! Ketuk tombol dibawah untuk melanjutkan
        pesanan Anda.
      </Animated.Text>
      <Animated.View
        style={chevronAnimatedStyle}
        className="mt-12 w-12 h-12 border-2 border-white justify-center items-center rounded-full"
      >
        <TouchableOpacity
          onPress={() => router.push("../../beranda/transaksi")}
        >
          <FontAwesome name="chevron-right" size={18} color="white" />
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
}
