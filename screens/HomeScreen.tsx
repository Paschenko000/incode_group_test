import { Animated, FlatList, StyleSheet, View } from "react-native";
import { useContext, useEffect, useState } from "react";
import { GameContext } from "../store/game-context";
import { ScoreContainer } from "../components/ui/ScoreContainer";
import { colors } from "../constants/colors";
import { Character } from "../components/Game/Character";
import { GameButton } from "../components/ui/GameButton";
import ScrollView = Animated.ScrollView;
import { IconButton } from "../components/ui/IconButton";

const houses = [
  "Gryffindor",
  "Slytherin",
  "Ravenclaw",
  "Hufflepuff",
  "Not in House",
];

export default function HomeScreen() {
  const [currentCharacter, setCurrentCharacter] = useState(0);
  const [nextBtnIsDisabled, setNextBtnIsDisabled] = useState(true);
  const [selectedHouse, setSelectedHouse] = useState<{
    house: string;
    isCorrect: boolean;
  }>(null);

  useEffect(() => {
    setSelectedHouse(null);
  }, [currentCharacter]);

  const game = useContext(GameContext);

  function handleSelectHouse(house: string) {
    const { id, house: gameHouse } = game.data.characters[currentCharacter];
    const isCorrect = gameHouse === house;

    game.addGuessedCharacters({ attempt: isCorrect, id });
    setSelectedHouse({ house, isCorrect });

    setNextBtnIsDisabled(false);
  }

  function handleNextBtnPress() {
    setCurrentCharacter(() => currentCharacter + 1);
    setNextBtnIsDisabled(true);
  }

  return (
    <ScrollView style={styles.scollContainer}>
      <View style={styles.container}>
        <View style={styles.scoreContainer}>
          <ScoreContainer score={game.data.totalAttempts} name="Total" />
          <ScoreContainer score={game.data.successfulAttempts} name="Success" />
          <ScoreContainer score={game.data.failedAttempts} name="Failed" />
        </View>

        <Character
          name={game.data.characters[currentCharacter].name}
          image={game.data.characters[currentCharacter].image}
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
          <IconButton
            icon="chevron-forward-outline"
            text="Next"
            disabled={nextBtnIsDisabled}
            onPress={handleNextBtnPress}
            style={{ alignSelf: "flex-end" }}
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
    marginHorizontal: 5,
    justifyContent: "space-between",
    flexDirection: "row",
  },
  gameButtonsContainer: {
    gap: 10,
  },
});
