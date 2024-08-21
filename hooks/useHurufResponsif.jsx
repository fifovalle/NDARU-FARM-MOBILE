import { Platform } from "react-native";

export default function useHurufResponsif(opsiHuruf) {
  return Platform.select(opsiHuruf);
}
