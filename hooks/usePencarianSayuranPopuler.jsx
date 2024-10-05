import { Text } from "react-native";
import { useMemo } from "react";

export default function usePencarianSayuranPopuler(dataSayuran, kataPencarian) {
  const hasilPencarianSayuranPopuler = useMemo(() => {
    return dataSayuran.filter((sayur) =>
      sayur.Nama.toLowerCase().includes(kataPencarian.toLowerCase())
    );
  }, [dataSayuran, kataPencarian]);

  const menyorotiKataSayuranPopuler = (kata, sorot) => {
    if (!sorot) return kata;

    const bagian = kata.split(new RegExp(`(${sorot})`, "gi"));
    return bagian.map((bagian, indeks) =>
      bagian.toLowerCase() === sorot.toLowerCase() ? (
        <Text key={indeks} className="font-bold bg-yellow-300 text-black">
          {bagian}
        </Text>
      ) : (
        bagian
      )
    );
  };

  return { hasilPencarianSayuranPopuler, menyorotiKataSayuranPopuler };
}
