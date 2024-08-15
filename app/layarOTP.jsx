import React, { useRef, useState } from "react";
import {
  View,
  Text,
  TextInput,
  Image,
  Platform,
  NativeSyntheticEvent,
  TextInputKeyPressEventData,
} from "react-native";

export default function LayarOtp() {
  const referensiMasukan = useRef([]);

  const [nilaiOtp, aturNilaiOtp] = useState(["", "", "", ""]);

  const ubahNilaiOtp = (teks, indeks) => {
    const nilaiOtpBaru = [...nilaiOtp];
    nilaiOtpBaru[indeks] = teks;
    aturNilaiOtp(nilaiOtpBaru);

    if (teks && indeks < referensiMasukan.current.length - 1) {
      referensiMasukan.current[indeks + 1]?.focus();
    }
  };

  const tekanTombol = (e, indeks) => {
    if (e.nativeEvent.key === "Backspace" && indeks > 0) {
      referensiMasukan.current[indeks - 1]?.focus();
    }
  };

  const gambarOTP = require("../assets/images/gambarOTP.png");

  return (
    <View className="flex-1 bg-[#E7E8E2]">
      <View className="flex-1 items-center justify-center">
        <Image
          source={gambarOTP}
          className="h-[500px] w-[300px] mt-3"
          style={{ resizeMode: "contain" }}
        />
      </View>

      <View className="flex-1 bg-[#447055] rounded-t-[50px] p-6">
        <View className="border-t-2 border-white mb-12 mx-auto w-32" />
        <Text
          style={{
            fontFamily: Platform.select({
              android: "Lexend_700Bold",
              ios: "Lexend_700Bold",
            }),
          }}
          className="text-white text-[35px] text-center mb-4"
        >
          Verifikasi
        </Text>
        <Text
          style={{
            fontFamily: Platform.select({
              android: "Lexend_500Medium",
              ios: "Lexend_500Medium",
            }),
          }}
          className="text-white text-center mb-20"
        >
          Kode verifikasi telah dikirimkan ke nomor Anda
        </Text>

        <View className="flex-row justify-center space-x-4 mb-8">
          {nilaiOtp.map((_, indeks) => (
            <TextInput
              key={indeks}
              ref={(el) => (referensiMasukan.current[indeks] = el)}
              cursorColor="#447055"
              style={{
                backgroundColor: nilaiOtp[indeks] ? "#AFF0D0" : "white",
                color: "black",
                fontFamily: Platform.select({
                  android: "Lexend_700Bold",
                  ios: "Lexend_700Bold",
                }),
              }}
              className="text-3xl text-center rounded-lg h-16 w-16 mx-4"
              maxLength={1}
              keyboardType="number-pad"
              onChangeText={(teks) => ubahNilaiOtp(teks, indeks)}
              onKeyPress={(e) => tekanTombol(e, indeks)}
            />
          ))}
        </View>

        <Text
          style={{
            fontFamily: Platform.select({
              android: "Lexend_500Medium",
              ios: "Lexend_500Medium",
            }),
          }}
          className="text-white text-center mt-20"
        >
          Tidak menerima kode? <Text className="font-bold">Kirim Ulang</Text>
        </Text>
      </View>
    </View>
  );
}
