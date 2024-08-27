import { useRef } from "react";
import { Animated } from "react-native";

export const useAnimasiDropdown = (dropdownTerlihat, setDropdownTerlihat) => {
  const tinggiDropdownmBanking = useRef(new Animated.Value(0)).current;
  const tinggiDropdownATM = useRef(new Animated.Value(0)).current;
  const rotasiChevronmBanking = useRef(new Animated.Value(0)).current;
  const rotasiChevronATM = useRef(new Animated.Value(0)).current;

  const toggleDropdown = (type) => {
    const apakahTerbuka = dropdownTerlihat[type];
    const nilaiKetinggian = apakahTerbuka ? 0 : 100;
    const nilaiRotasi = apakahTerbuka ? 0 : 1;

    Animated.timing(
      type === "mBanking" ? tinggiDropdownmBanking : tinggiDropdownATM,
      {
        toValue: nilaiKetinggian,
        duration: 300,
        useNativeDriver: false,
      }
    ).start();

    Animated.timing(
      type === "mBanking" ? rotasiChevronmBanking : rotasiChevronATM,
      {
        toValue: nilaiRotasi,
        duration: 300,
        useNativeDriver: false,
      }
    ).start();

    setDropdownTerlihat((prevState) => ({
      ...prevState,
      [type]: !apakahTerbuka,
    }));
  };

  const rotasiChevronmBankingInterpolate = rotasiChevronmBanking.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "90deg"],
  });

  const rotasiChevronATMInterpolate = rotasiChevronATM.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "90deg"],
  });

  return {
    tinggiDropdownmBanking,
    tinggiDropdownATM,
    rotasiChevronmBankingInterpolate,
    rotasiChevronATMInterpolate,
    toggleDropdown,
  };
};
