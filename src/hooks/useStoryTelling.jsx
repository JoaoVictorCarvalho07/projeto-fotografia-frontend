// Hook customizado
import { useContext } from "react";
import StorytellingContext from "../context/StorytellingProvider";

export function useStoryTelling() {
  const context = useContext(StorytellingContext);
  return context;
}
