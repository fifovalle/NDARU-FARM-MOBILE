import { useState, useEffect } from "react";
import firestore from "@react-native-firebase/firestore";
import auth from "@react-native-firebase/auth";

const useCheckoutSayuran = () => {
  const [keranjang, setKeranjang] = useState([]);
  const [memuatData, setMemuatData] = useState(true);

  useEffect(() => {
    const pengguna = auth().currentUser;

    if (pengguna) {
      const unsubscribe = firestore()
        .collection("keranjang")
        .where("ID_Pembeli", "==", pengguna.uid)
        .onSnapshot(
          (snapshot) => {
            const dataKeranjang = snapshot.docs.map((doc) => ({
              id: doc.id,
              ...doc.data(),
            }));
            setKeranjang(dataKeranjang);
            setMemuatData(false);
          },
          (error) => {
            console.error("Error mengambil data keranjang: ", error);
            setMemuatData(false);
          }
        );

      return () => unsubscribe();
    } else {
      setKeranjang([]);
      setMemuatData(false);
    }
  }, []);

  const hitungTotalHarga = () => {
    return keranjang.reduce((total, checkout) => {
      return total + checkout.Harga_Keranjang * checkout.Jumlah_Keranjang;
    }, 0);
  };

  const formatRupiah = (angka) => {
    return "Rp " + angka.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  };

  return {
    keranjang,
    memuatData,
    formatRupiah,
    hitungTotalHarga,
  };
};

export default useCheckoutSayuran;
