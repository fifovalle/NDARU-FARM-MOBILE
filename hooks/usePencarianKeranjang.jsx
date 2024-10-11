import { Text } from "react-native";
import { useMemo } from "react";

export default function usePencarianKeranjang(
  dataKeranjang = [],
  kataPencarian
) {
  const hasilPencarianKeranjang = useMemo(() => {
    return dataKeranjang.filter((keranjang) =>
      keranjang.Nama.toLowerCase().includes(kataPencarian.toLowerCase())
    );
  }, [dataKeranjang, kataPencarian]);

  const menyorotiKataKeranjang = (kata, sorot) => {
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

  return { hasilPencarianKeranjang, menyorotiKataKeranjang };
}
