import { Text } from "react-native";
import { useMemo } from "react";

export default function usePencarianBeritaPopuler(dataBerita, kataPencarian) {
  const hasilPencarianBeritaPopuler = useMemo(() => {
    return dataBerita.filter((berita) =>
      berita.Judul.toLowerCase().includes(kataPencarian.toLowerCase())
    );
  }, [dataBerita, kataPencarian]);

  const menyorotiKataBeritaPopuler = (kata, sorot) => {
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

  return { hasilPencarianBeritaPopuler, menyorotiKataBeritaPopuler };
}
