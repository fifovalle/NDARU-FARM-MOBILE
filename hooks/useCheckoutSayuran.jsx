import { useState, useEffect } from "react";
import firestore from "@react-native-firebase/firestore";
import auth from "@react-native-firebase/auth";
import { router } from "expo-router";

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

  const simpanCheckout = async () => {
    const pengguna = auth().currentUser;

    if (pengguna) {
      try {
        const timestamp = firestore.FieldValue.serverTimestamp();
        const checkoutRef = await firestore().collection("checkout").add({
          ID_Pembeli_Checkout: pengguna.uid,
          Barang_Checkout: keranjang,
          Total_Harga_Checkout: hitungTotalHarga(),
          Waktu_Pembelian_Checkout: timestamp,
          Status_Checkout: "Sedang Dikemas",
        });

        const batch = firestore().batch();
        keranjang.forEach((item) => {
          const docRef = firestore().collection("keranjang").doc(item.id);
          batch.delete(docRef);
        });

        await batch.commit();

        router.push("beranda/transaksi");
      } catch (error) {
        console.error("Error menyimpan checkout: ", error);
      }
    }
  };

  return {
    keranjang,
    memuatData,
    formatRupiah,
    hitungTotalHarga,
    simpanCheckout,
  };
};

export default useCheckoutSayuran;
