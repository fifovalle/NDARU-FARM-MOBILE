import { useState, useEffect } from "react";
import { useRouter } from "expo-router";
import firestore from "@react-native-firebase/firestore";
import auth from "@react-native-firebase/auth";
import Toast from "react-native-toast-message";

export default function useIdentitasPengguna(segeraBergulirKeAtas) {
  const pengarah = useRouter();
  const [memuat, setMemuat] = useState(false);
  const [namaLengkapPengguna, setNamaLengkapPengguna] = useState("");
  const [umurPengguna, setUmurPengguna] = useState("");
  const [nomorTeleponPengguna, setNomorTeleponPengguna] = useState("");
  const [jenisKelaminPengguna, setJenisKelaminPengguna] = useState("");

  const penggunaSaatIni = auth().currentUser;

  useEffect(() => {
    const ambilDataPengguna = async () => {
      if (penggunaSaatIni) {
        try {
          const doc = await firestore()
            .collection("pengguna")
            .doc(penggunaSaatIni.uid)
            .get();

          if (doc.exists) {
            const data = doc.data();
            setNamaLengkapPengguna(data.Nama_Lengkap_Pengguna || "");
            setUmurPengguna(data.Umur_Pengguna || "");
            setNomorTeleponPengguna(
              data.No_Telepon_Pengguna?.replace("+62", "") || ""
            );
            setJenisKelaminPengguna(data.Jenis_Kelamin_Pengguna || "");
          }
        } catch (error) {
          console.error("Gagal mengambil data pengguna:", error);
        }
      }
    };

    ambilDataPengguna();
  }, [penggunaSaatIni]);

  const validasiIdentitas = () => {
    let sah = true;

    if (!namaLengkapPengguna) {
      Toast.show({
        type: "error",
        text1: "Gagal",
        text2: "Nama harus diisi.",
        position: "top",
      });
      sah = false;
      segeraBergulirKeAtas.current.scrollTo({ y: 0, animated: true });
    }

    if (!umurPengguna) {
      Toast.show({
        type: "error",
        text1: "Gagal",
        text2: "Umur harus diisi.",
        position: "top",
      });
      sah = false;
      segeraBergulirKeAtas.current.scrollTo({ y: 0, animated: true });
    } else if (parseInt(umurPengguna) < 18) {
      Toast.show({
        type: "error",
        text1: "Gagal",
        text2: "Umur minimal harus 18 tahun.",
        position: "top",
      });
      sah = false;
      segeraBergulirKeAtas.current.scrollTo({ y: 0, animated: true });
    }

    if (!nomorTeleponPengguna) {
      Toast.show({
        type: "error",
        text1: "Gagal",
        text2: "Nomor Telepon harus diisi.",
        position: "top",
      });
      sah = false;
      segeraBergulirKeAtas.current.scrollTo({ y: 0, animated: true });
    }

    if (!jenisKelaminPengguna) {
      Toast.show({
        type: "error",
        text1: "Gagal",
        text2: "Jenis Kelamin harus diisi.",
        position: "top",
      });
      sah = false;
      segeraBergulirKeAtas.current.scrollTo({ y: 0, animated: true });
    }

    return sah;
  };

  const simpanIdentitas = async () => {
    if (!penggunaSaatIni || !validasiIdentitas()) return;

    setMemuat(true);
    try {
      await firestore()
        .collection("pengguna")
        .doc(penggunaSaatIni.uid)
        .set({
          Nama_Lengkap_Pengguna: namaLengkapPengguna,
          Umur_Pengguna: umurPengguna,
          No_Telepon_Pengguna: "+62" + nomorTeleponPengguna,
          Jenis_Kelamin_Pengguna: jenisKelaminPengguna,
        });

      Toast.show({
        type: "success",
        text1: "Berhasil",
        text2: "Data pengguna berhasil disimpan.",
        position: "top",
      });

      pengarah.push("/beranda");
    } catch (error) {
      Toast.show({
        type: "error",
        text1: "Error",
        text2: "Gagal menyimpan data pengguna.",
        position: "top",
      });
    } finally {
      setMemuat(false);
    }
  };

  return {
    namaLengkapPengguna,
    setNamaLengkapPengguna,
    umurPengguna,
    setUmurPengguna,
    nomorTeleponPengguna,
    setNomorTeleponPengguna,
    jenisKelaminPengguna,
    setJenisKelaminPengguna,
    simpanIdentitas,
    memuat,
  };
}
