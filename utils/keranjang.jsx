import { Animated } from "react-native";
import firestore from "@react-native-firebase/firestore";

export const beralihTerpilih = (
  setTerpilihSemua,
  setTerpilihSatuan,
  animasi,
  terpilihSemua
) => {
  setTerpilihSemua(!terpilihSemua);
  setTerpilihSatuan(!terpilihSemua);

  Animated.timing(animasi, {
    toValue: terpilihSemua ? 0 : 1,
    duration: 100,
    useNativeDriver: true,
  }).start();
};

export const beralihTerpilihSatuan = (setTerpilihSatuan, terpilihSatuan) => {
  setTerpilihSatuan(!terpilihSatuan);
};

export const tambahKuantitas = async (setKuantitas, id) => {
  try {
    const docRef = firestore().collection("keranjang").doc(id);
    const doc = await docRef.get();
    const currentQuantity = doc.data().Jumlah_Keranjang;
    const newQuantity = (parseInt(currentQuantity, 10) + 1).toString();

    await docRef.update({
      Jumlah_Keranjang: newQuantity,
    });

    setKuantitas(newQuantity);
  } catch (error) {
    console.error("Error updating quantity: ", error);
  }
};

export const kurangiKuantitas = async (setKuantitas, id) => {
  try {
    const docRef = firestore().collection("keranjang").doc(id);
    const doc = await docRef.get();
    const currentQuantity = doc.data().Jumlah_Keranjang;
    const newQuantity =
      parseInt(currentQuantity, 10) > 1
        ? (parseInt(currentQuantity, 10) - 1).toString()
        : "1";

    await docRef.update({
      Jumlah_Keranjang: newQuantity,
    });

    setKuantitas(newQuantity);
  } catch (error) {
    console.error("Error updating quantity: ", error);
  }
};

export const tanganiPerubahanKuantitas = (teks, setKuantitas, id) => {
  setKuantitas((prevKuantitas) => {
    if (!Array.isArray(prevKuantitas)) return prevKuantitas;

    const nilai = parseInt(teks);
    if (teks === "" || (!isNaN(nilai) && nilai >= 1)) {
      return prevKuantitas.map((item) =>
        item.id === id ? { ...item, kuantitas: teks } : item
      );
    }
    return prevKuantitas;
  });
};
