import { useState, useEffect } from "react";
import firestore from "@react-native-firebase/firestore";
import auth from "@react-native-firebase/auth";

const usePeriksaPengguna = () => {
  const [koleksiTidakKosong, setKoleksiTidakKosong] = useState(false);
  const [memuat, setMemuat] = useState(true);

  useEffect(() => {
    const periksaPengguna = async () => {
      setMemuat(true);
      try {
        const idPengguna = auth().currentUser.uid;
        const penggunaDoc = await firestore()
          .collection("pengguna")
          .doc(idPengguna)
          .get();
        setKoleksiTidakKosong(penggunaDoc.exists);
      } catch (error) {
      } finally {
        setMemuat(false);
      }
    };

    periksaPengguna();
  }, []);

  return {
    koleksiTidakKosong,
    memuat,
  };
};

export default usePeriksaPengguna;
