import { Pressable, StyleSheet, Text } from "react-native";
import { colors } from "../../constants/colors";

export function GameButton({
  house,
  onSelect,
}: {
  house: string;
  onSelect: () => void;
}) {
  return (
    <Pressable style={styles.container}>
      <Text style={styles.house}>{house}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    margin: 5,
    flex: 1,
    borderWidth: 1,
    borderRadius: 10,
    backgroundColor: colors.lightGrey,
    borderColor: colors.border,
    alignItems: "center",
    justifyContent: "center",
    minHeight: 60,
  },
  house: {
    fontSize: 18,
  },
});
