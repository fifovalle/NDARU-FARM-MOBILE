import { useState, useEffect } from "react";
import firestore from "@react-native-firebase/firestore";

export default function useDataSemuaSaranaPertanianPopuler() {
  const [dataSaranaPertanianPopuler, setDataSaranaPertanianPopuler] = useState(
    []
  );
  const [
    memuatSemuaSaranaPertanianPopuler,
    setMemuatDataSaranaPertanianPopuler,
  ] = useState(true);

  useEffect(() => {
    const tampilkanSemuaDataSaranaPertanianPopuler = async () => {
      try {
        const snapshot = await firestore().collection("sarana_pertanian").get();
        const daftarSemuaSaranaPertanianPopuler = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setDataSaranaPertanianPopuler(daftarSemuaSaranaPertanianPopuler);
      } catch (error) {
        console.error("Error fetching data Sarana Pertanian: ", error);
      } finally {
        setMemuatDataSaranaPertanianPopuler(false);
      }
    };

    tampilkanSemuaDataSaranaPertanianPopuler();
  }, []);

  return { dataSaranaPertanianPopuler, memuatSemuaSaranaPertanianPopuler };
}
