import { getAuth, signOut } from "@react-native-firebase/auth";

export const keluar = (pengarah) => {
  const autentikasi = getAuth();
  signOut(autentikasi)
    .then(() => {
      console.log("Logout berhasil!");
      pengarah.replace("/layarPertama");
    })
    .catch((error) => {
      console.error("Gagal logout:", error);
    });
};
