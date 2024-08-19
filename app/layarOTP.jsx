import React, { useRef, useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  Image,
  Platform,
  ActivityIndicator,
} from "react-native";
import { useVerifikasiOTP } from "../hooks/useVerifikasiOTP";
import { useRouter, useGlobalSearchParams } from "expo-router";
import SmsRetriever from "react-native-sms-retriever";

export default function LayarOtp() {
  const router = useRouter();
  const referensiMasukan = useRef([]);
  const params = useGlobalSearchParams();
  const verificationId = params.verificationId;

  const [nilaiOtp, aturNilaiOtp] = useState(["", "", "", "", "", ""]);
  const { loading, verifikasiKodeOtp } = useVerifikasiOTP(verificationId);

  useEffect(() => {
    const startListening = async () => {
      try {
        await SmsRetriever.requestPhoneNumber();
        await SmsRetriever.startSmsRetriever();
        SmsRetriever.addSmsListener((event) => {
          const { message } = event;
          const otp = extractOtpFromMessage(message);
          if (otp) {
            aturNilaiOtp(otp.split(""));
            verifikasiKodeOtp(otp);
          }
        });
      } catch (error) {
        console.error("Gagal memulai SMS Retriever:", error);
      }
    };

    startListening();

    return () => {
      SmsRetriever.removeSmsListener();
    };
  }, [verificationId]);

  const extractOtpFromMessage = (message) => {
    // Sesuaikan dengan format SMS OTP Anda
    const otpMatch = message.match(/\b\d{6}\b/);
    return otpMatch ? otpMatch[0] : null;
  };

  const ubahNilaiOtp = (teks, indeks) => {
    const nilaiOtpBaru = [...nilaiOtp];
    nilaiOtpBaru[indeks] = teks;
    aturNilaiOtp(nilaiOtpBaru);

    if (teks && indeks < referensiMasukan.current.length - 1) {
      referensiMasukan.current[indeks + 1]?.focus();
    }

    if (nilaiOtpBaru.join("").length === 6) {
      verifikasiKodeOtp(nilaiOtpBaru.join(""));
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
              className="text-3xl text-center rounded-lg h-14 w-14 mx-2"
              maxLength={1}
              keyboardType="number-pad"
              onChangeText={(teks) => ubahNilaiOtp(teks, indeks)}
              onKeyPress={(e) => tekanTombol(e, indeks)}
              editable={!loading}
            />
          ))}
        </View>

        {loading && (
          <ActivityIndicator size="large" color="#ffffff" className="mt-4" />
        )}

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
