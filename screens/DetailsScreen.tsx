import { Image, Text, View, StyleSheet } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useContext, useLayoutEffect } from "react";
import { GameContext } from "../store/game-context";
import { colors } from "../constants/colors";

export default function DetailsScreen({
  route,
  navigation,
}: NativeStackScreenProps<any>) {
  const characterId = route.params?.characterId;

  const gameCtx = useContext(GameContext);
  const character = gameCtx.data.characters.find(
    (item) => item.id === characterId,
  );

  const guessedCharacter = gameCtx.data.guessedCharacters.find(
    (item) => item.id === characterId,
  );
  const access = guessedCharacter.attempts.includes(true);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: character.name,
    });
  }, [navigation, characterId]);

  console.log(character);

  return (
    <View style={styles.container}>
      {character.image ? (
        <Image source={{ uri: character.image }} style={styles.image} />
      ) : (
        <View style={styles.image}>
          <Text>No image found</Text>
        </View>
      )}

      {access ? (
        <View style={styles.infoContainer}>
          <Text style={styles.category}>
            House:{" "}
            <Text style={styles.text}>
              {character.house ? character.house : "not in house"}
            </Text>
          </Text>
          <Text style={styles.category}>
            Date of birth:{" "}
            <Text style={styles.text}>{character.dateOfBirth}</Text>
          </Text>
          <Text style={styles.category}>
            Actor/Actress: <Text style={styles.text}>{character.actor}</Text>
          </Text>
          <Text style={styles.category}>
            Species: <Text style={styles.text}>{character.species}</Text>
          </Text>
        </View>
      ) : (
        <Text>Access denied</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 12,
    gap: 20,
  },
  image: {
    width: 180,
    height: 280,
    objectFit: "cover",
    borderRadius: 10,
    backgroundColor: colors.lightGrey,
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
  },
  infoContainer: {
    gap: 10,
  },
  category: {
    fontSize: 16,
    fontWeight: "500",
  },
  text: {
    fontWeight: "400",
  },
});
