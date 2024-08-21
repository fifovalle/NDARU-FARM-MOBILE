import { View } from "react-native";
import { WaveIndicator } from "react-native-indicators";

const IndikatorMuatan = () => {
  return (
    <View className="flex-1 justify-center items-center bg-[#E7E8E2]">
      <WaveIndicator color="#447055" size={120} />
    </View>
  );
};

export default IndikatorMuatan;
