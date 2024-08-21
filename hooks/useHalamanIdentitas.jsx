import { useState, useEffect } from "react";
import firestore from "@react-native-firebase/firestore";
import auth from "@react-native-firebase/auth";

const useDataPengguna = () => {
  const [namaLengkap, setNamaLengkap] = useState("");
  const [umur, setUmur] = useState("");
  const [noTelepon, setNoTelepon] = useState("");
  const [jenisKelamin, setJenisKelamin] = useState("");
  const [memuat, setMemuat] = useState(false);

  useEffect(() => {
    const ambilDataPengguna = async () => {
      setMemuat(true);
      try {
        const idPengguna = auth().currentUser.uid;
        const dataPengguna = await firestore()
          .collection("pengguna")
          .doc(idPengguna)
          .get();

        if (dataPengguna.exists) {
          const {
            Nama_Lengkap_Pengguna,
            Umur_Pengguna,
            Jenis_Kelamin_Pengguna,
            No_Telepon_Pengguna,
          } = dataPengguna.data();
          setNamaLengkap(Nama_Lengkap_Pengguna || "");
          setUmur(Umur_Pengguna || "");
          setJenisKelamin(Jenis_Kelamin_Pengguna || "");
          setNoTelepon(No_Telepon_Pengguna || "");
        }
      } catch (error) {
        console.error("Gagal mengambil data pengguna:", error);
      } finally {
        setMemuat(false);
      }
    };

    ambilDataPengguna();
  }, []);

  const formatNomorTelepon = (nomor) => {
    let formatted = nomor.replace(/\D/g, "");

    if (!formatted.startsWith("62")) {
      formatted = "62" + formatted;
    }

    return formatted;
  };

  const validasiNomorTelepon = (nomor) => {
    const formatted = formatNomorTelepon(nomor);
    const validFormat = /^62\d{10,13}$/;

    return validFormat.test(formatted);
  };

  const simpanDataPengguna = async (
    namaLengkap,
    umur,
    noTelepon,
    jenisKelamin
  ) => {
    try {
      if (!namaLengkap || !umur || !noTelepon || !jenisKelamin) {
        throw new Error("Formulir tidak lengkap!");
      }

      if (isNaN(umur) || parseInt(umur) < 18) {
        throw new Error(
          "Umur tidak valid! Umur harus berupa angka dan minimal 18 tahun."
        );
      }

      if (!validasiNomorTelepon(noTelepon)) {
        throw new Error(
          "Nomor telepon tidak valid! Pastikan nomor telepon menggunakan format yang benar."
        );
      }

      const formattedNoTelepon = formatNomorTelepon(noTelepon);

      setMemuat(true);
      const idPengguna = auth().currentUser.uid;
      await firestore().collection("pengguna").doc(idPengguna).set({
        Nama_Lengkap_Pengguna: namaLengkap,
        Umur_Pengguna: umur,
        No_Telepon_Pengguna: formattedNoTelepon,
        Jenis_Kelamin_Pengguna: jenisKelamin,
      });
    } catch (error) {
      console.error("Gagal menyimpan data pengguna:", error);
      throw error;
    } finally {
      setMemuat(false);
    }
  };

  return {
    namaLengkap,
    setNamaLengkap,
    umur,
    setUmur,
    noTelepon,
    setNoTelepon,
    jenisKelamin,
    setJenisKelamin,
    memuat,
    simpanDataPengguna,
  };
};

export default useDataPengguna;
