import React from "react";
import { View, Text, Modal, TouchableOpacity } from "react-native";

const KonfirmasiKeluar = ({ muncul, konfirmasi, batalkan }) => {
  return (
    <Modal
      transparent={true}
      visible={muncul}
      animationType="fade"
      onRequestClose={batalkan}
    >
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "rgba(0, 0, 0, 0.5)",
        }}
      >
        <View
          style={{
            width: 300,
            padding: 20,
            backgroundColor: "white",
            borderRadius: 10,
            alignItems: "center",
          }}
        >
          <Text style={{ marginBottom: 20 }}>Yakin Anda ingin keluar?</Text>
          <View style={{ flexDirection: "row" }}>
            <TouchableOpacity
              onPress={konfirmasi}
              style={{
                padding: 10,
                backgroundColor: "red",
                borderRadius: 5,
                marginRight: 10,
              }}
            >
              <Text style={{ color: "white" }}>Ya</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={batalkan}
              style={{
                padding: 10,
                backgroundColor: "gray",
                borderRadius: 5,
              }}
            >
              <Text style={{ color: "white" }}>Tidak</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default KonfirmasiKeluar;
