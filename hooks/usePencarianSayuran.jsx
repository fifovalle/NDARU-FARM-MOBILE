import { Text } from "react-native";
import { useMemo } from "react";

export default function usePencarianSayuran(dataSayuran, kataPencarian) {
  const hasilPencarian = useMemo(() => {
    return dataSayuran.filter((sayur) =>
      sayur.Nama_Sayuran.toLowerCase().includes(kataPencarian.toLowerCase())
    );
  }, [dataSayuran, kataPencarian]);

  const menyorotiKata = (kata, sorot) => {
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

  return { hasilPencarian, menyorotiKata };
}
