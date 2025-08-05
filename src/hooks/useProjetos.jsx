import { useContext } from "react";
import ProjetosContext from "../context/ProjetosProvider"; // IMPORT O CONTEXT!

export default function useProjetos() {
  return useContext(ProjetosContext);
}
