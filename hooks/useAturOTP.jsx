import { useState, useRef } from "react";

const useAturOTP = (panjangOTP) => {
  const [isiOTP, aturIsiOTP] = useState(Array(panjangOTP).fill(""));
  const teksOTP = useRef([]);

  const aturOTP = (teks, indeks) => {
    const baru = [...isiOTP];

    if (teks) {
      baru[indeks] = teks;
      aturIsiOTP(baru);

      if (indeks < isiOTP.length - 1) {
        teksOTP.current[indeks + 1].focus();
      }
    } else {
      baru[indeks] = "";
      aturIsiOTP(baru);

      if (indeks > 0) {
        teksOTP.current[indeks - 1].focus();
      }
    }
  };

  return { isiOTP, aturOTP, teksOTP };
};

export default useAturOTP;
