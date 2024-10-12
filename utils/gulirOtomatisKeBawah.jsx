import { useRef } from "react";
import { Keyboard } from "react-native";

export const gulirOtomatisKeBawah = () => {
  const gulirSegera = useRef();

  const tanganiKirimPesan = async (kirimPesan, pesan) => {
    await kirimPesan(pesan);
    gulirSegera.current.scrollToEnd({ animated: true });
  };

  const tanganiScrollSaatMengetik = () => {
    Keyboard.addListener("keyboardDidShow", () => {
      gulirSegera.current?.scrollToEnd({ animated: true });
    });
  };

  return { gulirSegera, tanganiKirimPesan, tanganiScrollSaatMengetik };
};
