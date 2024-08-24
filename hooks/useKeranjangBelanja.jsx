import { useState, useEffect } from "react";
import firestore from "@react-native-firebase/firestore";
import auth from "@react-native-firebase/auth";

const useKeranjangBelanja = () => {
  const [keranjang, setKeranjang] = useState([]);
  const [memuatDataKeranjang, setMemuatDataKeranjang] = useState(true);

  const formatRupiah = (angka) => {
    const number_string = angka.toString().replace(/[^,\d]/g, "");
    const split = number_string.split(",");
    let sisa = split[0].length % 3;
    let rupiah = split[0].substr(0, sisa);
    const ribuan = split[0].substr(sisa).match(/\d{3}/gi);

    if (ribuan) {
      const separator = sisa ? "." : "";
      rupiah += separator + ribuan.join(".");
    }

    rupiah = split[1] !== undefined ? rupiah + "," + split[1] : rupiah;
    return "Rp " + rupiah;
  };

  useEffect(() => {
    const tampilkanKeranjang = async () => {
      setMemuatDataKeranjang(true);
      try {
        const user = auth().currentUser;
        if (user) {
          const snapshot = await firestore()
            .collection("keranjang")
            .where("ID_Pembeli", "==", user.uid)
            .get();
          const data = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));

          // Mengelompokkan item yang sama
          const groupedData = data.reduce((acc, item) => {
            const existingItem = acc.find(
              (i) => i.Nama_Sayuran === item.Nama_Sayuran
            );
            if (existingItem) {
              existingItem.kuantitas += item.kuantitas;
              existingItem.totalHarga += item.Harga_Sayuran * item.kuantitas;
            } else {
              acc.push({
                ...item,
                totalHarga: item.Harga_Sayuran * item.kuantitas,
              });
            }
            return acc;
          }, []);

          setKeranjang(groupedData);
        }
      } catch (error) {
        console.error("Error menampilkan data keranjang: ", error);
      } finally {
        setMemuatDataKeranjang(false);
      }
    };

    tampilkanKeranjang();
  }, []);

  return { keranjang, memuatDataKeranjang, formatRupiah };
};

export default useKeranjangBelanja;
