import { useState, useEffect } from "react";
import firestore from "@react-native-firebase/firestore";

export default function useDataSemuaJasaPopuler() {
  const [semuaDataJasaPopuler, setSemuaDataJasaPopuler] = useState([]);
  const [memuatSemuaJasaPopuler, setMemuatDataJasaPopuler] = useState(true);

  useEffect(() => {
    const tampilkanSemuaDataJasaPopuler = async () => {
      try {
        const snapshot = await firestore().collection("jasa").get();
        const daftarSemuaJasaPopuler = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setSemuaDataJasaPopuler(daftarSemuaJasaPopuler);
      } catch (error) {
        console.error("Error fetching data jasa: ", error);
      } finally {
        setMemuatDataJasaPopuler(false);
      }
    };

    tampilkanSemuaDataJasaPopuler();
  }, []);

  return { semuaDataJasaPopuler, memuatSemuaJasaPopuler };
}
