import { useState, useEffect } from "react";
import firestore from "@react-native-firebase/firestore";

const useDataPesanMasuk = (id) => {
  const [dataPengguna, setDataPengguna] = useState(null);
  const [memuatPengguna, setMemuatPengguna] = useState(true);

  useEffect(() => {
    const ambilDataPengguna = async () => {
      try {
        const doc = await firestore().collection("pengguna").doc(id).get();
        if (doc.exists) {
          setDataPengguna(doc.data());
        } else {
          console.log("Pengguna tidak ditemukan");
        }
      } catch (error) {
        console.error("Error fetching pengguna: ", error);
      } finally {
        setMemuatPengguna(false);
      }
    };

    if (id) {
      ambilDataPengguna();
    }
  }, [id]);

  return { dataPengguna, memuatPengguna };
};

export default useDataPesanMasuk;
