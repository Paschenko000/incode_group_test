import { Pressable, StyleSheet, Text } from "react-native";
import { useState } from "react";

import { colors } from "../../constants/colors";

export function GameButton({
  house,
  onSelect,
  selectedHouse,
  isCorrect,
}: {
  house: string;
  onSelect: (house: string) => void;
  selectedHouse?: string;
  isCorrect: boolean;
}) {
  return (
    <Pressable
      onPress={() => onSelect(house)}
      disabled={!!selectedHouse}
      style={({ pressed }) => [
        pressed && styles.pressed,
        styles.container,
        selectedHouse === house && {
          backgroundColor: isCorrect ? colors.green : colors.red,
        },
      ]}
    >
      <Text style={styles.house}>{house}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  pressed: {
    opacity: 0.7,
  },
  container: {
    margin: 5,
    flex: 1,
    borderWidth: 1,
    borderRadius: 10,
    backgroundColor: colors.lightGrey,
    borderColor: colors.border,
    alignItems: "center",
    justifyContent: "center",
    minHeight: 50,
  },
  house: {
    fontSize: 18,
  },
});
