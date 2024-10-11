import { useState, useEffect } from "react";
import firestore from "@react-native-firebase/firestore";

export default function useDataSemuaSayuranPopuler() {
  const [semuaDataSayuranPopuler, setSemuaDataSayuranPopuler] = useState([]);
  const [memuatSemuaSayuranPopuler, setMemuatDataSayuranPopuler] =
    useState(true);
  const [waktuPengambilanTerakhir, setWaktuPengambilanTerakhir] = useState(0);
  const pengambilanInterval = 5000;

  useEffect(() => {
    const tampilkanSemuaDataSayuranPopuler = async () => {
      const waktuSekarang = Date.now();

      if (waktuSekarang - waktuPengambilanTerakhir > pengambilanInterval) {
        try {
          const snapshot = await firestore().collection("sayuran").get();
          const daftarSemuaSayuranPopuler = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          setSemuaDataSayuranPopuler(daftarSemuaSayuranPopuler);
          setWaktuPengambilanTerakhir(waktuSekarang);
        } catch (error) {
          console.error("Error fetching data sayuran: ", error);
        } finally {
          setMemuatDataSayuranPopuler(false);
        }
      }
    };

    const unsubscribe = firestore()
      .collection("sayuran")
      .onSnapshot((snapshot) => {
        const waktuSekarang = Date.now();

        if (waktuSekarang - waktuPengambilanTerakhir > pengambilanInterval) {
          const daftarSemuaSayuranPopuler = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          setSemuaDataSayuranPopuler(daftarSemuaSayuranPopuler);
          setWaktuPengambilanTerakhir(waktuSekarang);
        }
      });

    tampilkanSemuaDataSayuranPopuler();

    return () => unsubscribe();
  }, [waktuPengambilanTerakhir]);

  return { semuaDataSayuranPopuler, memuatSemuaSayuranPopuler };
}
