import { useState, useEffect } from "react";
import firestore from "@react-native-firebase/firestore";

const useDetailJasaPopuler = (id) => {
  const [jasaPopuler, setJasaPopuler] = useState(null);
  const [memuatJasaPopuler, setMemuatJasaPopuler] = useState(true);

  useEffect(() => {
    const tampilkanJasaPopuler = async () => {
      try {
        const doc = await firestore().collection("jasa").doc(id).get();
        if (doc.exists) {
          const data = doc.data();
          setJasaPopuler(data);
        }
      } catch (error) {
        console.error("Error fetching jasa: ", error);
      } finally {
        setMemuatJasaPopuler(false);
      }
    };

    tampilkanJasaPopuler();
  }, [id]);

  return { jasaPopuler, memuatJasaPopuler };
};

export default useDetailJasaPopuler;
