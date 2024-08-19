import firestore from "@react-native-firebase/firestore";
import { useEffect, useState } from "react";

export default function useHalamanPesan() {
  const [dataPengguna, setDataPengguna] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const snapshot = await firestore().collection("pengguna").get();
        const penggunaData = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setDataPengguna(penggunaData);
      } catch (error) {}
    };

    fetchData();
  }, []);

  return {
    dataPengguna,
  };
}
