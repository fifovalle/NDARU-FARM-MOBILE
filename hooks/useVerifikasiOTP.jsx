import { useState } from "react";
import auth from "@react-native-firebase/auth";
import Toast from "react-native-toast-message";
import { useRouter } from "expo-router";

export function useVerifikasiOTP(verificationId) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const verifikasiKodeOtp = async (kodeOtp) => {
    setLoading(true);
    try {
      if (!verificationId) {
        throw new Error("ID verifikasi tidak ditemukan.");
      }

      const credential = auth.PhoneAuthProvider.credential(
        verificationId,
        kodeOtp
      );
      await auth().signInWithCredential(credential);
      router.push("/layarBeranda");
    } catch (error) {
      console.error("Kode OTP salah:", error);
      Toast.show({
        type: "error",
        text1: "Verifikasi Gagal",
        text2:
          error.message ||
          "Kode OTP yang Anda masukkan salah atau sudah kadaluarsa.",
      });
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    verifikasiKodeOtp,
  };
}
