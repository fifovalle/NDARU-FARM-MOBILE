import { useState, useEffect } from "react";
import firestore from "@react-native-firebase/firestore";

export default function useDataSemuaBeritaPopuler() {
  const [semuaDataBeritaPopuler, setSemuaDataBeritaPopuler] = useState([]);
  const [memuatSemuaBeritaPopuler, setMemuatDataBeritaPopuler] = useState(true);

  useEffect(() => {
    const tampilkanSemuaDataBeritaPopuler = async () => {
      try {
        const snapshot = await firestore().collection("berita").get();
        const daftarSemuaBeritaPopuler = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setSemuaDataBeritaPopuler(daftarSemuaBeritaPopuler);
      } catch (error) {
        console.error("Error fetching data berita: ", error);
      } finally {
        setMemuatDataBeritaPopuler(false);
      }
    };

    tampilkanSemuaDataBeritaPopuler();
  }, []);

  return { semuaDataBeritaPopuler, memuatSemuaBeritaPopuler };
}
