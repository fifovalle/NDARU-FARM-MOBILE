import { useState, useEffect } from "react";
import firestore from "@react-native-firebase/firestore";

const useDetailJasaPopuler = (id) => {
  const [jasaPopuler, setJasaPopuler] = useState(null);
  const [memuatJasaPopuler, setMemuatJasaPopuler] = useState(true);
  const [waktuPengambilanTerakhir, setWaktuPengambilanTerakhir] = useState(0);
  const pengambilanInterval = 5000;

  useEffect(() => {
    const tampilkanJasaPopuler = async () => {
      const waktuSekarang = Date.now();

      if (waktuSekarang - waktuPengambilanTerakhir > pengambilanInterval) {
        try {
          const doc = await firestore().collection("jasa").doc(id).get();
          if (doc.exists) {
            const data = doc.data();
            setJasaPopuler(data);
            setWaktuPengambilanTerakhir(waktuSekarang);
          }
        } catch (error) {
          console.error("Error fetching jasa: ", error);
        } finally {
          setMemuatJasaPopuler(false);
        }
      }
    };

    tampilkanJasaPopuler();

    const unsubscribe = firestore()
      .collection("jasa")
      .doc(id)
      .onSnapshot((doc) => {
        const waktuSekarang = Date.now();

        if (waktuSekarang - waktuPengambilanTerakhir > pengambilanInterval) {
          if (doc.exists) {
            const data = doc.data();
            setJasaPopuler(data);
            setWaktuPengambilanTerakhir(waktuSekarang);
          }
        }
      });

    return () => unsubscribe();
  }, [id, waktuPengambilanTerakhir]);

  return { jasaPopuler, memuatJasaPopuler };
};

export default useDetailJasaPopuler;
