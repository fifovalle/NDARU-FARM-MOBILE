import { useState, useEffect } from "react";
import firestore from "@react-native-firebase/firestore";

export default function useDataBeritaPopuler() {
  const [dataBeritaPopuler, setDataBeritaPopuler] = useState([]);
  const [memuatBeritaPopuler, setMemuatBeritaPopuler] = useState(true);

  useEffect(() => {
    const tampilkanDataBeritaPopuler = async () => {
      try {
        const snapshot = await firestore().collection("berita").limit(4).get();
        const daftarBeritaPopuler = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setDataBeritaPopuler(daftarBeritaPopuler);
      } catch (error) {
        console.error("Error fetching data berita: ", error);
      } finally {
        setMemuatBeritaPopuler(false);
      }
    };

    tampilkanDataBeritaPopuler();
  }, []);

  return { dataBeritaPopuler, memuatBeritaPopuler };
}
