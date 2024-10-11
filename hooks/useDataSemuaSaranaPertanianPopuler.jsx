import { useState, useEffect } from "react";
import firestore from "@react-native-firebase/firestore";

export default function useDataSemuaSaranaPertanianPopuler() {
  const [dataSaranaPertanianPopuler, setDataSaranaPertanianPopuler] = useState(
    []
  );
  const [
    memuatSemuaSaranaPertanianPopuler,
    setMemuatDataSaranaPertanianPopuler,
  ] = useState(true);
  const [waktuPengambilanTerakhir, setWaktuPengambilanTerakhir] = useState(0);
  const pengambilanInterval = 5000;

  useEffect(() => {
    const tampilkanSemuaDataSaranaPertanianPopuler = async () => {
      const waktuSekarang = Date.now();

      if (waktuSekarang - waktuPengambilanTerakhir > pengambilanInterval) {
        try {
          const snapshot = await firestore()
            .collection("sarana_pertanian")
            .get();
          const daftarSemuaSaranaPertanianPopuler = snapshot.docs.map(
            (doc) => ({
              id: doc.id,
              ...doc.data(),
            })
          );
          setDataSaranaPertanianPopuler(daftarSemuaSaranaPertanianPopuler);
          setWaktuPengambilanTerakhir(waktuSekarang);
        } catch (error) {
          console.error("Error fetching data Sarana Pertanian: ", error);
        } finally {
          setMemuatDataSaranaPertanianPopuler(false);
        }
      }
    };

    const unsubscribe = firestore()
      .collection("sarana_pertanian")
      .onSnapshot((snapshot) => {
        const waktuSekarang = Date.now();

        if (waktuSekarang - waktuPengambilanTerakhir > pengambilanInterval) {
          const daftarSemuaSaranaPertanianPopuler = snapshot.docs.map(
            (doc) => ({
              id: doc.id,
              ...doc.data(),
            })
          );
          setDataSaranaPertanianPopuler(daftarSemuaSaranaPertanianPopuler);
          setWaktuPengambilanTerakhir(waktuSekarang);
        }
      });

    tampilkanSemuaDataSaranaPertanianPopuler();

    return () => unsubscribe();
  }, [waktuPengambilanTerakhir]);

  return { dataSaranaPertanianPopuler, memuatSemuaSaranaPertanianPopuler };
}
