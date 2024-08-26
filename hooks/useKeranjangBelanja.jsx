import { useState, useEffect } from "react";
import firestore from "@react-native-firebase/firestore";
import auth from "@react-native-firebase/auth";

const useKeranjangBelanja = () => {
  const [keranjang, setKeranjang] = useState([]);
  const [memuatDataKeranjang, setMemuatDataKeranjang] = useState(false);

  useEffect(() => {
    const ambilDataKeranjang = async () => {
      setMemuatDataKeranjang(true);
      try {
        const pengguna = auth().currentUser;
        if (pengguna) {
          const snapshot = await firestore()
            .collection("keranjang")
            .where("idPembeli", "==", pengguna.uid)
            .get();

          if (!snapshot.empty) {
            const dataKeranjang = snapshot.docs.map((doc) => ({
              id: doc.id,
              ...doc.data(),
            }));
            setKeranjang(dataKeranjang);
          } else {
            setKeranjang([]);
          }
        }
      } catch (error) {
        console.error("Error mengambil data keranjang: ", error);
      } finally {
        setMemuatDataKeranjang(false);
      }
    };

    ambilDataKeranjang();
  }, []);

  const formatRupiah = (angka) => {
    return `Rp ${angka.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}`;
  };

  return { keranjang, memuatDataKeranjang, formatRupiah };
};

export default useKeranjangBelanja;
