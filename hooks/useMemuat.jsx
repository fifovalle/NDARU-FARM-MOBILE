import { useEffect } from "react";

export default function useMemuat(setMemuat) {
  useEffect(() => {
    const waktu = setTimeout(() => {
      setMemuat(false);
    }, 2000);
    return () => clearTimeout(waktu);
  }, []);
}
