import firestore from "@react-native-firebase/firestore";
import { useEffect, useState } from "react";

export default function useHalamanPesan() {
  const [dataPengguna, setDataPengguna] = useState([]);
  const [jumlahPesanBelumTerbaca, setJumlahPesanBelumTerbaca] = useState({});

  useEffect(() => {
    const unsubscribePengguna = firestore()
      .collection("pengguna")
      .onSnapshot(
        (snapshot) => {
          const penggunaData = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          setDataPengguna(penggunaData);
        },
        (error) => {
          console.error("Error fetching data pengguna:", error);
        }
      );

    const unsubscribePesan = firestore()
      .collection("pesan")
      .onSnapshot(
        async () => {
          try {
            const penggunaIds = dataPengguna.map((p) => p.id);
            const jumlahPesan = {};

            // Hitung jumlah pesan belum terbaca hanya untuk penerima
            await Promise.all(
              penggunaIds.map(async (id) => {
                const pesanSnapshot = await firestore()
                  .collection("pesan")
                  .where("ID_Penerima", "==", id)
                  .where("Status_Baca", "==", false)
                  .get();

                // Hanya simpan jumlah pesan untuk penerima
                if (penggunaIds.includes(id)) {
                  jumlahPesan[id] = pesanSnapshot.size;
                }
                console.log(
                  `Jumlah pesan belum terbaca untuk ${id}: ${jumlahPesan[id]}`
                );
              })
            );

            setJumlahPesanBelumTerbaca(jumlahPesan);
          } catch (error) {
            console.error("Error fetching jumlah pesan belum terbaca:", error);
          }
        },
        (error) => {
          console.error("Error fetching data pesan:", error);
        }
      );

    return () => {
      unsubscribePengguna();
      unsubscribePesan();
    };
  }, [dataPengguna]);

  return {
    dataPengguna,
    jumlahPesanBelumTerbaca,
  };
}
