import { useState, useEffect } from "react";
import firestore from "@react-native-firebase/firestore";

export default function useDataBeritaPopuler() {
  const [dataBeritaPopuler, setDataBeritaPopuler] = useState([]);
  const [memuatBeritaPopuler, setMemuatBeritaPopuler] = useState(true);
  const [waktuPengambilanTerakhir, setWaktuPengambilanTerakhir] = useState(0);
  const pengambilanInterval = 5000;

  useEffect(() => {
    const tampilkanDataBeritaPopuler = async () => {
      const waktuSekarang = Date.now();

      if (waktuSekarang - waktuPengambilanTerakhir > pengambilanInterval) {
        try {
          const snapshot = await firestore()
            .collection("berita")
            .limit(4)
            .get();
          const daftarBeritaPopuler = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          setDataBeritaPopuler(daftarBeritaPopuler);
          setWaktuPengambilanTerakhir(waktuSekarang);
        } catch (error) {
          console.error("Error fetching data berita: ", error);
        } finally {
          setMemuatBeritaPopuler(false);
        }
      }
    };

    const unsubscribe = firestore()
      .collection("berita")
      .limit(4)
      .onSnapshot((snapshot) => {
        const waktuSekarang = Date.now();

        if (waktuSekarang - waktuPengambilanTerakhir > pengambilanInterval) {
          const daftarBeritaPopuler = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          setDataBeritaPopuler(daftarBeritaPopuler);
          setWaktuPengambilanTerakhir(waktuSekarang);
        }
      });

    tampilkanDataBeritaPopuler();

    return () => unsubscribe();
  }, [waktuPengambilanTerakhir]);

  return { dataBeritaPopuler, memuatBeritaPopuler };
}
