import { View, Image } from "react-native";
import "../global.css";
import LayarPercikan from "./screens/LayarPercikan";

export default function RootLayout() {
  return (
    <View className="flex-1 h-full bg-[#FFEFDA]">
      <Image
        source={require("../assets/images/Orang_Layar_Percikan.png")}
        className="absolute bottom-[-45] left-[-195px] w-[800px] h-[800px] opacity-[5%]"
      />
      <LayarPercikan />
    </View>
  );
}
