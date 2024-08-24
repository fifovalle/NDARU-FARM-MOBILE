import { Text } from "react-native";
import { useMemo } from "react";

export default function usePencarianPesan(dataPesan, kataPencarian) {
  const hasilPencarianPesan = useMemo(() => {
    return dataPesan.filter((pesan) =>
      pesan.pengirim.Nama_Lengkap_Pengguna.toLowerCase().includes(
        kataPencarian.toLowerCase()
      )
    );
  }, [dataPesan, kataPencarian]);

  const menyorotiKataPesan = (kata, sorot) => {
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

  return { hasilPencarianPesan, menyorotiKataPesan };
}
