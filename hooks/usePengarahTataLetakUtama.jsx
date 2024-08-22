import { useEffect } from "react";
import { useRouter } from "expo-router";

export default function usePengarahTataLetakUtama(
  apakahLogin,
  apakahHurufTerpasang,
  memuatData
) {
  const pengarah = useRouter();

  useEffect(() => {
    if (!memuatData && apakahHurufTerpasang) {
      pengarah.replace(apakahLogin ? "beranda" : "layarPertama");
    }
  }, [apakahLogin, apakahHurufTerpasang, memuatData, pengarah]);
}
