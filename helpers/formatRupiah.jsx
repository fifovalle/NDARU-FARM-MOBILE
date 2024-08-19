export const formatRupiah = (angka) => {
  return `Rp${angka.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}`;
};
