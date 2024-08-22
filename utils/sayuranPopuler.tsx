export const tambahKuantitas = (kuantitas, setKuantitas) => {
  setKuantitas(kuantitas + 1);
};

export const kurangiKuantitas = (kuantitas, setKuantitas) => {
  if (kuantitas > 1) {
    setKuantitas(kuantitas - 1);
  }
};
