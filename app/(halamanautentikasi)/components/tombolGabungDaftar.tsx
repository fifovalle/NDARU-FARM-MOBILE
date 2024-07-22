import { View, Text, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { Link } from "expo-router";

export default function TombolGabungDaftar({
  layarSekarang,
  aturLayarSekarang,
}: {
  layarSekarang: string;
  aturLayarSekarang: (layarSekarang: string) => void;
}) {
  if (layarSekarang === "index") {
    return (
      <View className="flex-row mt-10 justify-evenly w-80 mx-auto bg-white">
        <TouchableOpacity
          onPress={() => aturLayarSekarang("index")}
          className="bg-[#275229] px-8 py-3 rounded-full z-10 shadow-md w-[11rem] ml-4"
          activeOpacity={0.7}
        >
          <Link href={"/"} className="text-white text-center text-lg">
            <Text style={{ fontFamily: "Poppins_700Bold" }}>Bergabung</Text>
          </Link>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => aturLayarSekarang("daftar")}
          className="bg-white px-8 py-3 rounded-r-full shadow-md border border-l-0 border-[#275229] w-[11rem] mr-4"
          activeOpacity={0.7}
        >
          <Link className="text-[#275229] text-center text-lg" href={"/daftar"}>
            <Text style={{ fontFamily: "Poppins_700Bold" }}>Mendaftar</Text>
          </Link>
        </TouchableOpacity>
      </View>
    );
  } else if (layarSekarang === "daftar") {
    return (
      <View className="flex-row mt-10 justify-evenly w-80 mx-auto bg-white">
        <TouchableOpacity
          onPress={() => aturLayarSekarang("index")}
          className="bg-white px-8 py-3 rounded-full z-10 shadow-md w-[11rem] ml-4"
          activeOpacity={0.7}
        >
          <Link
            className="text-[#275229] text-center text-lg"
            href={"/"}
            replace={true}
          >
            <Text style={{ fontFamily: "Poppins_700Bold" }}>Bergabung</Text>
          </Link>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => aturLayarSekarang("daftar")}
          className="bg-[#275229] px-8 py-3 rounded-r-full shadow-md border border-l-0 border-[#275229] w-[11rem] mr-4"
          activeOpacity={0.7}
        >
          <Link
            className="text-white font-bold text-center text-lg"
            href={"/daftar"}
            replace={true}
          >
            <Text style={{ fontFamily: "Poppins_700Bold" }}>Mendaftar</Text>
          </Link>
        </TouchableOpacity>
      </View>
    );
  }
}
