import { Animated } from "react-native";

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

export const tambahKuantitas = (setKuantitas) => {
  setKuantitas((prevKuantitas) => {
    const nilai = parseInt(prevKuantitas) + 1;
    return nilai.toString();
  });
};

export const kurangiKuantitas = (setKuantitas, kuantitas) => {
  setKuantitas((prevKuantitas) => {
    const nilai = parseInt(prevKuantitas);
    return nilai > 1 ? (nilai - 1).toString() : "1";
  });
};

export const tanganiPerubahanKuantitas = (teks, setKuantitas) => {
  const nilai = parseInt(teks);
  if (teks === "" || (!isNaN(nilai) && nilai >= 1)) {
    setKuantitas(teks);
  }
};
