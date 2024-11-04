import { StyleSheet, View, Text } from "react-native";
import { colors } from "../../constants/colors";

export function ScoreContainer({
  score,
  name,
}: {
  score: number;
  name: string;
}) {
  return (
    <View style={styles.container}>
      <Text style={styles.score}>{score}</Text>
      <Text style={styles.text}>{name}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    gap: 5,
    alignItems: "center",
    backgroundColor: colors.lightGrey,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 10,
    padding: 15,
    flexGrow: 1,
  },
  score: {
    fontSize: 18,
    fontWeight: "500",
  },
  text: {
    fontSize: 14,
  },
});
