import { Text } from "react-native";
import { useMemo } from "react";

export default function usePencarianSaranaPertanianPopuler(
  dataSaranaPertanianPopuler,
  kataPencarian
) {
  const hasilPencarianSaranaPertanianPopuler = useMemo(() => {
    return dataSaranaPertanianPopuler.filter((sarana_pertanian) =>
      sarana_pertanian.Nama.toLowerCase().includes(kataPencarian.toLowerCase())
    );
  }, [dataSaranaPertanianPopuler, kataPencarian]);

  const menyorotiKataSaranaPertanianPopuler = (kata, sorot) => {
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

  return {
    hasilPencarianSaranaPertanianPopuler,
    menyorotiKataSaranaPertanianPopuler,
  };
}
