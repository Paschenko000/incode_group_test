import { FlatList, StyleSheet, View } from "react-native";

import { useContext } from "react";
import { GameContext } from "../store/game-context";
import { colors } from "../constants/colors";
import { ScoreContainer } from "../components/common/ScoreContainer";
import { SearchFilter } from "../components/common/SearchFilter";
import { CharacterItem } from "../components/CharactersList/CharacterItem";

export default function ListScreen() {
  const gameCtx = useContext(GameContext);

  function characterRenderItem(itemData) {
    const character = gameCtx.data.characters.find(
      (item) => item.id === itemData.item.id,
    );
    console.log(character, "character");
    return (
      <CharacterItem
        name={character.name}
        id={character.id}
        image={character.image}
        attempts={itemData.item.attempts}
      />
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.scoreAndSearchContainer}>
        <View style={styles.scoreContainer}>
          <ScoreContainer score={gameCtx.data.totalAttempts} name="Total" />
          <ScoreContainer
            score={gameCtx.data.successfulAttempts}
            name="Success"
          />
          <ScoreContainer score={gameCtx.data.failedAttempts} name="Failed" />
        </View>

        <SearchFilter />
      </View>

      <FlatList
        data={gameCtx.data.guessedCharacters}
        renderItem={characterRenderItem}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // gap: 30,
    paddingTop: 12,
    paddingHorizontal: 12,
    backgroundColor: colors.background,
  },
  scoreAndSearchContainer: {
    gap: 20,
  },
  scoreContainer: {
    width: "100%",
    gap: 10,
    justifyContent: "space-between",
    flexDirection: "row",
  },
});
