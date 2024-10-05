import { useState, useEffect } from "react";
import firestore from "@react-native-firebase/firestore";
import Toast from "react-native-toast-message";
import auth from "@react-native-firebase/auth";

const useTambahKeranjangSayuran = () => {
  const [memuat, setMemuat] = useState(null);
  const [idPembeli, setIDPembeli] = useState(null);

  useEffect(() => {
    const temukanPengguna = async () => {
      const pengguna = auth().currentUser;
      if (pengguna) {
        try {
          const penggunaDoc = await firestore()
            .collection("pengguna")
            .doc(pengguna.uid)
            .get();
          if (penggunaDoc.exists) {
            setIDPembeli(penggunaDoc.id);
          }
        } catch (error) {
          console.error("Error menemukan pengguna: ", error);
        }
      }
    };

    temukanPengguna();
  }, []);

  const tambahKeKeranjang = async (sayuran) => {
    if (!idPembeli) {
      return;
    }

    setMemuat(sayuran.id);
    try {
      const keranjangRef = firestore()
        .collection("keranjang")
        .where("ID_Pembeli", "==", idPembeli)
        .where("Nama", "==", sayuran.Nama);

      const snapshot = await keranjangRef.get();

      if (!snapshot.empty) {
        const docId = snapshot.docs[0].id;
        const jumlahSekarang = snapshot.docs[0].data().Jumlah;
        await firestore()
          .collection("keranjang")
          .doc(docId)
          .update({
            Jumlah: jumlahSekarang + 1,
          });
      } else {
        await firestore().collection("keranjang").add({
          ID_Pembeli: idPembeli,
          ID_Sayuran: sayuran.id,
          Nama: sayuran.Nama,
          Harga: sayuran.Harga,
          Gambar: sayuran.Gambar,
          Jumlah: 1,
        });
      }

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
      setMemuat(null);
    }
  };

  return { tambahKeKeranjang, memuat };
};

export default useTambahKeranjangSayuran;
