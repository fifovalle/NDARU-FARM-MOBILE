import { useState, useEffect } from "react";
import firestore from "@react-native-firebase/firestore";

export default function useDataSayuranPopuler() {
  const [dataSayuranPopuler, setDataSayuran] = useState([]);
  const [memuatSayuranPopuler, setMemuatSayuranPopuler] = useState(true);
  const [waktuPengambilanTerakhir, setWaktuPengambilanTerakhir] = useState(0);
  const pengambilanInterval = 5000;

  useEffect(() => {
    const tampilkanDataSayuranPopuler = async () => {
      const waktuSekarang = Date.now();

      if (waktuSekarang - waktuPengambilanTerakhir > pengambilanInterval) {
        try {
          const snapshot = await firestore()
            .collection("sayuran")
            .limit(4)
            .get();
          const daftarSayuranPopuler = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          setDataSayuran(daftarSayuranPopuler);
          setWaktuPengambilanTerakhir(waktuSekarang);
        } catch (error) {
          console.error("Error fetching data sayuran: ", error);
        } finally {
          setMemuatSayuranPopuler(false);
        }
      }
    };

    const unsubscribe = firestore()
      .collection("sayuran")
      .limit(4)
      .onSnapshot((snapshot) => {
        const waktuSekarang = Date.now();

        if (waktuSekarang - waktuPengambilanTerakhir > pengambilanInterval) {
          const daftarSayuranPopuler = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          setDataSayuran(daftarSayuranPopuler);
          setWaktuPengambilanTerakhir(waktuSekarang);
        }
      });

    tampilkanDataSayuranPopuler();

    return () => unsubscribe();
  }, [waktuPengambilanTerakhir]);

  return { dataSayuranPopuler, memuatSayuranPopuler };
}
