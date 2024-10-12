import { useState, useEffect } from "react";
import firestore from "@react-native-firebase/firestore";

export default function useDataSemuaSayuranPopuler() {
  const [semuaDataSayuranPopuler, setSemuaDataSayuranPopuler] = useState([]);
  const [memuatSemuaSayuranPopuler, setMemuatDataSayuranPopuler] =
    useState(true);

  useEffect(() => {
    const tampilkanSemuaDataSayuranPopuler = async () => {
      try {
        const snapshot = await firestore().collection("sayuran").get();
        const daftarSemuaSayuranPopuler = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setSemuaDataSayuranPopuler(daftarSemuaSayuranPopuler);
      } catch (error) {
        console.error("Error fetching data sayuran: ", error);
      } finally {
        setMemuatDataSayuranPopuler(false);
      }
    };

    tampilkanSemuaDataSayuranPopuler();
  }, []);

  return { semuaDataSayuranPopuler, memuatSemuaSayuranPopuler };
}
