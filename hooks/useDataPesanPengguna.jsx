import { useState, useEffect } from "react";
import firestore from "@react-native-firebase/firestore";
import auth from "@react-native-firebase/auth";

export default function useDataPesanPengguna() {
  const [dataPesanPengguna, setDataPesanPengguna] = useState([]);
  const [memuatPesanPengguna, setMemuatPesanPengguna] = useState(true);

  useEffect(() => {
    const tampilkanDataPesanPengguna = async () => {
      try {
        const penggunaSekarang = auth().currentUser.uid;
        const snapshot = await firestore().collection("pengguna").get();

        const daftarPesanPengguna = snapshot.docs
          .map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }))
          .filter((pesan) => pesan.id !== penggunaSekarang);

        setDataPesanPengguna(daftarPesanPengguna);
      } catch (error) {
        console.error("Error fetching data pengguna: ", error);
      } finally {
        setMemuatPesanPengguna(false);
      }
    };

    tampilkanDataPesanPengguna();
  }, []);

  return { dataPesanPengguna, memuatPesanPengguna };
}
