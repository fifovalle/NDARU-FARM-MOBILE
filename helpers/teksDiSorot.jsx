import React from "react";
import { Text } from "react-native";

const TeksDiSorot = (teks, nilai, gayaHurufTebal, gayaHurufReguler) => {
  if (!nilai) {
    return <Text>{teks}</Text>;
  }

  const bagian = teks.split(new RegExp(`(${nilai})`, "gi"));
  return (
    <Text>
      {bagian.map((bagian, indeks) =>
        bagian.toLowerCase() === nilai.toLowerCase() ? (
          <Text
            key={indeks}
            style={{
              fontFamily: gayaHurufTebal,
              backgroundColor: "yellow",
              color: "#000",
            }}
          >
            {bagian}
          </Text>
        ) : (
          <Text key={indeks} style={{ fontFamily: gayaHurufReguler }}>
            {bagian}
          </Text>
        )
      )}
    </Text>
  );
};

export default TeksDiSorot;
