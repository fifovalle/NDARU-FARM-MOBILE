import { useState, useEffect } from "react";
import firestore from "@react-native-firebase/firestore";

const useDetailSaranaPertanianPopuler = (id) => {
  const [saranaPertanianPopuler, setSaranaPertanianPopuler] = useState(null);
  const [memuatSaranaPertanianPopuler, setMemuatSaranaPertanianPopuler] =
    useState(true);
  const [waktuPengambilanTerakhir, setWaktuPengambilanTerakhir] = useState(0);
  const pengambilanInterval = 5000;

  useEffect(() => {
    const tampilkanSaranaPertanianPopuler = async () => {
      const waktuSekarang = Date.now();

      if (waktuSekarang - waktuPengambilanTerakhir > pengambilanInterval) {
        try {
          const doc = await firestore()
            .collection("sarana_pertanian")
            .doc(id)
            .get();
          if (doc.exists) {
            const data = doc.data();
            setSaranaPertanianPopuler(data);
            setWaktuPengambilanTerakhir(waktuSekarang);
          }
        } catch (error) {
          console.error("Error fetching sarana pertanian: ", error);
        } finally {
          setMemuatSaranaPertanianPopuler(false);
        }
      }
    };

    tampilkanSaranaPertanianPopuler();

    const unsubscribe = firestore()
      .collection("sarana_pertanian")
      .doc(id)
      .onSnapshot((doc) => {
        const waktuSekarang = Date.now();

        if (waktuSekarang - waktuPengambilanTerakhir > pengambilanInterval) {
          if (doc.exists) {
            const data = doc.data();
            setSaranaPertanianPopuler(data);
            setWaktuPengambilanTerakhir(waktuSekarang);
          }
        }
      });

    return () => unsubscribe();
  }, [id, waktuPengambilanTerakhir]);

  return { saranaPertanianPopuler, memuatSaranaPertanianPopuler };
};

export default useDetailSaranaPertanianPopuler;
