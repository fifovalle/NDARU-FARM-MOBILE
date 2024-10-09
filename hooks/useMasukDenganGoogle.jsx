import { useEffect } from "react";
import { useRouter } from "expo-router";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import auth from "@react-native-firebase/auth";

GoogleSignin.configure({
  webClientId:
    "101945539421-7n4r71eglah54dfi8mbsas33835rb7sl.apps.googleusercontent.com",
});

export default function useMasukDenganGoogle() {
  const pengarah = useRouter();

  useEffect(() => {
    const inisialisasiGoogleSignIn = async () => {
      try {
        await GoogleSignin.hasPlayServices({
          showPlayServicesUpdateDialog: true,
        });
      } catch (error) {
        console.error("Kesalahan Layanan Google Play: ", error);
      }
    };

    inisialisasiGoogleSignIn();
  }, []);

  const masukDenganGoogle = async () => {
    try {
      const { idToken } = await GoogleSignin.signIn();
      const kredensialGoogle = auth.GoogleAuthProvider.credential(idToken);
      await auth().signInWithCredential(kredensialGoogle);
      pengarah.push("/layarIdentitas");
    } catch (error) {
      console.error("Kesalahan Masuk Google: ", error);
    }
  };

  return masukDenganGoogle;
}
