import { Animated } from "react-native";

export const bankIcons = {
  BCA: require("../assets/images/ikonBCA.png"),
  BRI: require("../assets/images/ikonBRI.png"),
  MANDIRI: require("../assets/images/ikonMandiri.png"),
  BNI: require("../assets/images/ikonBNI.png"),
};

export const dropdownAnimation = (
  dropdownVisible,
  heightValue,
  rotationValue
) => {
  return {
    height: Animated.timing(heightValue, {
      toValue: dropdownVisible ? 230 : 0,
      duration: 300,
      useNativeDriver: false,
    }),
    rotation: Animated.timing(rotationValue, {
      toValue: dropdownVisible ? 1 : 0,
      duration: 300,
      useNativeDriver: false,
    }),
  };
};
