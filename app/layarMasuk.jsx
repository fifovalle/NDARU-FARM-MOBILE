import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  ScrollView,
  Platform,
  ActivityIndicator,
} from "react-native";
import React, { useState } from "react";
import { useRouter } from "expo-router";
import auth from "@react-native-firebase/auth";
import Toast from "react-native-toast-message";
import {
  GoogleSignin,
  statusCodes,
} from "@react-native-google-signin/google-signin";

GoogleSignin.configure({
  webClientId:
    "650778004656-9qu12ca46f089kj9ltt6epocfccpfh2d.apps.googleusercontent.com",
  offlineAccess: false,
});

export default function LayarMasuk() {
  const router = useRouter();
  const gambarOtentikasi = require("../assets/images/gambarMasuk.png");
  const gambarGoogle = require("../assets/images/ikonGoogle.png");

  const [nomorPonsel, setNomorPonsel] = useState("");
  const [loading, setLoading] = useState(false);

  const validasiNomorPonsel = (nomor) => {
    const regex = /^[0-9]{9,12}$/;
    return regex.test(nomor);
  };

  const tampilkanToast = (tipe, teks1, teks2) => {
    Toast.show({
      type: tipe,
      position: "top",
      text1: teks1,
      text2: teks2,
    });
  };

  const handleLanjutkan = () => {
    if (!validasiNomorPonsel(nomorPonsel)) {
      tampilkanToast(
        "error",
        "Nomor Tidak Valid",
        "Nomor ponsel harus 9-12 digit."
      );
      return;
    }

    setLoading(true);
    const nomorLengkap = `+62${nomorPonsel}`;

    auth()
      .signInWithPhoneNumber(nomorLengkap)
      .then((konfirmasi) => {
        setLoading(false);
        tampilkanToast("success", "OTP Terkirim", "Kode OTP telah dikirim.");
        router.push({
          pathname: "/layarOTP",
          query: { verificationId: konfirmasi.verificationId },
        });
      })
      .catch((error) => {
        setLoading(false);
        let pesanError = "Gagal mengirim OTP. Periksa nomor ponsel.";

        if (error.code === "auth/too-many-requests") {
          pesanError = "Terlalu banyak permintaan. Coba lagi nanti.";
        } else if (error.code === "auth/network-request-failed") {
          pesanError = "Kesalahan jaringan. Periksa koneksi.";
        }

        tampilkanToast("error", "Gagal", pesanError);
      });
  };

  const handleGoogleSignIn = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const { idToken } = await GoogleSignin.signIn();
      const credential = auth.GoogleAuthProvider.credential(idToken);
      setLoading(true);
      await auth().signInWithCredential(credential);
      setLoading(false);
      router.push("/layarOTP");
    } catch (error) {
      setLoading(false);
      console.error("Google Sign-In Error:", error);
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        tampilkanToast("error", "Gagal", "Sign in dibatalkan.");
      } else if (error.code === statusCodes.IN_PROGRESS) {
        tampilkanToast("error", "Gagal", "Sedang dalam proses.");
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        tampilkanToast(
          "error",
          "Gagal",
          "Google Play Services tidak tersedia."
        );
      } else {
        tampilkanToast("error", "Gagal", "Terjadi kesalahan. Coba lagi.");
      }
    }
  };

  return (
    <ScrollView className="flex-1">
      <Toast />
      <View className="flex p-6">
        <Image source={gambarOtentikasi} className="h-[350px] w-full mt-24" />

        <Text
          style={{
            fontFamily: Platform.select({
              android: "Lexend_700Bold",
              ios: "Lexend_700Bold",
            }),
          }}
          className="text-[#6B8F71] text-lg mb-2"
        >
          Nomor Ponsel:
        </Text>

        <View className="flex-row items-center border border-gray-400 rounded-lg p-3 mb-4">
          <Text
            style={{
              fontFamily: Platform.select({
                android: "Lexend_400Regular",
                ios: "Lexend_400Regular",
              }),
            }}
            className="text-lg text-[#626262] mr-2 border w-12 h-8 text-center rounded-md border-gray-400"
          >
            +62
          </Text>
          <TextInput
            style={{
              fontFamily: Platform.select({
                android: "Lexend_400Regular",
                ios: "Lexend_400Regular",
              }),
            }}
            placeholder="Masukan Nomor Ponsel Anda"
            keyboardType="phone-pad"
            placeholderTextColor={"#626262"}
            className="flex-1 text-md text-[#626262]"
            cursorColor={"#6B8F71"}
            value={nomorPonsel}
            onChangeText={setNomorPonsel}
          />
        </View>

        <TouchableOpacity
          onPress={handleLanjutkan}
          activeOpacity={0.8}
          className={`bg-[#3F5D44] py-4 rounded-lg mb-6 ${
            loading ? "bg-opacity-80" : ""
          }`}
          style={{
            transform: loading ? [{ scale: 1 }] : [{ scale: 1 }],
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            opacity: loading ? 0.7 : 1,
          }}
          disabled={loading}
        >
          {loading ? (
            <>
              <ActivityIndicator color="#fff" className="mr-2" />
              <Text
                style={{
                  fontFamily: Platform.select({
                    android: "Lexend_700Bold",
                    ios: "Lexend_700Bold",
                  }),
                }}
                className="text-white text-center text-lg"
              >
                Memuat...
              </Text>
            </>
          ) : (
            <Text
              style={{
                fontFamily: Platform.select({
                  android: "Lexend_700Bold",
                  ios: "Lexend_700Bold",
                }),
              }}
              className="text-white text-center text-lg"
            >
              Lanjutkan
            </Text>
          )}
        </TouchableOpacity>

        <Text
          style={{
            fontFamily: Platform.select({
              android: "Lexend_700Bold",
              ios: "Lexend_700Bold",
            }),
          }}
          className="text-[#6B8F71] text-center mb-6"
        >
          ATAU
        </Text>

        <TouchableOpacity
          onPress={handleGoogleSignIn}
          activeOpacity={0.7}
          className="flex-row items-center justify-center border border-gray-400 py-3 rounded-lg"
        >
          <Image
            source={gambarGoogle}
            className="w-6 h-6 mr-2"
            style={{ resizeMode: "contain" }}
          />
          <Text
            style={{
              fontFamily: Platform.select({
                android: "Lexend_500Medium",
                ios: "Lexend_500Medium",
              }),
            }}
            className="text-lg text-gray-700"
          >
            Masuk Dengan Google
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}
