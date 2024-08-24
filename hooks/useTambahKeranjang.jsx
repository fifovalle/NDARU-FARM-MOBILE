import { useState, useEffect } from "react";
import firestore from "@react-native-firebase/firestore";
import Toast from "react-native-toast-message";
import auth from "@react-native-firebase/auth";

const useTambahKeranjang = () => {
  const [loadingItemId, setLoadingItemId] = useState(null);
  const [ID_Pembeli, setID_Pembeli] = useState(null);

  useEffect(() => {
    const fetchUserId = async () => {
      const user = auth().currentUser;
      if (user) {
        try {
          const penggunaDoc = await firestore()
            .collection("pengguna")
            .doc(user.uid)
            .get();
          if (penggunaDoc.exists) {
            setID_Pembeli(penggunaDoc.id);
          }
        } catch (error) {
          console.error("Error fetching user ID: ", error);
        }
      }
    };

    fetchUserId();
  }, []);

  const tambahKeKeranjang = async (sayuran) => {
    if (!ID_Pembeli) {
      return;
    }

    setLoadingItemId(sayuran.id);
    try {
      await firestore().collection("keranjang").add({
        ID_Pembeli: ID_Pembeli,
        Nama_Sayuran: sayuran.Nama_Sayuran,
        Harga_Sayuran: sayuran.Harga_Sayuran,
        Gambar_Sayuran: sayuran.Gambar_Sayuran,
        Jumlah: 1,
      });
      Toast.show({
        type: "success",
        position: "top",
        text1: "Berhasil",
        text2: "Berhasil ditambahkan ke keranjang!",
      });
    } catch (error) {
      console.error("Error menambah ke keranjang: ", error);
      Toast.show({
        type: "error",
        position: "top",
        text1: "Gagal",
        text2: "Gagal menambahkan ke keranjang. Silakan coba lagi.",
      });
    } finally {
      setLoadingItemId(null);
    }
  };

  return { tambahKeKeranjang, loadingItemId };
};

export default useTambahKeranjang;
