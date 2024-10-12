import { useState, useEffect } from "react";
import auth from "@react-native-firebase/auth";
import firestore from "@react-native-firebase/firestore";

export const useTabsFotoProfilPengguna = () => {
  const [fotoPengguna, setFotoPengguna] = useState(null);
  const [memuatFotoPengguna, setMemuatFotoPengguna] = useState(true);

  useEffect(() => {
    const pengguna = auth().currentUser;

    if (pengguna) {
      const unsubscribe = firestore()
        .collection("pengguna")
        .doc(pengguna.uid)
        .onSnapshot((snap) => {
          if (snap.exists) {
            const data = snap.data();
            if (data.Foto_Pengguna) {
              setFotoPengguna({ uri: data.Foto_Pengguna });
            } else {
              setFotoPengguna(null);
            }
          }
          setMemuatFotoPengguna(false);
        });

      return () => unsubscribe();
    }
  }, []);

  return { fotoPengguna, memuatFotoPengguna };
};
