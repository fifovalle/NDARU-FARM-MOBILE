import React from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";

const BeritaPopuler = ({
  memuatBerita,
  hasilPencarian,
  kataPencarian,
  dataTidakAda,
  gayaHuruf,
  pengarah,
  menyorotiKata,
}) => {
  return (
    <>
      <View className="p-4 flex-row justify-between items-center mt-5">
        <Text
          style={{ fontFamily: gayaHuruf.lexend900 }}
          className="text-[#556F50] text-xl"
        >
          Berita Populer
        </Text>
        <TouchableOpacity
          activeOpacity={0.6}
          onPress={() => pengarah.push("../detail/semuaBeritaPopuler")}
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
      {memuatBerita ? (
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
        <View className="flex">
          {hasilPencarian.map((berita) => (
            <TouchableOpacity
              key={berita.id}
              activeOpacity={0.7}
              className="mb-6"
              onPress={() =>
                pengarah.push("../detail/beritaPopuler?id=" + berita.id)
              }
            >
              <View className="flex-row bg-white rounded-xl w-full p-6">
                <View className="w-32 h-32 flex items-center justify-center rounded-xl">
                  <Image
                    className="w-28 h-28 rounded-xl"
                    source={{ uri: berita.Gambar }}
                  ></Image>
                </View>
                <View className="px-4 w-[200px] flex">
                  <Text style={{ fontFamily: gayaHuruf.poppins700 }}>
                    {menyorotiKata(
                      berita.Judul.length >= 7
                        ? `${berita.Judul.slice(
                            0,
                            1
                          ).toUpperCase()}${berita.Judul.slice(1, 25)}...`
                        : `${berita.Judul.slice(
                            0,
                            1
                          ).toUpperCase()}${berita.Judul.slice(1)}`,
                      kataPencarian
                    )}
                  </Text>
                  <Text
                    className="text-sm text-gray-500 mt-1"
                    style={{ fontFamily: gayaHuruf.lexend400 }}
                  >
                    {berita.Deskripsi.length >= 7
                      ? `${berita.Deskripsi.slice(
                          0,
                          1
                        ).toUpperCase()}${berita.Deskripsi.slice(1, 50)}...`
                      : `${berita.Deskripsi.slice(
                          0,
                          1
                        ).toUpperCase()}${berita.Deskripsi.slice(1)}`}
                  </Text>
                  <Text
                    className="text-sm text-gray-700 mt-3"
                    style={{ fontFamily: gayaHuruf.lexend400 }}
                  >
                    {berita.Tanggal_Terbit}
                  </Text>
                  <Text
                    className="text-sm text-gray-500 self-end mr-4"
                    style={{ fontFamily: gayaHuruf.lexend400 }}
                  >
                    {berita.Kategori}
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      )}
    </>
  );
};

export default BeritaPopuler;
