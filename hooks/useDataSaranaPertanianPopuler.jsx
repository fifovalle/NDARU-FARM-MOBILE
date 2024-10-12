import { useState, useEffect } from "react";
import firestore from "@react-native-firebase/firestore";

export default function useDataSaranaPertanianPopuler() {
  const [dataSaranaPertanianPopuler, setDataSaranaPertanianPopuler] = useState(
    []
  );
  const [memuatSaranaPertanianPopuler, setMemuatSaranaPertanianPopuler] =
    useState(true);

  useEffect(() => {
    const tampilkanDataSaranaPertanianPopuler = async () => {
      try {
        const snapshot = await firestore()
          .collection("sarana_pertanian")
          .limit(4)
          .get();
        const daftarSaranaPertanianPopuler = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setDataSaranaPertanianPopuler(daftarSaranaPertanianPopuler);
      } catch (error) {
        console.error("Error fetching data berita: ", error);
      } finally {
        setMemuatSaranaPertanianPopuler(false);
      }
    };

    tampilkanDataSaranaPertanianPopuler();
  }, []);

  return { dataSaranaPertanianPopuler, memuatSaranaPertanianPopuler };
}
