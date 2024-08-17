import { useState } from "react";
import auth from "@react-native-firebase/auth";
import Toast from "react-native-toast-message";
import { useRouter } from "expo-router";

export function usePonselAutentikasi() {
  const [sedangMemuat, setSedangMemuat] = useState(false);
  const penunjukArah = useRouter();

  const validasiNomorPonsel = (nomor) => {
    const ekspresiReguler = /^[0-9]{9,12}$/;
    return ekspresiReguler.test(nomor);
  };

  const tampilkanPesanToast = (jenis, pesanUtama, pesanTambahan) => {
    Toast.show({
      type: jenis,
      position: "top",
      text1: pesanUtama,
      text2: pesanTambahan,
    });
  };

  const tanganiLanjutkan = (nomorPonsel) => {
    if (!validasiNomorPonsel(nomorPonsel)) {
      tampilkanPesanToast(
        "error",
        "Nomor Tidak Valid",
        "Nomor ponsel harus 9-12 digit."
      );
      return;
    }

    setSedangMemuat(true);
    const nomorLengkap = `+62${nomorPonsel}`;

    auth()
      .signInWithPhoneNumber(nomorLengkap)
      .then((konfirmasi) => {
        setSedangMemuat(false);
        tampilkanPesanToast(
          "success",
          "OTP Terkirim",
          "Kode OTP telah dikirim."
        );
        penunjukArah.push({
          pathname: "/layarOTP",
          query: { verificationId: konfirmasi.verificationId },
        });
      })
      .catch((kesalahan) => {
        setSedangMemuat(false);
        let pesanKesalahan = "Gagal mengirim OTP. Periksa nomor ponsel.";

        if (kesalahan.code === "auth/too-many-requests") {
          pesanKesalahan = "Terlalu banyak permintaan. Coba lagi nanti.";
        } else if (kesalahan.code === "auth/network-request-failed") {
          pesanKesalahan = "Kesalahan jaringan. Periksa koneksi.";
        }

        tampilkanPesanToast("error", "Gagal", pesanKesalahan);
      });
  };

  return {
    sedangMemuat,
    tanganiLanjutkan,
  };
}
