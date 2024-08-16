import { Platform } from "react-native";

export default function useGayaHuruf(opsi) {
  return Platform.select(opsi);
}
