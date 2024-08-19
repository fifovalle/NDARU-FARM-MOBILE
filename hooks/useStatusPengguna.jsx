import { useEffect, useState } from "react";
import auth from "@react-native-firebase/auth";

export default function useStatusPengguna() {
  const [memuat, setMemuat] = useState(true);
  const [apakahSudahMasuk, aturapakahSudahMasuk] = useState(false);

  useEffect(() => {
    const unsubscribe = auth().onAuthStateChanged((pengguna) => {
      aturapakahSudahMasuk(!!pengguna);
      setMemuat(false);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return { memuat, apakahSudahMasuk };
}
