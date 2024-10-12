import { useState, useEffect } from "react";
import firestore from "@react-native-firebase/firestore";

const useDetailBeritaPopuler = (id) => {
  const [beritaPopuler, setBeritaPopuler] = useState(null);
  const [memuatBeritaPopuler, setMemuatBeritaPopuler] = useState(true);

  useEffect(() => {
    const tampilkanBeritaPopuler = async () => {
      try {
        const doc = await firestore().collection("berita").doc(id).get();
        if (doc.exists) {
          const data = doc.data();
          setBeritaPopuler(data);
        }
      } catch (error) {
        console.error("Error fetching berita: ", error);
      } finally {
        setMemuatBeritaPopuler(false);
      }
    };

    tampilkanBeritaPopuler();
  }, [id]);

  return { beritaPopuler, memuatBeritaPopuler };
};

export default useDetailBeritaPopuler;
