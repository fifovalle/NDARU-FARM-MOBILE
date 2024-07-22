import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { Link } from "expo-router";

export default function TombolGabungDaftar({
  layarSekarang,
  aturLayarSekarang,
}: {
  layarSekarang: string;
  aturLayarSekarang: (layarSekarang: string) => void;
}) {
  return (
    <View className="flex-row mt-10 justify-evenly w-80 mx-auto bg-white">
      <TouchableOpacity
        onPress={() => aturLayarSekarang("index")}
        className={
          layarSekarang === "index"
            ? "bg-[#275229] px-8 py-3 rounded-full z-10 shadow-md w-[11rem] ml-4"
            : "bg-white px-8 py-3 rounded-full z-10 shadow-md w-[11rem] ml-4"
        }
        activeOpacity={0.7}
      >
        <Link
          href={layarSekarang === "index" ? "/" : "/"}
          className={
            layarSekarang === "index"
              ? "text-white text-center text-lg"
              : "text-[#275229] text-center text-lg"
          }
        >
          <Text style={{ fontFamily: "Poppins_700Bold" }}>
            {layarSekarang === "index" ? "Bergabung" : "Bergabung"}
          </Text>
        </Link>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => aturLayarSekarang("daftar")}
        className={
          layarSekarang === "index"
            ? "bg-white px-8 py-3 rounded-r-full shadow-md border border-l-0 border-[#275229] w-[11rem] mr-4"
            : "bg-[#275229] px-8 py-3 rounded-r-full shadow-md border border-l-0 border-[#275229] w-[11rem] mr-4"
        }
        activeOpacity={0.7}
      >
        <Link
          href={layarSekarang === "index" ? "/daftar" : "/daftar"}
          className={
            layarSekarang === "index"
              ? "text-[#275229] text-center text-lg"
              : "text-white text-center text-lg"
          }
        >
          <Text style={{ fontFamily: "Poppins_700Bold" }}>
            {layarSekarang === "index" ? "Mendaftar" : "Mendaftar"}
          </Text>
        </Link>
      </TouchableOpacity>
    </View>
  );
}
