import { Pressable, StyleSheet, Text } from "react-native";

type TextButtonProps = {
  text: string;
  color: string;
  onPress: () => void;
};

export function TextButton({ text, color, onPress }: TextButtonProps) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [pressed && styles.pressed, styles.container]}
    >
      <Text style={[styles.text, { color }]}>{text}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  pressed: {
    opacity: 0.7,
  },
  container: {
    marginHorizontal: 15,
  },
  text: {
    fontSize: 16,
    fontWeight: "500",
  },
});
