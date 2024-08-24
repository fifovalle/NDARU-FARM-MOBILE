import { useRef } from "react";

export const gulirOtomatisKeBawah = () => {
  const gulirSegera = useRef();

  const tanganiPesan = async (kirimPesan, pesan) => {
    await kirimPesan(pesan);
    gulirSegera.current.scrollToEnd({ animated: true });
  };

  return { gulirSegera, tanganiPesan };
};
