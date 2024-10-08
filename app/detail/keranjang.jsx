import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  Animated,
  ActivityIndicator,
  ScrollView,
} from "react-native";
import React, { useState, useRef } from "react";
import { useRouter } from "expo-router";
import { FontAwesome } from "@expo/vector-icons";
import Toast from "react-native-toast-message";

// MODUL KAMI
import { gayaHuruf } from "../../constants/huruf";
import useKeranjangBelanja from "../../hooks/useKeranjangBelanja";
import {
  beralihTerpilih,
  beralihTerpilihSatuan,
  tambahKuantitas,
  kurangiKuantitas,
  tanganiPerubahanKuantitas,
} from "../../utils/keranjang";

export default function Keranjang() {
  const animasi = useRef(new Animated.Value(0)).current;
  const ikonPencarian = require("../../assets/images/ikonCari.png");
  const dataTidakAda = require("../../assets/images/dataTidakAda.png");
  const [terpilihSemua, setTerpilihSemua] = useState(false);
  const [terpilihSatuan, setTerpilihSatuan] = useState(false);
  const [kuantitas, setKuantitas] = useState("1");
  const pengarah = useRouter();

  const {
    keranjang,
    memuatDataKeranjang,
    hitungTotalHarga,
    formatRupiah,
    hapusProduk,
  } = useKeranjangBelanja();

  return (
    <View className="flex-1 bg-[#E7E8E2]">
      <Toast />
      <View className="flex-row items-center mt-14 mb-8 px-4 -z-50">
        <TouchableOpacity onPress={() => pengarah.back("../")}>
          <View className="w-10 h-10 rounded-full flex justify-center items-center">
            <FontAwesome name="arrow-left" size={24} color="green" />
          </View>
        </TouchableOpacity>

        <Text
          style={{ fontFamily: gayaHuruf.lexend900 }}
          className="text-lg ml-4"
        >
          Keranjang
        </Text>
      </View>

      <View className="flex-row items-center bg-white rounded-full px-4 py-2 mb-4 mx-4">
        <Image className="w-7 h-7" source={ikonPencarian} />
        <TextInput
          style={{ fontFamily: gayaHuruf.lexend400 }}
          placeholder="Cari produk..."
          className="ml-2 flex-1"
          placeholderTextColor="gray"
        />
      </View>

      <ScrollView className="px-4">
        <View className="bg-white p-4 rounded-xl shadow-xl">
          <View className="flex-row items-center justify-between mb-2">
            <View className="flex-row items-center">
              <TouchableOpacity
                activeOpacity={0.3}
                className="w-9 h-9 justify-center items-center ml-1"
                onPress={() =>
                  beralihTerpilih(
                    setTerpilihSemua,
                    setTerpilihSatuan,
                    animasi,
                    terpilihSemua
                  )
                }
              >
                <FontAwesome
                  name="check-square"
                  size={24}
                  color={terpilihSemua ? "green" : "gray"}
                />
              </TouchableOpacity>

              <View className="ml-2">
                <Text
                  style={{ fontFamily: gayaHuruf.poppins500 }}
                  className="text-md text-gray-600"
                >
                  {terpilihSemua ? "1 Produk terpilih" : "0 Produk terpilih"}
                </Text>
              </View>
            </View>

            <Animated.View
              style={{
                opacity: animasi,
                pointerEvents: terpilihSemua ? "auto" : "none",
              }}
            >
              <TouchableOpacity activeOpacity={0.5}>
                <View className="flex-row items-center justify-center border border-red-600 p-1 mr-3 rounded-lg">
                  <FontAwesome name="trash-o" size={24} color="#d00c0c" />
                  <Text
                    style={{ fontFamily: gayaHuruf.lexend700 }}
                    className="text-sm text-center w-16 text-[#d00c0c]"
                  >
                    Hapus
                  </Text>
                </View>
              </TouchableOpacity>
            </Animated.View>
          </View>

          <View className="border-b border-gray-300 mb-6 " />

          {memuatDataKeranjang ? (
            <ActivityIndicator size="large" color="#556F50" />
          ) : keranjang.length === 0 ? (
            <View className="items-center">
              <Image source={dataTidakAda} className="w-72 h-72 mb-4" />
              <Text
                style={{ fontFamily: gayaHuruf.lexend700 }}
                className="text-lg text-gray-600"
              >
                Keranjang Anda Kosong
              </Text>
            </View>
          ) : (
            <>
              {keranjang.map((keranjang, indeks) => (
                <View
                  key={indeks}
                  className="flex-row items-center mb-7 justify-between"
                >
                  <View className="flex-row items-center">
                    <TouchableOpacity
                      onPress={() =>
                        beralihTerpilihSatuan(setTerpilihSatuan, terpilihSatuan)
                      }
                    >
                      <View className="w-9 h-9 ml-2">
                        <FontAwesome
                          name="check-square"
                          size={24}
                          color={terpilihSatuan ? "green" : "gray"}
                        />
                      </View>
                    </TouchableOpacity>

                    <View className="w-16 h-16 bg-gray-200 rounded-lg mr-4 flex items-center justify-center">
                      <Image
                        className="w-14 h-14"
                        source={{ uri: keranjang.Gambar }}
                      />
                    </View>

                    <View>
                      <Text
                        style={{ fontFamily: gayaHuruf.lexend700 }}
                        className="text-sm"
                      >
                        {keranjang.Nama}
                      </Text>

                      <Text
                        style={{ fontFamily: gayaHuruf.lexend400 }}
                        className="text-sm text-gray-600"
                      >
                        {formatRupiah(keranjang.Harga)}
                      </Text>
                    </View>
                  </View>

                  <View className="mr-2 flex-row w-28 h-8 border-2 rounded-full border-gray-300 justify-center">
                    <TouchableOpacity
                      activeOpacity={0.3}
                      className="my-auto"
                      onPress={() =>
                        keranjang.Jumlah > 1
                          ? kurangiKuantitas(setKuantitas, keranjang.id)
                          : hapusProduk(keranjang.id)
                      }
                    >
                      <FontAwesome
                        className="mr-3"
                        name={keranjang.Jumlah > 1 ? "minus" : "trash-o"}
                        size={16}
                        color="gray"
                      />
                    </TouchableOpacity>

                    <TextInput
                      value={String(keranjang.Jumlah)}
                      keyboardType="numeric"
                      className="my-auto w-1/4 text-center"
                      editable={true}
                      onChangeText={(teks) =>
                        tanganiPerubahanKuantitas(
                          teks,
                          setKuantitas,
                          keranjang.id
                        )
                      }
                    />

                    <TouchableOpacity
                      activeOpacity={0.3}
                      className="my-auto"
                      onPress={() =>
                        tambahKuantitas(setKuantitas, keranjang.id)
                      }
                    >
                      <FontAwesome
                        className="ml-3"
                        name="plus"
                        size={16}
                        color="gray"
                      />
                    </TouchableOpacity>
                  </View>
                </View>
              ))}
            </>
          )}
        </View>
      </ScrollView>

      {keranjang.length > 0 && (
        <View className="bg-white w-screen h-20 justify-end items-center flex-row">
          <View className="px-8">
            <Text style={{ fontFamily: gayaHuruf.poppins500 }}>Total :</Text>
            <Text
              style={{ fontFamily: gayaHuruf.lexend700 }}
              className="text-lg"
            >
              {formatRupiah(hitungTotalHarga())}
            </Text>
          </View>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => pengarah.push(`detail/checkout`)}
            className="bg-[#447055] rounded-lg w-52 h-14 items-center justify-center p-3 mr-8"
          >
            <Text
              style={{ fontFamily: gayaHuruf.poppins700 }}
              className="text-lg text-white z-20"
            >
              Beli Sekarang
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}
