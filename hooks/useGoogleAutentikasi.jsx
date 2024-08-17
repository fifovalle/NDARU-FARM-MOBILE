import { useState } from "react";
import auth from "@react-native-firebase/auth";
import Toast from "react-native-toast-message";
import {
  GoogleSignin,
  statusCodes,
} from "@react-native-google-signin/google-signin";
import { useRouter } from "expo-router";

GoogleSignin.configure({
  webClientId:
    "650778004656-9qu12ca46f089kj9ltt6epocfccpfh2d.apps.googleusercontent.com",
  offlineAccess: false,
});

export function useGoogleAutentikasi() {
  const [sedangMemuat, setSedangMemuat] = useState(false);
  const penunjukArah = useRouter();

  const tampilkanPesanToast = (jenis, pesanUtama, pesanTambahan) => {
    Toast.show({
      type: jenis,
      position: "top",
      text1: pesanUtama,
      text2: pesanTambahan,
    });
  };

  const tanganiMasukGoogle = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const { idToken } = await GoogleSignin.signIn();
      const kredensialGoogle = auth.GoogleAuthProvider.credential(idToken);
      setSedangMemuat(true);
      await auth().signInWithCredential(kredensialGoogle);
      setSedangMemuat(false);
      penunjukArah.push("/layarBeranda");
    } catch (kesalahan) {
      setSedangMemuat(false);
      console.error("Google Sign-In Error:", kesalahan);
      if (kesalahan.code === statusCodes.SIGN_IN_CANCELLED) {
        tampilkanPesanToast("error", "Gagal", "Sign in dibatalkan.");
      } else if (kesalahan.code === statusCodes.IN_PROGRESS) {
        tampilkanPesanToast("error", "Gagal", "Sedang dalam proses.");
      } else if (kesalahan.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        tampilkanPesanToast(
          "error",
          "Gagal",
          "Google Play Services tidak tersedia."
        );
      } else {
        tampilkanPesanToast("error", "Gagal", "Terjadi kesalahan. Coba lagi.");
      }
    }
  };

  return {
    sedangMemuat,
    tanganiMasukGoogle,
  };
}
