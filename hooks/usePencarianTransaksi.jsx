import { Text } from "react-native";
import { useMemo } from "react";

export default function usePencarianTransaksi(
  dataTransaksi = [],
  kataPencarian
) {
  const hasilPencarianTransaksi = useMemo(() => {
    return dataTransaksi.filter((trans) =>
      trans.Barang.some((barang) =>
        barang.Nama.toLowerCase().includes(kataPencarian.toLowerCase())
      )
    );
  }, [dataTransaksi, kataPencarian]);

  const menyorotiKataTransaksi = (kata, sorot) => {
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

  return { hasilPencarianTransaksi, menyorotiKataTransaksi };
}
