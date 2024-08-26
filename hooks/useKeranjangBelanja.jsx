import { useState, useEffect } from "react";
import firestore from "@react-native-firebase/firestore";
import auth from "@react-native-firebase/auth";

const useKeranjangBelanja = () => {
  const [keranjang, setKeranjang] = useState([]);
  const [memuatDataKeranjang, setMemuatDataKeranjang] = useState(true);

  useEffect(() => {
    const pengguna = auth().currentUser;

    if (pengguna) {
      const unsubscribe = firestore()
        .collection("keranjang")
        .where("idPembeli", "==", pengguna.uid)
        .onSnapshot(
          (snapshot) => {
            const dataKeranjang = snapshot.docs.map((doc) => ({
              id: doc.id,
              ...doc.data(),
            }));
            setKeranjang(dataKeranjang);
            setMemuatDataKeranjang(false);
          },
          (error) => {
            console.error("Error mengambil data keranjang: ", error);
            setMemuatDataKeranjang(false);
          }
        );

      return () => unsubscribe();
    } else {
      setKeranjang([]);
      setMemuatDataKeranjang(false);
    }
  }, []);

  const formatRupiah = (angka) => {
    return `Rp ${angka.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}`;
  };

  const hitungKeranjang = () => {
    return keranjang.length;
  };

  return { keranjang, memuatDataKeranjang, formatRupiah, hitungKeranjang };
};

export default useKeranjangBelanja;
