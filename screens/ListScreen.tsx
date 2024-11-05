import { FlatList, StyleSheet, Text, View } from "react-native";

import { useEffect, useMemo, useReducer, useState } from "react";
import { GameContext, useGameContext } from "../store/game-context";
import { colors } from "../constants/colors";
import { ScoreContainer } from "../components/common/ScoreContainer";
import { SearchFilter } from "../components/common/SearchFilter";
import { CharacterItem } from "../components/CharactersList/CharacterItem";

export default function ListScreen({ navigation }) {
  const gameCtx = useGameContext();

  const guessedCharacters = useMemo(
    () =>
      gameCtx.data.guessedCharacters &&
      gameCtx.data.characters.filter((item) =>
        gameCtx.data.guessedCharacters.find(
          (guessed) => guessed.id === item.id,
        ),
      ),
    [gameCtx.data.guessedCharacters],
  );

  const [searchQuery, setSearchQuery] = useState("");
  const [filteredData, setFilteredData] = useState(guessedCharacters);

  useEffect(() => {
    if (searchQuery === "") {
      setFilteredData(guessedCharacters);
    } else {
      const filtered = guessedCharacters.filter((item) =>
        item.name.toLowerCase().includes(searchQuery.toLowerCase()),
      );
      setFilteredData(filtered);
    }
  }, [searchQuery, guessedCharacters]);

  function handleSearch(query) {
    // setSearchQuery(query);
  }

  function characterRenderItem(itemData) {
    const attempts = gameCtx.data.guessedCharacters.find(
      (item) => item.id === itemData.item.id,
    ).attempts;

    return (
      <CharacterItem
        navigation={navigation}
        name={itemData.item.name}
        id={itemData.item.id}
        image={itemData.item.image}
        attempts={attempts}
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
        {gameCtx.data.guessedCharacters.length > 0 && (
          <SearchFilter onChange={handleSearch} />
        )}
      </View>

      {gameCtx.data.guessedCharacters.length === 0 ? (
        <Text style={styles.fallbackText}>
          You will see your completed characters here once you start the quiz.
        </Text>
      ) : filteredData.length === 0 ? (
        <Text style={styles.fallbackText}>No characters found</Text>
      ) : (
        <FlatList
          data={filteredData}
          renderItem={characterRenderItem}
          keyExtractor={(item) => item.id}
        />
      )}
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
  fallbackText: {
    fontSize: 16,
    textAlign: "center",
    marginVertical: "auto",
  },
});
