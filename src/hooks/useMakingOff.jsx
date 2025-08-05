import React, { useContext } from "react";
import MakingOffContext from "../context/MakingOffProvider";

export function useMakingOff() {
  return useContext(MakingOffContext);
}
