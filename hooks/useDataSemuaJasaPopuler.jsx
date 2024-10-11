import { useState, useEffect } from "react";
import firestore from "@react-native-firebase/firestore";

export default function useDataSemuaJasaPopuler() {
  const [semuaDataJasaPopuler, setSemuaDataJasaPopuler] = useState([]);
  const [memuatSemuaJasaPopuler, setMemuatDataJasaPopuler] = useState(true);
  const [waktuPengambilanTerakhir, setWaktuPengambilanTerakhir] = useState(0);
  const pengambilanInterval = 5000;

  useEffect(() => {
    const tampilkanSemuaDataJasaPopuler = async () => {
      const waktuSekarang = Date.now();

      if (waktuSekarang - waktuPengambilanTerakhir > pengambilanInterval) {
        try {
          const snapshot = await firestore().collection("jasa").get();
          const daftarSemuaJasaPopuler = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          setSemuaDataJasaPopuler(daftarSemuaJasaPopuler);
          setWaktuPengambilanTerakhir(waktuSekarang);
        } catch (error) {
          console.error("Error fetching data jasa: ", error);
        } finally {
          setMemuatDataJasaPopuler(false);
        }
      }
    };

    const unsubscribe = firestore()
      .collection("jasa")
      .onSnapshot((snapshot) => {
        const waktuSekarang = Date.now();

        if (waktuSekarang - waktuPengambilanTerakhir > pengambilanInterval) {
          const daftarSemuaJasaPopuler = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          setSemuaDataJasaPopuler(daftarSemuaJasaPopuler);
          setWaktuPengambilanTerakhir(waktuSekarang);
        }
      });

    tampilkanSemuaDataJasaPopuler();

    return () => unsubscribe();
  }, [waktuPengambilanTerakhir]);

  return { semuaDataJasaPopuler, memuatSemuaJasaPopuler };
}
