import { useState, useEffect } from "react";
import firestore from "@react-native-firebase/firestore";
import auth from "@react-native-firebase/auth";
import storage from "@react-native-firebase/storage";
import Toast from "react-native-toast-message";
import * as ImagePicker from "expo-image-picker";

export default function useProfilPengguna(segeraBergulirKeAtas) {
  const [jenisKelamin, setJenisKelamin] = useState("");
  const [namaLengkap, setNamaLengkap] = useState("");
  const [umur, setUmur] = useState("");
  const [nomorTelepon, setNomorTelepon] = useState("");
  const [provinsi, setProvinsi] = useState("");
  const [kota, setKota] = useState("");
  const [kabupaten, setKabupaten] = useState("");
  const [alamat, setAlamat] = useState("");
  const [kodePos, setKodePos] = useState("");
  const [gambarProfil, setGambarProfil] = useState(null);
  const [memuatGambar, setMemuatGambar] = useState(false);
  const [memuatSimpanData, setMemuatSimpanData] = useState(false);

  const warnaAktif = "#4C6C52";
  const warnaTidakAktif = "#fff";

  useEffect(() => {
    const pengguna = auth().currentUser;
    if (pengguna) {
      const penggunaRef = firestore().collection("pengguna").doc(pengguna.uid);
      const unsubscribe = penggunaRef.onSnapshot((documentSnapshot) => {
        if (documentSnapshot.exists) {
          const dataPengguna = documentSnapshot.data();
          setNamaLengkap(dataPengguna.Nama_Lengkap_Pengguna || "");
          setJenisKelamin(dataPengguna.Jenis_Kelamin_Pengguna || "");
          setUmur(dataPengguna.Umur_Pengguna || "");
          setNomorTelepon(dataPengguna.No_Telepon_Pengguna || "");
          setProvinsi(dataPengguna.Provinsi_Pengguna || "");
          setKota(dataPengguna.Kota_Pengguna || "");
          setKabupaten(dataPengguna.Kabupaten_Pengguna || "");
          setAlamat(dataPengguna.Alamat_Pengguna || "");
          setKodePos(dataPengguna.Kode_Pos_Pengguna || "");
          setGambarProfil(dataPengguna.Foto_Pengguna || "");
        }
      });

      return () => unsubscribe();
    }
  }, []);

  const simpanProfil = () => {
    const pengguna = auth().currentUser;

    setMemuatSimpanData(true);
    if (pengguna) {
      const penggunaRef = firestore().collection("pengguna").doc(pengguna.uid);
      const nomorTeleponBersih = nomorTelepon.startsWith("+62")
        ? nomorTelepon
        : "+62" + nomorTelepon;

      penggunaRef
        .set(
          {
            Nama_Lengkap_Pengguna: namaLengkap,
            Jenis_Kelamin_Pengguna: jenisKelamin,
            Umur_Pengguna: umur,
            No_Telepon_Pengguna: nomorTeleponBersih,
            Provinsi_Pengguna: provinsi,
            Kota_Pengguna: kota,
            Kabupaten_Pengguna: kabupaten,
            Alamat_Pengguna: alamat,
            Kode_Pos_Pengguna: kodePos,
            Foto_Pengguna: gambarProfil,
          },
          { merge: true }
        )
        .then(() => {
          Toast.show({
            type: "success",
            position: "top",
            text1: "Berhasil!",
            text2: "Perubahan profil berhasil disimpan.",
          });
          segeraBergulirKeAtas.current.scrollTo({ y: 0, animated: true });
        })
        .catch((error) => {
          Toast.show({
            type: "error",
            position: "top",
            text1: "Error!",
            text2: error.message,
          });
          segeraBergulirKeAtas.current.scrollTo({ y: 0, animated: true });
        })
        .finally(() => {
          setMemuatSimpanData(false);
        });
    }
  };

  const unggahGambar = async (uri) => {
    const pengguna = auth().currentUser;

    setMemuatGambar(true);
    if (pengguna) {
      const referensi = storage().ref(`Foto_Pengguna/${pengguna.uid}`);
      try {
        await referensi.putFile(uri);
        const url = await referensi.getDownloadURL();
        setGambarProfil(url);
        return url;
      } catch (error) {
        Toast.show({
          type: "error",
          position: "top",
          text1: "Error!",
          text2: "Gagal mengunggah gambar.",
        });
        segeraBergulirKeAtas.current.scrollTo({ y: 0, animated: true });
      } finally {
        setMemuatGambar(false);
      }
    }
  };

  const pilihGambar = async () => {
    const hasil = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!hasil.canceled) {
      const { uri } = hasil.assets[0];
      try {
        await unggahGambar(uri);
        Toast.show({
          type: "success",
          position: "top",
          text1: "Berhasil!",
          text2: "Gambar berhasil diunggah.",
        });
        segeraBergulirKeAtas.current.scrollTo({ y: 0, animated: true });
      } catch (error) {
        Toast.show({
          type: "error",
          position: "top",
          text1: "Error!",
          text2: "Gagal mengunggah gambar.",
        });
        segeraBergulirKeAtas.current.scrollTo({ y: 0, animated: true });
      }
    }
  };

  return {
    jenisKelamin,
    setJenisKelamin,
    namaLengkap,
    setNamaLengkap,
    umur,
    setUmur,
    nomorTelepon,
    setNomorTelepon,
    provinsi,
    setProvinsi,
    kota,
    setKota,
    kabupaten,
    setKabupaten,
    alamat,
    setAlamat,
    kodePos,
    setKodePos,
    gambarProfil,
    setGambarProfil,
    warnaAktif,
    warnaTidakAktif,
    simpanProfil,
    pilihGambar,
    memuatGambar,
    memuatSimpanData,
  };
}
