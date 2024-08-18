import { useState, useEffect } from "react";
import firestore from "@react-native-firebase/firestore";
import auth from "@react-native-firebase/auth";

const useDataPengguna = () => {
  const [namaLengkap, setNamaLengkap] = useState("");
  const [umur, setUmur] = useState("");
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
          } = dataPengguna.data();
          setNamaLengkap(Nama_Lengkap_Pengguna || "");
          setUmur(Umur_Pengguna || "");
          setJenisKelamin(Jenis_Kelamin_Pengguna || "");
        } else {
        }
      } catch (error) {
      } finally {
        setMemuat(false);
      }
    };

    ambilDataPengguna();
  }, []);

  const simpanDataPengguna = async (namaLengkap, umur, jenisKelamin) => {
    try {
      if (!namaLengkap || !umur || !jenisKelamin) {
        throw new Error("Formulir tidak lengkap!");
      }

      if (isNaN(umur) || parseInt(umur) < 18) {
        throw new Error(
          "Umur tidak valid! Umur harus berupa angka dan minimal 18 tahun."
        );
      }

      setMemuat(true);
      const idPengguna = auth().currentUser.uid;
      await firestore().collection("pengguna").doc(idPengguna).set({
        Nama_Lengkap_Pengguna: namaLengkap,
        Umur_Pengguna: umur,
        Jenis_Kelamin_Pengguna: jenisKelamin,
      });
    } catch (error) {
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
    jenisKelamin,
    setJenisKelamin,
    memuat,
    simpanDataPengguna,
  };
};

export default useDataPengguna;
