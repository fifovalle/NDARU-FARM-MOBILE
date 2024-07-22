import { View } from "react-native";
import React from "react";

interface propertiKotakFormulir {
  children: React.ReactNode;
}

export default function KotakFormulir({ children }: propertiKotakFormulir) {
  return (
    <View
      className="w-[330px] h-[440px] mx-auto rounded-2xl mt-3 bg-white"
      style={{
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 8,
        },
        shadowOpacity: 0.44,
        shadowRadius: 10.32,
        elevation: 16,
      }}
    >
      {children}
    </View>
  );
}
