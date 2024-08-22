import { Text } from "react-native";
import { useMemo } from "react";

export default function usePencarianJasaPopuler(dataJasa, kataPencarian) {
  const hasilPencarianJasaPopuler = useMemo(() => {
    return dataJasa.filter((jasa) =>
      jasa.Nama_Jasa.toLowerCase().includes(kataPencarian.toLowerCase())
    );
  }, [dataJasa, kataPencarian]);

  const menyorotiKataJasaPopuler = (kata, sorot) => {
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

  return { hasilPencarianJasaPopuler, menyorotiKataJasaPopuler };
}
