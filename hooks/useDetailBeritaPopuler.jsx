import { useState, useEffect } from "react";
import firestore from "@react-native-firebase/firestore";

const useDetailBeritaPopuler = (id) => {
  const [beritaPopuler, setBeritaPopuler] = useState(null);
  const [memuatBeritaPopuler, setMemuatBeritaPopuler] = useState(true);
  const [waktuPengambilanTerakhir, setWaktuPengambilanTerakhir] = useState(0);
  const pengambilanInterval = 5000;

  useEffect(() => {
    const tampilkanBeritaPopuler = async () => {
      const waktuSekarang = Date.now();

      if (waktuSekarang - waktuPengambilanTerakhir > pengambilanInterval) {
        try {
          const doc = await firestore().collection("berita").doc(id).get();
          if (doc.exists) {
            const data = doc.data();
            setBeritaPopuler(data);
            setWaktuPengambilanTerakhir(waktuSekarang);
          }
        } catch (error) {
          console.error("Error fetching berita: ", error);
        } finally {
          setMemuatBeritaPopuler(false);
        }
      }
    };

    tampilkanBeritaPopuler();

    const unsubscribe = firestore()
      .collection("berita")
      .doc(id)
      .onSnapshot((doc) => {
        const waktuSekarang = Date.now();

        if (waktuSekarang - waktuPengambilanTerakhir > pengambilanInterval) {
          if (doc.exists) {
            const data = doc.data();
            setBeritaPopuler(data);
            setWaktuPengambilanTerakhir(waktuSekarang);
          }
        }
      });

    return () => unsubscribe();
  }, [id, waktuPengambilanTerakhir]);

  return { beritaPopuler, memuatBeritaPopuler };
};

export default useDetailBeritaPopuler;
