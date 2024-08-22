import React from "react";
import { View, Text, TextInput, Image, ScrollView } from "react-native";

// MODUL KAMI
import { gayaHuruf } from "../constants/huruf";
import useAturOTP from "../hooks/useAturOTP";

export default function LayarOTP() {
  const { isiOTP, aturOTP, teksOTP } = useAturOTP(6);
  const gambarPenggunaVerifikasiOTP = require("../assets/images/gambarOTP.png");

  return (
    <ScrollView className="flex-1 bg-[#E7E8E2]">
      <View className="items-center -mb-[90px]">
        <Image
          source={gambarPenggunaVerifikasiOTP}
          className="h-[500px] w-[300px] mt-3"
          style={{ resizeMode: "contain" }}
        />
      </View>

      <View className="flex-1 bg-[#447055] rounded-t-[25px] p-6 mt-5">
        <View className="border-t-2 border-white mb-12 mx-auto w-32" />
        <Text
          style={{ fontFamily: gayaHuruf.lexend700 }}
          className="text-white text-[35px] text-center mb-4"
        >
          VERIFIKASI
        </Text>
        <Text
          style={{ fontFamily: gayaHuruf.lexend500 }}
          className="text-white text-center mb-14"
        >
          Kode verifikasi telah dikirimkan ke nomor Anda
        </Text>

        <View className="flex-row justify-center space-x-4">
          {isiOTP.map((otp, indeks) => (
            <TextInput
              key={indeks}
              ref={(ref) => (teksOTP.current[indeks] = ref)}
              cursorColor="#447055"
              value={otp}
              onChangeText={(teks) => aturOTP(teks, indeks)}
              style={{
                backgroundColor: otp ? "#E7E8E2" : "white",
                color: otp ? "black" : "#E7E8E2",
                fontFamily: gayaHuruf.lexend700,
              }}
              className="text-3xl text-center rounded-lg h-14 w-14 mx-2"
              maxLength={1}
              keyboardType="number-pad"
            />
          ))}
        </View>

        <Text
          style={{ fontFamily: gayaHuruf.lexend500 }}
          className="text-white text-center pt-20"
        >
          Tidak menerima kode? <Text className="font-bold">Kirim Ulang</Text>
        </Text>
      </View>
    </ScrollView>
  );
}
