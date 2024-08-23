import { useState, useEffect } from "react";
import auth from "@react-native-firebase/auth";
import firestore from "@react-native-firebase/firestore";

export const useTabsFotoProfilPengguna = () => {
  const [fotoPengguna, setFotoPengguna] = useState(null);
  const [memuatFotoPengguna, setMemuatFotoPengguna] = useState(true);

  useEffect(() => {
    const tampilkanFotoProfilPengguna = async () => {
      const pengguna = auth().currentUser;

      if (pengguna) {
        const doc = firestore().collection("pengguna").doc(pengguna.uid);
        const snap = await doc.get();

        if (snap.exists) {
          const data = snap.data();
          if (data.Foto_Pengguna) {
            setFotoPengguna({ uri: data.Foto_Pengguna });
          }
        }
      }
      setMemuatFotoPengguna(false);
    };

    tampilkanFotoProfilPengguna();
  }, []);

  return { fotoPengguna, memuatFotoPengguna };
};
