import { useState, useEffect } from "react";
import firestore from "@react-native-firebase/firestore";

const useDetailSaranaPertanianPopuler = (id) => {
  const [saranaPertanianPopuler, setSaranaPertanianPopuler] = useState(null);
  const [memuatSaranaPertanianPopuler, setMemuatSaranaPertanianPopuler] =
    useState(true);

  useEffect(() => {
    const tampilkanSaranaPertanianPopuler = async () => {
      try {
        const doc = await firestore()
          .collection("sarana_pertanian")
          .doc(id)
          .get();
        if (doc.exists) {
          const data = doc.data();
          setSaranaPertanianPopuler(data);
        }
      } catch (error) {
        console.error("Error fetching sarana pertanian : ", error);
      } finally {
        setMemuatSaranaPertanianPopuler(false);
      }
    };

    tampilkanSaranaPertanianPopuler();
  }, [id]);

  return { saranaPertanianPopuler, memuatSaranaPertanianPopuler };
};

export default useDetailSaranaPertanianPopuler;
