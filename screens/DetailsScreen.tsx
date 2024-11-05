import { Text } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useContext, useLayoutEffect } from "react";
import { GameContext } from "../store/game-context";

export default function DetailsScreen({
  route,
  navigation,
}: NativeStackScreenProps<any>) {
  const characterId = route.params?.characterId;

  const gameCtx = useContext(GameContext);
  const character = gameCtx.data.characters.find(
    (item) => item.id === characterId,
  );

  useLayoutEffect(() => {
    navigation.setOptions({
      title: character.name,
    });
  }, [navigation, characterId]);

  return <Text>Character Screen </Text>;
}
