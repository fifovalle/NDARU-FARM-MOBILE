import { useState, useEffect } from "react";
import firestore from "@react-native-firebase/firestore";
import auth from "@react-native-firebase/auth";

const useTampilkanAlamatCheckout = () => {
  const [alamatPengguna, setAlamatPengguna] = useState("");
  const [memuatAlamat, setMemuatAlamat] = useState(true);

  useEffect(() => {
    const pengguna = auth().currentUser;

    if (pengguna) {
      const timeoutId = setTimeout(() => {
        const unsubscribe = firestore()
          .collection("pengguna")
          .doc(pengguna.uid)
          .onSnapshot(
            (doc) => {
              if (doc.exists) {
                const dataPengguna = doc.data();
                setAlamatPengguna(
                  dataPengguna.Alamat_Pengguna || "Alamat belum tersedia"
                );
              } else {
                setAlamatPengguna("Alamat belum ditemukan");
              }
              setMemuatAlamat(false);
            },
            (error) => {
              console.error("Error mengambil alamat pengguna: ", error);
              setAlamatPengguna("Error mengambil alamat");
              setMemuatAlamat(false);
            }
          );

        return () => unsubscribe();
      }, 5000);

      return () => clearTimeout(timeoutId);
    } else {
      setAlamatPengguna("Pengguna belum login");
      setMemuatAlamat(false);
    }
  }, []);

  return { alamatPengguna, memuatAlamat };
};

export default useTampilkanAlamatCheckout;
