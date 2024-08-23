import ikon from "./ikon";

export const pilihIkon = (namaPengarah, fokus, fotoPengguna) => {
  switch (namaPengarah) {
    case "index":
      return fokus ? ikon.berandaAktif : ikon.beranda;
    case "transaksi":
      return fokus ? ikon.transaksiAktif : ikon.transaksi;
    case "pesan":
      return fokus ? ikon.pesanAktif : ikon.pesan;
    case "profil":
      return fokus ? fotoPengguna || ikon.profilAktif : ikon.profil;
    default:
      return null;
  }
};
