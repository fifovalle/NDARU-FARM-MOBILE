import { useState, useEffect } from "react";
import firestore from "@react-native-firebase/firestore";

export default function useDataJasaPopuler() {
  const [dataJasaPopuler, setDataJasaPopuler] = useState([]);
  const [memuatJasaPopuler, setMemuatJasaPopuler] = useState(true);

  useEffect(() => {
    const tampilkanDataJasaPopuler = async () => {
      try {
        const snapshot = await firestore().collection("jasa").limit(4).get();
        const daftarJasaPopuler = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setDataJasaPopuler(daftarJasaPopuler);
      } catch (error) {
        console.error("Error fetching data jasa: ", error);
      } finally {
        setMemuatJasaPopuler(false);
      }
    };

    tampilkanDataJasaPopuler();
  }, []);

  return { dataJasaPopuler, memuatJasaPopuler };
}
