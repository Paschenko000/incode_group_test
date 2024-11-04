import { Text } from "react-native";
import { useContext } from "react";
import { GameContext } from "../store/game-context";

export default function HomeScreen() {
  const characters = useContext(GameContext);

  return <Text>Home Screen</Text>;
}
