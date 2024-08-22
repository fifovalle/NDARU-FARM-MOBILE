import { useEffect } from "react";
import { useRouter } from "expo-router";

export default function usePengarahTataLetakUtama(apakahHurufTerpasang) {
  const pengarah = useRouter();

  useEffect(() => {
    if (apakahHurufTerpasang) {
      pengarah.replace("beranda");
    }
  }, [apakahHurufTerpasang, pengarah]);
}
