import useHurufResponsif from "../hooks/useHurufResponsif";

export const gayaHuruf = {
  lexend400: useHurufResponsif({
    android: "Lexend_400Regular",
    ios: "Lexend_400Regular",
  }),
  lexend500: useHurufResponsif({
    android: "Lexend_500Medium",
    ios: "Lexend_500Medium",
  }),
  lexend700: useHurufResponsif({
    android: "Lexend_700Bold",
    ios: "Lexend_700Bold",
  }),
  lexend900: useHurufResponsif({
    android: "Lexend_900Black",
    ios: "Lexend_900Black",
  }),
  poppins500: useHurufResponsif({
    android: "Poppins_500Medium",
    ios: "Poppins_500Medium",
  }),
  poppins700: useHurufResponsif({
    android: "Poppins_700Bold",
    ios: "Poppins_700Bold",
  }),
};
