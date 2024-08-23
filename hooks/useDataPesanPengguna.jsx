import { useState, useEffect } from "react";
import firestore from "@react-native-firebase/firestore";
import auth from "@react-native-firebase/auth";

export default function useDataPesanPengguna() {
  const [dataPesanPengguna, setDataPesanPengguna] = useState([]);
  const [memuatPesanPengguna, setMemuatPesanPengguna] = useState(true);
  const [jumlahPesanBelumDibaca, setJumlahPesanBelumDibaca] = useState(0);

  useEffect(() => {
    const penggunaSekarang = auth().currentUser;

    if (!penggunaSekarang) {
      console.error("Pengguna belum login");
      setMemuatPesanPengguna(false);
      return;
    }

    const idPengguna = penggunaSekarang.uid;

    const tidakLangganan = firestore()
      .collection("pesan")
      .where("ID_Penerima", "==", idPengguna)
      .onSnapshot((snapshotPesan) => {
        const daftarPesanPengguna = snapshotPesan.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        const pesanTerbaru = {};
        let jumlahPesanBelumDibaca = 0;

        daftarPesanPengguna.forEach((pesan) => {
          const pengirimId = pesan.ID_Pengirim;
          if (
            !pesanTerbaru[pengirimId] ||
            pesan.Waktu_Pengiriman_Pesan >
              pesanTerbaru[pengirimId].Waktu_Pengiriman_Pesan
          ) {
            pesanTerbaru[pengirimId] = pesan;
          }
          if (!pesan.Status_Baca) {
            jumlahPesanBelumDibaca++;
          }
        });

        const daftarPesanTerbaru = Object.values(pesanTerbaru);
        const daftarIDPengirim = daftarPesanTerbaru.map(
          (pesan) => pesan.ID_Pengirim
        );

        if (daftarIDPengirim.length === 0) {
          setMemuatPesanPengguna(false);
          return;
        }

        firestore()
          .collection("pengguna")
          .where(firestore.FieldPath.documentId(), "in", daftarIDPengirim)
          .get()
          .then((snapshotPenggunaPengirim) => {
            const penggunaMapPengirim = snapshotPenggunaPengirim.docs.reduce(
              (acc, doc) => {
                acc[doc.id] = doc.data();
                return acc;
              },
              {}
            );

            const daftarIDPenerima = daftarPesanTerbaru.map(
              (pesan) => pesan.ID_Penerima
            );

            return firestore()
              .collection("pengguna")
              .where(firestore.FieldPath.documentId(), "in", daftarIDPenerima)
              .get()
              .then((snapshotPenggunaPenerima) => {
                const penggunaMapPenerima =
                  snapshotPenggunaPenerima.docs.reduce((acc, doc) => {
                    acc[doc.id] = doc.data();
                    return acc;
                  }, {});

                const pesanDenganPengguna = daftarPesanTerbaru.map((pesan) => {
                  const pengirim = penggunaMapPengirim[pesan.ID_Pengirim];

                  if (!pengirim) {
                    console.error(
                      `Pengirim tidak ditemukan untuk ID: ${pesan.ID_Pengirim}`
                    );
                  }

                  return {
                    ...pesan,
                    pengirim: pengirim || {
                      id: pesan.ID_Pengirim,
                      Nama_Lengkap_Pengguna: "Tidak Diketahui",
                      Foto_Pengguna: "",
                    },
                    penerima: penggunaMapPenerima[pesan.ID_Penerima],
                  };
                });

                setDataPesanPengguna(pesanDenganPengguna);
                setJumlahPesanBelumDibaca(jumlahPesanBelumDibaca);
              });
          })
          .catch((error) => {
            console.error("Error fetching pengguna data: ", error);
          });
      });

    return () => tidakLangganan();
  }, []);

  const perbaruiStatusBaca = async () => {
    try {
      const penggunaSekarang = auth().currentUser;

      if (!penggunaSekarang) {
        console.error("Pengguna belum login");
        return;
      }

      const idPengguna = penggunaSekarang.uid;

      const snapshotPesan = await firestore()
        .collection("pesan")
        .where("ID_Penerima", "==", idPengguna)
        .where("Status_Baca", "==", false)
        .get();

      const batch = firestore().batch();

      snapshotPesan.docs.forEach((doc) => {
        batch.update(doc.ref, { Status_Baca: true });
      });

      await batch.commit();
    } catch (error) {
      console.error("Error updating status baca: ", error);
    }
  };

  return {
    dataPesanPengguna,
    memuatPesanPengguna,
    perbaruiStatusBaca,
    jumlahPesanBelumDibaca,
  };
}
