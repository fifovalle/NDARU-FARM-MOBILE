import { useState, useEffect } from "react";
import firestore from "@react-native-firebase/firestore";

export default function useDataSayuranPopuler() {
  const [dataSayuranPopuler, setDataSayuran] = useState([]);
  const [memuatSayuranPopuler, setMemuatSayuranPopuler] = useState(true);

  useEffect(() => {
    const tampilkanDataSayuranPopuler = async () => {
      try {
        const snapshot = await firestore().collection("sayuran").limit(4).get();
        const daftarSayuranPopuler = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setDataSayuran(daftarSayuranPopuler);
      } catch (error) {
        console.error("Error fetching data sayuran: ", error);
      } finally {
        setMemuatSayuranPopuler(false);
      }
    };

    tampilkanDataSayuranPopuler();
  }, []);

  return { dataSayuranPopuler, memuatSayuranPopuler };
}
