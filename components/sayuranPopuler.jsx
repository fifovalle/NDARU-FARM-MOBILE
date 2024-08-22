import React from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";

const SayuranPopuler = ({
  memuatSayuran,
  hasilPencarian,
  kataPencarian,
  pengarah,
  gayaHuruf,
  dataTidakAda,
  formatRupiah,
  menyorotiKata,
}) => {
  return (
    <>
      <View className="p-4 flex-row justify-between items-center">
        <Text
          style={{ fontFamily: gayaHuruf.lexend900 }}
          className="text-[#556F50] text-xl"
        >
          Sayuran Populer
        </Text>
        <TouchableOpacity
          activeOpacity={0.6}
          onPress={() => pengarah.push("../detail/semuaSayuranPopuler")}
        >
          <View className="flex-row items-center">
            <Text
              style={{ fontFamily: gayaHuruf.poppins500 }}
              className="text-[#447055] text-sm px-2 underline"
            >
              Lihat Semua
            </Text>
            <FontAwesome name="caret-right" size={20} color="#447055" />
          </View>
        </TouchableOpacity>
      </View>

      {memuatSayuran ? (
        <ActivityIndicator size="large" color="#556F50" />
      ) : hasilPencarian.length === 0 ? (
        <View className="flex items-center justify-center mt-10">
          <Image source={dataTidakAda} className="w-72 h-72 mb-4" />
          <Text
            style={{ fontFamily: gayaHuruf.lexend700 }}
            className="text-gray-500 text-[1.3rem] text-center"
          >
            Tidak ada hasil untuk "{kataPencarian}"
          </Text>
        </View>
      ) : (
        <View className="flex-row justify-between flex-wrap">
          {hasilPencarian.map((sayuran) => (
            <View
              key={sayuran.id}
              className="bg-white rounded-xl p-4 mb-4 w-[48%]"
            >
              <TouchableOpacity
                activeOpacity={0.5}
                onPress={() =>
                  pengarah.push(`../detail/sayuranPopuler?id=${sayuran.id}`)
                }
              >
                <Image
                  source={{ uri: sayuran.Gambar_Sayuran }}
                  className="w-full h-32 object-cover rounded-xl"
                />
              </TouchableOpacity>

              <Text
                className="text-xl mt-2 text-[#556F50]"
                style={{ fontFamily: gayaHuruf.poppins700 }}
              >
                {menyorotiKata(sayuran.Nama_Sayuran, kataPencarian)}
              </Text>
              <Text
                style={{ fontFamily: gayaHuruf.lexend400 }}
                className="text-gray-500"
              >
                {sayuran.Sayuran_Per_Kilo} Kg
              </Text>
              <View className="flex-row items-center justify-between mt-2">
                <Text
                  style={{ fontFamily: gayaHuruf.poppins700 }}
                  className="text-black"
                >
                  {formatRupiah(sayuran.Harga_Sayuran)}
                </Text>
                <Text
                  style={{ fontFamily: gayaHuruf.poppins500 }}
                  className="text-gray-500"
                >
                  Stok {sayuran.Stok_Sayuran}
                </Text>
              </View>
              <TouchableOpacity activeOpacity={0.7} className="w-full">
                <View className="mt-3 flex bg-[#447055] rounded-md p-2">
                  <Text
                    style={{ fontFamily: gayaHuruf.poppins500 }}
                    className="text-[#ffffff] text-center"
                  >
                    + Keranjang
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
          ))}
        </View>
      )}
    </>
  );
};

export default SayuranPopuler;
