import { useState, useEffect } from "react";
import firestore from "@react-native-firebase/firestore";

export default function useDataSemuaBeritaPopuler() {
  const [semuaDataBeritaPopuler, setSemuaDataBeritaPopuler] = useState([]);
  const [memuatSemuaBeritaPopuler, setMemuatDataBeritaPopuler] = useState(true);
  const [waktuPengambilanTerakhir, setWaktuPengambilanTerakhir] = useState(0);
  const pengambilanInterval = 5000;

  useEffect(() => {
    const tampilkanSemuaDataBeritaPopuler = async () => {
      const waktuSekarang = Date.now();

      if (waktuSekarang - waktuPengambilanTerakhir > pengambilanInterval) {
        try {
          const snapshot = await firestore().collection("berita").get();
          const daftarSemuaBeritaPopuler = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          setSemuaDataBeritaPopuler(daftarSemuaBeritaPopuler);
          setWaktuPengambilanTerakhir(waktuSekarang);
        } catch (error) {
          console.error("Error fetching data berita: ", error);
        } finally {
          setMemuatDataBeritaPopuler(false);
        }
      }
    };

    const unsubscribe = firestore()
      .collection("berita")
      .onSnapshot((snapshot) => {
        const waktuSekarang = Date.now();

        if (waktuSekarang - waktuPengambilanTerakhir > pengambilanInterval) {
          const daftarSemuaBeritaPopuler = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          setSemuaDataBeritaPopuler(daftarSemuaBeritaPopuler);
          setWaktuPengambilanTerakhir(waktuSekarang);
        }
      });

    tampilkanSemuaDataBeritaPopuler();

    return () => unsubscribe();
  }, [waktuPengambilanTerakhir]);

  return { semuaDataBeritaPopuler, memuatSemuaBeritaPopuler };
}
