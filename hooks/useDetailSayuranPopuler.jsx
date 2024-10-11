import { useState, useEffect } from "react";
import firestore from "@react-native-firebase/firestore";

const useDetailSayuranPopuler = (id) => {
  const [sayuranPopuler, setSayuranPopuler] = useState(null);
  const [statusStokPopuler, setStatusStokPopuler] = useState("");
  const [memuatSayuranPopuler, setMemuatSayuranPopuler] = useState(true);
  const [waktuPengambilanTerakhir, setWaktuPengambilanTerakhir] = useState(0);
  const pengambilanInterval = 5000; // 5 detik

  useEffect(() => {
    const tampilkanSayuranPopuler = async () => {
      const waktuSekarang = Date.now();

      if (waktuSekarang - waktuPengambilanTerakhir > pengambilanInterval) {
        try {
          const doc = await firestore().collection("sayuran").doc(id).get();
          if (doc.exists) {
            const data = doc.data();
            setSayuranPopuler(data);
            if (data.Stok < 5) {
              setStatusStokPopuler("Sayuran ini hampir habis buruan beli!");
            } else {
              setStatusStokPopuler("");
            }
            setWaktuPengambilanTerakhir(waktuSekarang);
          }
        } catch (error) {
          console.error("Error fetching sayuran: ", error);
        } finally {
          setMemuatSayuranPopuler(false);
        }
      }
    };

    tampilkanSayuranPopuler();

    const unsubscribe = firestore()
      .collection("sayuran")
      .doc(id)
      .onSnapshot((doc) => {
        const waktuSekarang = Date.now();

        if (waktuSekarang - waktuPengambilanTerakhir > pengambilanInterval) {
          if (doc.exists) {
            const data = doc.data();
            setSayuranPopuler(data);
            if (data.Stok < 5) {
              setStatusStokPopuler("Sayuran ini hampir habis buruan beli!");
            } else {
              setStatusStokPopuler("");
            }
            setWaktuPengambilanTerakhir(waktuSekarang);
          }
        }
      });

    return () => unsubscribe();
  }, [id, waktuPengambilanTerakhir]);

  return { sayuranPopuler, statusStokPopuler, memuatSayuranPopuler };
};

export default useDetailSayuranPopuler;
