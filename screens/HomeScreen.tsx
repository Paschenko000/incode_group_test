import {
  Animated,
  FlatList,
  RefreshControl,
  StyleSheet,
  View,
} from "react-native";
import { useContext, useEffect, useState } from "react";
import { GameContext } from "../store/game-context";
import { colors } from "../constants/colors";
import { Character } from "../components/Game/Character";
import { GameButton } from "../components/ui/GameButton";
import ScrollView = Animated.ScrollView;
import { IconButton } from "../components/ui/IconButton";
import { ScoreContainer } from "../components/common/ScoreContainer";

const houses = [
  "Gryffindor",
  "Slytherin",
  "Ravenclaw",
  "Hufflepuff",
  "Not in House",
];

//TODO: fix current character when user resets the game;
export default function HomeScreen() {
  const [currentCharacter, setCurrentCharacter] = useState(0);
  const [refreshing, setRefreshing] = useState(false);
  const [selectedHouse, setSelectedHouse] = useState<{
    house: string;
    isCorrect: boolean;
  }>(null);

  const gameCtx = useContext(GameContext);

  useEffect(() => {
    setCurrentCharacter(getRandomCharIndex());
  }, []);

  useEffect(() => {
    setSelectedHouse(null);
  }, [currentCharacter]);

  function getRandomCharIndex() {
    return Math.floor(Math.random() * gameCtx.data.characters.length);
  }

  function handleSelectHouse(house: string) {
    const { id, house: gameHouse } = gameCtx.data.characters[currentCharacter];
    const isCorrect = gameHouse === house;

    if (gameCtx.data.guessedCharacters.includes((item) => item.id === id)) {
      gameCtx.updateGuessedCharacters({ attempt: isCorrect, id });
    } else {
      gameCtx.addGuessedCharacters({ attempt: isCorrect, id });
    }
    setSelectedHouse({ house, isCorrect });
  }

  function handleRefresh() {
    setRefreshing(true);
    let random = getRandomCharIndex();

    while (random === currentCharacter) {
      random = getRandomCharIndex();
    }

    if (
      gameCtx.data.guessedCharacters.findIndex(
        (item) => item.id === gameCtx.data.characters[random].id,
      ) !== -1
    ) {
      const guessedChar = gameCtx.data.guessedCharacters[random];
      if (
        !guessedChar?.attempts.includes(true) ||
        guessedChar.attempts.length === 0
      ) {
        setCurrentCharacter(random);
      }
    } else {
      setCurrentCharacter(random);
    }

    setRefreshing(false);
  }

  return (
    <ScrollView
      style={styles.scollContainer}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
      }
    >
      <View style={styles.container}>
        <View style={styles.scoreContainer}>
          <ScoreContainer score={gameCtx.data.totalAttempts} name="Total" />
          <ScoreContainer
            score={gameCtx.data.successfulAttempts}
            name="Success"
          />
          <ScoreContainer score={gameCtx.data.failedAttempts} name="Failed" />
        </View>

        <Character
          name={gameCtx.data.characters[currentCharacter].name}
          image={gameCtx.data.characters[currentCharacter].image}
        />

        <View style={styles.gameButtonsContainer}>
          <FlatList
            scrollEnabled={false}
            data={houses}
            contentContainerStyle={{}}
            keyExtractor={(item) => item}
            renderItem={({ item }) => (
              <GameButton
                house={item}
                onSelect={handleSelectHouse}
                selectedHouse={selectedHouse?.house}
                isCorrect={!!selectedHouse?.isCorrect}
              />
            )}
            numColumns={2}
          />
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    backgroundColor: colors.background,
    flex: 1,
  },
  container: {
    flex: 1,
    gap: 20,
    padding: 12,
  },
  scoreContainer: {
    width: "100%",
    gap: 10,
    justifyContent: "space-between",
    flexDirection: "row",
  },
  gameButtonsContainer: {
    gap: 10,
  },
});
