import { useEffect, useState } from "react";
import SmsRetriever from "react-native-sms-retriever";
import Toast from "react-native-toast-message";

export function usePenerimaSMS(setOtpValue) {
  useEffect(() => {
    const ambilSms = async () => {
      try {
        const pesan = await SmsRetriever.startSmsRetriever();
        if (pesan && typeof pesan === "string") {
          const kodeOtp = pesan.match(/\d{6}/)?.[0];
          if (kodeOtp) {
            kodeOtp.split("").forEach((digit, indeks) => {
              setOtpValue(digit, indeks);
            });
          } else {
            console.log("Kode OTP tidak ditemukan dalam pesan.");
          }
        } else {
          console.log("Pesan tidak valid atau tidak ditemukan.");
        }
      } catch (error) {
        console.log("Gagal mengambil SMS:", error);
        Toast.show({
          type: "error",
          text1: "Gagal Mengambil SMS",
          text2: "Tidak bisa mendapatkan SMS secara otomatis.",
        });
      }
    };

    ambilSms();
  }, []);
}
