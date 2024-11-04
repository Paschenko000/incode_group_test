import { Animated, FlatList, StyleSheet, View } from "react-native";
import { useContext, useState } from "react";
import { GameContext } from "../store/game-context";
import { ScoreContainer } from "../components/ui/ScoreContainer";
import { colors } from "../constants/colors";
import { Character } from "../components/Game/Character";
import { GameButton } from "../components/ui/GameButton";
import ScrollView = Animated.ScrollView;

const houses = [
  "Gryffindor",
  "Slytherin",
  "Ravenclaw",
  "Hufflepuff",
  "Not in House",
];

export default function HomeScreen() {
  const [currentCharacter, setCurrentCharacter] = useState(0);
  const game = useContext(GameContext);

  console.log(game.data.characters[0].image, "image");

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

        <FlatList
          scrollEnabled={false}
          data={houses}
          contentContainerStyle={{}}
          keyExtractor={(item) => item}
          renderItem={({ item }) => (
            <GameButton house={item} onSelect={() => {}} />
          )}
          numColumns={2}
        />
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
});
