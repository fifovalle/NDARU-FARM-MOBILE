import { useState, useEffect } from "react";
import firestore from "@react-native-firebase/firestore";

export default function useDataSemuaSayuranPopuler() {
  const [dataSayuran, setDataSayuran] = useState([]);
  const [memuat, setMemuat] = useState(true);

  useEffect(() => {
    const tampilkanDataSayuran = async () => {
      try {
        const snapshot = await firestore().collection("sayuran").get();
        const sayuranList = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setDataSayuran(sayuranList);
      } catch (error) {
        console.error("Error fetching data sayuran: ", error);
      } finally {
        setMemuat(false);
      }
    };

    tampilkanDataSayuran();
  }, []);

  return { dataSayuran, memuat };
}
