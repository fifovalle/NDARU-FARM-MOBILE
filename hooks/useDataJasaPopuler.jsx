import { useState, useEffect } from "react";
import firestore from "@react-native-firebase/firestore";

export default function useDataJasaPopuler() {
  const [dataJasaPopuler, setDataJasaPopuler] = useState([]);
  const [memuatJasaPopuler, setMemuatJasaPopuler] = useState(true);
  const [waktuPengambilanTerakhir, setWaktuPengambilanTerakhir] = useState(0);
  const pengambilanInterval = 5000;
  useEffect(() => {
    const tampilkanDataJasaPopuler = async () => {
      const waktuSekarang = Date.now();

      if (waktuSekarang - waktuPengambilanTerakhir > pengambilanInterval) {
        try {
          const snapshot = await firestore().collection("jasa").limit(4).get();
          const daftarJasaPopuler = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          setDataJasaPopuler(daftarJasaPopuler);
          setWaktuPengambilanTerakhir(waktuSekarang);
        } catch (error) {
          console.error("Error fetching data jasa: ", error);
        } finally {
          setMemuatJasaPopuler(false);
        }
      }
    };

    const unsubscribe = firestore()
      .collection("jasa")
      .limit(4)
      .onSnapshot((snapshot) => {
        const waktuSekarang = Date.now();

        if (waktuSekarang - waktuPengambilanTerakhir > pengambilanInterval) {
          const daftarJasaPopuler = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          setDataJasaPopuler(daftarJasaPopuler);
          setWaktuPengambilanTerakhir(waktuSekarang);
        }
      });

    tampilkanDataJasaPopuler();

    return () => unsubscribe();
  }, [waktuPengambilanTerakhir]);

  return { dataJasaPopuler, memuatJasaPopuler };
}
