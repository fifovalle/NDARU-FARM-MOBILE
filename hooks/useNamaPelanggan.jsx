import { useState, useEffect } from "react";
import firestore from "@react-native-firebase/firestore";
import auth from "@react-native-firebase/auth";

export default function useNamaPelanggan() {
  const [namaPelanggan, setNamaPelanggan] = useState("");

  useEffect(() => {
    const fetchNamaPelanggan = async () => {
      const penggunaSaatIni = auth().currentUser;

      if (penggunaSaatIni) {
        try {
          const doc = await firestore()
            .collection("pengguna")
            .doc(penggunaSaatIni.uid)
            .get();
          if (doc.exists) {
            setNamaPelanggan(doc.data()?.Nama_Lengkap_Pengguna || "");
          }
        } catch (error) {
          console.error("Error fetching nama pelanggan: ", error);
        }
      }
    };

    fetchNamaPelanggan();
  }, []);

  return { namaPelanggan };
}
