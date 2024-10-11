import { useState, useEffect } from "react";
import firestore from "@react-native-firebase/firestore";
import auth from "@react-native-firebase/auth";
import Toast from "react-native-toast-message";

const useKeranjangBelanja = () => {
  const [keranjang, setKeranjang] = useState([]);
  const [memuatDataKeranjang, setMemuatDataKeranjang] = useState(true);

  useEffect(() => {
    const pengguna = auth().currentUser;

    if (pengguna) {
      const unsubscribe = firestore()
        .collection("keranjang")
        .where("ID_Pembeli", "==", pengguna.uid)
        .onSnapshot(
          (snapshot) => {
            setTimeout(() => {
              const dataKeranjang = snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
              }));
              setKeranjang(dataKeranjang);
              setMemuatDataKeranjang(false);
            }, 5000);
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

  const hitungTotalHarga = () => {
    return keranjang.reduce((total, item) => {
      return total + item.Harga * item.Jumlah;
    }, 0);
  };

  const hapusProduk = async (id) => {
    try {
      setTimeout(async () => {
        await firestore().collection("keranjang").doc(id).delete();
        Toast.show({
          type: "success",
          position: "top",
          text1: "Produk berhasil dihapus!",
          visibilityTime: 3000,
          autoHide: true,
        });
      }, 5000);
    } catch (error) {
      console.error("Error menghapus produk: ", error);
      Toast.show({
        type: "error",
        position: "top",
        text1: "Gagal menghapus produk!",
        text2: "Silakan coba lagi nanti.",
        visibilityTime: 3000,
        autoHide: true,
      });
    }
  };

  return {
    keranjang,
    memuatDataKeranjang,
    formatRupiah,
    hitungKeranjang,
    hitungTotalHarga,
    hapusProduk,
  };
};

export default useKeranjangBelanja;
