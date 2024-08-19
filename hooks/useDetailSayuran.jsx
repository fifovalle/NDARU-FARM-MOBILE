import { useEffect, useState } from "react";
import firestore from "@react-native-firebase/firestore";
import auth from "@react-native-firebase/auth";

export default function useDetailSayuran() {
  const [namaPengguna, setNamaPengguna] = useState("");
  const [sayuran, setSayuran] = useState([]);
  const [statusGambar, setStatusGambar] = useState({});
  const [kueriPencarian, setKueriPencarian] = useState("");
  const [sayuranTersaring, setSayuranTersaring] = useState([]);

  useEffect(() => {
    const ambilDataPengguna = async () => {
      const idPengguna = auth().currentUser.uid;
      try {
        const userDoc = await firestore()
          .collection("pengguna")
          .doc(idPengguna)
          .get();
        if (userDoc.exists) {
          setNamaPengguna(userDoc.data().Nama_Lengkap_Pengguna || "");
        }
      } catch (error) {}
    };

    const ambilDataSayuran = async () => {
      try {
        const sayuranCollection = await firestore().collection("sayuran").get();
        let dataSayuran = sayuranCollection.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        dataSayuran = dataSayuran.sort((a, b) => a.Stok - b.Stok);

        const statusGambarBaru = dataSayuran.reduce((acc, item) => {
          acc[item.id] = false;
          return acc;
        }, {});

        setStatusGambar(statusGambarBaru);
        setSayuran(dataSayuran);
        setSayuranTersaring(dataSayuran);
      } catch (error) {}
    };

    ambilDataPengguna();
    ambilDataSayuran();
  }, []);

  useEffect(() => {
    const dataTersaring = sayuran.filter((item) =>
      item.Nama_Sayuran.toLowerCase().includes(kueriPencarian.toLowerCase())
    );
    setSayuranTersaring(dataTersaring);
  }, [kueriPencarian, sayuran]);

  return {
    namaPengguna,
    sayuranTersaring,
    statusGambar,
    kueriPencarian,
    setKueriPencarian,
    handleImageLoad: (id) => {
      setStatusGambar((prevState) => ({
        ...prevState,
        [id]: true,
      }));
    },
  };
}
