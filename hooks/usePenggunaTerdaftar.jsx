import { useState, useEffect } from "react";
import auth from "@react-native-firebase/auth";
import firestore from "@react-native-firebase/firestore";

export default function usePenggunaTerdaftar() {
  const [apakahLogin, setApakahLogin] = useState(false);
  const [memuatData, setMemuatData] = useState(true);

  useEffect(() => {
    const periksaKoleksiPengguna = async () => {
      try {
        const pengguna = auth().currentUser;

        if (pengguna) {
          const idPengguna = pengguna.uid;

          const koleksi = await firestore()
            .collection("pengguna")
            .doc(idPengguna)
            .get();

          setApakahLogin(koleksi.exists);
        } else {
          setApakahLogin(false);
        }
      } catch (error) {
        console.error("Error memeriksa koleksi pengguna: ", error);
        setApakahLogin(false);
      } finally {
        setMemuatData(false);
      }
    };

    periksaKoleksiPengguna();
  }, []);

  return { apakahLogin, memuatData };
}
