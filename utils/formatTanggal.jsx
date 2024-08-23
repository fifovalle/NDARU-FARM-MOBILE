export default formatTanggal = (timestamp) => {
  const tanggal = timestamp.toDate();
  return tanggal.toLocaleDateString("id-ID");
};
