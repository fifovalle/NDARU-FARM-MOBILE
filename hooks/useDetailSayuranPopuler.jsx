import { useState, useEffect } from "react";
import firestore from "@react-native-firebase/firestore";

const useDetailSayuranPopuler = (id) => {
  const [sayuranPopuler, setSayuranPopuler] = useState(null);
  const [statusStokPopuler, setStatusStokPopuler] = useState("");
  const [memuatSayuranPopuler, setMemuatSayuranPopuler] = useState(true);

  useEffect(() => {
    const tampilkanSayuranPopuler = async () => {
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
        }
      } catch (error) {
        console.error("Error fetching sayuran: ", error);
      } finally {
        setMemuatSayuranPopuler(false);
      }
    };

    tampilkanSayuranPopuler();
  }, [id]);

  return { sayuranPopuler, statusStokPopuler, memuatSayuranPopuler };
};

export default useDetailSayuranPopuler;
