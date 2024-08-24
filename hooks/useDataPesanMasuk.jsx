import { useState, useEffect } from "react";
import firestore from "@react-native-firebase/firestore";
import auth from "@react-native-firebase/auth";

const useDataPesanMasuk = (id) => {
  const [dataPengguna, setDataPengguna] = useState(null);
  const [memuatPengguna, setMemuatPengguna] = useState(true);
  const [daftarPesan, setDaftarPesan] = useState([]);
  const [memuatTampilkanPesan, setMemuatTampilkanPesan] = useState(true);
  const [memuatKirimPesan, setMemuatKirimPesan] = useState(false);
  const [pesanBaru, setPesanBaru] = useState("");

  useEffect(() => {
    const ambilDataPengguna = async () => {
      setMemuatPengguna(true);
      try {
        const doc = await firestore().collection("pengguna").doc(id).get();
        if (doc.exists) {
          setDataPengguna(doc.data());
        } else {
          console.log("Pengguna tidak ditemukan");
        }
      } catch (error) {
        console.error("Error fetching pengguna: ", error);
      } finally {
        setMemuatPengguna(false);
      }
    };

    if (id) {
      ambilDataPengguna();
    }
  }, [id]);

  useEffect(() => {
    const tidakBerlangganan = firestore()
      .collection("pesan")
      .where("ID_Pengirim", "in", [auth().currentUser.uid, id])
      .where("ID_Penerima", "in", [auth().currentUser.uid, id])
      .orderBy("Waktu_Pengiriman_Pesan", "asc")
      .onSnapshot(
        (snapshot) => {
          setMemuatTampilkanPesan(false);
          if (snapshot && snapshot.docs) {
            const pesan = snapshot.docs.map((doc) => ({
              id: doc.id,
              ...doc.data(),
            }));
            setDaftarPesan(pesan);
          }
        },
        (error) => {
          setMemuatTampilkanPesan(false);
          console.error("Error fetching pesan: ", error);
        }
      );

    return () => tidakBerlangganan();
  }, [id]);

  const kirimPesan = async (pesan) => {
    if (!pesan.trim()) return;
    setMemuatKirimPesan(true);
    try {
      const pengirim = auth().currentUser.uid;
      const waktuPengirimanPesan = firestore.FieldValue.serverTimestamp();

      await firestore().collection("pesan").add({
        ID_Penerima: id,
        ID_Pengirim: pengirim,
        Pesan: pesan,
        Waktu_Pengiriman_Pesan: waktuPengirimanPesan,
        Status_Baca: false,
      });

      await firestore()
        .collection("pengguna")
        .doc(id)
        .update({
          Jumlah_Pesan_Masuk: firestore.FieldValue.increment(1),
        });
    } catch (error) {
      console.error("Error sending message: ", error);
    } finally {
      setMemuatKirimPesan(false);
      setPesanBaru("");
    }
  };

  return {
    dataPengguna,
    memuatPengguna,
    memuatTampilkanPesan,
    memuatKirimPesan,
    daftarPesan,
    kirimPesan,
    pesanBaru,
    setPesanBaru,
  };
};

export default useDataPesanMasuk;
