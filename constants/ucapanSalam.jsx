export const ucapanSalam = () => {
  const jamSekarang = new Date().getHours();
  if (jamSekarang < 12) return "Selamat Pagi";
  if (jamSekarang < 15) return "Selamat Siang";
  if (jamSekarang < 18) return "Selamat Sore";
  return "Selamat Malam";
};
