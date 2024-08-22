import { useState, useEffect } from "react";
import firestore from "@react-native-firebase/firestore";

const useDetailSayuranPopuler = (id) => {
  const [sayuran, setSayuran] = useState(null);
  const [statusStok, setStatusStok] = useState("");
  const [memuat, setMemuat] = useState(true);

  useEffect(() => {
    const tampilkanSayuranPopuler = async () => {
      try {
        const doc = await firestore().collection("sayuran").doc(id).get();
        if (doc.exists) {
          const data = doc.data();
          setSayuran(data);
          if (data.Stok_Sayuran < 5) {
            setStatusStok("Sayuran ini hampir habis buruan beli!");
          } else {
            setStatusStok("");
          }
        }
      } catch (error) {
        console.error("Error fetching sayuran: ", error);
      } finally {
        setMemuat(false);
      }
    };

    tampilkanSayuranPopuler();
  }, [id]);

  return { sayuran, statusStok, memuat };
};

export default useDetailSayuranPopuler;
