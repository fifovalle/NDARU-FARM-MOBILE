import { useState, useEffect } from "react";
import firestore from "@react-native-firebase/firestore";

export default function useDataSaranaPertanianPopuler() {
  const [dataSaranaPertanianPopuler, setDataSaranaPertanianPopuler] = useState(
    []
  );
  const [memuatSaranaPertanianPopuler, setMemuatSaranaPertanianPopuler] =
    useState(true);
  const [waktuPengambilanTerakhir, setWaktuPengambilanTerakhir] = useState(0);
  const pengambilanInterval = 5000;

  useEffect(() => {
    const tampilkanDataSaranaPertanianPopuler = async () => {
      const waktuSekarang = Date.now();

      if (waktuSekarang - waktuPengambilanTerakhir > pengambilanInterval) {
        try {
          const snapshot = await firestore()
            .collection("sarana_pertanian")
            .limit(4)
            .get();
          const daftarSaranaPertanianPopuler = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          setDataSaranaPertanianPopuler(daftarSaranaPertanianPopuler);
          setWaktuPengambilanTerakhir(waktuSekarang);
        } catch (error) {
          console.error("Error fetching data sarana pertanian: ", error);
        } finally {
          setMemuatSaranaPertanianPopuler(false);
        }
      }
    };

    const unsubscribe = firestore()
      .collection("sarana_pertanian")
      .limit(4)
      .onSnapshot((snapshot) => {
        const waktuSekarang = Date.now();

        if (waktuSekarang - waktuPengambilanTerakhir > pengambilanInterval) {
          const daftarSaranaPertanianPopuler = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          setDataSaranaPertanianPopuler(daftarSaranaPertanianPopuler);
          setWaktuPengambilanTerakhir(waktuSekarang);
        }
      });

    tampilkanDataSaranaPertanianPopuler();

    return () => unsubscribe();
  }, [waktuPengambilanTerakhir]);

  return { dataSaranaPertanianPopuler, memuatSaranaPertanianPopuler };
}
