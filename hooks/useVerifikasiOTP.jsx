import { useState } from "react";
import auth from "@react-native-firebase/auth";
import Toast from "react-native-toast-message";
import { useRouter } from "expo-router";

export function useVerifikasiOTP(verificationId) {
  const [memuat, setMemuat] = useState(false);
  const router = useRouter();

  const verifikasiKodeOtp = async (kodeOtp) => {
    setMemuat(true);
    try {
      if (!verificationId) {
        throw new Error("ID verifikasi tidak ditemukan.");
      }

      const credential = auth.PhoneAuthProvider.credential(
        verificationId,
        kodeOtp
      );

      await auth().signInWithCredential(credential);
      return Promise.resolve();
    } catch (error) {
      console.error("Kode OTP salah:", error);
      Toast.show({
        type: "error",
        text1: "Verifikasi Gagal",
        text2:
          error.message ||
          "Kode OTP yang Anda masukkan salah atau sudah kadaluarsa.",
      });
      return Promise.reject(error);
    } finally {
      setMemuat(false);
    }
  };

  return {
    memuat,
    verifikasiKodeOtp,
  };
}
