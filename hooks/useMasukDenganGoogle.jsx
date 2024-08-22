import { useEffect } from "react";
import { useRouter } from "expo-router";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import auth from "@react-native-firebase/auth";

GoogleSignin.configure({
  webClientId:
    "370204281180-r0db39khmqsrak3cue7c2hts4odqqu50.apps.googleusercontent.com",
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
