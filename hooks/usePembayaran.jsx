import { useState, useEffect } from "react";
import firestore from "@react-native-firebase/firestore";
import auth from "@react-native-firebase/auth";

const usePembayaran = () => {
  const [transaksi, setTransaksi] = useState([]);
  const [memuatData, setMemuatData] = useState(true);

  useEffect(() => {
    const pengguna = auth().currentUser;

    if (pengguna) {
      const unsubscribe = firestore()
        .collection("checkout")
        .where("ID_Pembeli_Checkout", "==", pengguna.uid)
        .onSnapshot(
          (snapshot) => {
            const dataTransaksi = snapshot.docs.map((doc) => ({
              id: doc.id,
              ...doc.data(),
            }));
            setTransaksi(dataTransaksi);
            setMemuatData(false);
          },
          (error) => {
            console.error("Error mengambil data checkout: ", error);
            setMemuatData(false);
          }
        );

      return () => unsubscribe();
    } else {
      setTransaksi([]);
      setMemuatData(false);
    }
  }, []);

  const statusWarna = (status) => {
    switch (status) {
      case "Sedang Dikemas":
        return "#FFD700";
      case "Dikirim":
        return "#00BFFF";
      case "Diterima":
        return "#32CD32";
      case "Selesai":
        return "#32CD32";
      default:
        return "#FFFFFF";
    }
  };

  const formatRupiah = (angka) => {
    const format = new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    });
    return format.format(angka);
  };

  const formatTanggal = (timestamp) => {
    if (timestamp && typeof timestamp.toDate === "function") {
      const date = timestamp.toDate();
      return date.toLocaleDateString("id-ID", {
        day: "2-digit",
        month: "long",
        year: "numeric",
      });
    } else {
      return "Invalid Date";
    }
  };

  return {
    transaksi,
    memuatData,
    statusWarna,
    formatRupiah,
    formatTanggal,
  };
};

export default usePembayaran;
