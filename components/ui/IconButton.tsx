import { Pressable, StyleSheet, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "../../constants/colors";

type IconButtonProps = {
  icon: string;
  text: string;
  disabled: boolean;
  style?: object;
  onPress: () => void;
};
export function IconButton({
  icon,
  text,
  disabled,
  style,
  onPress,
}: IconButtonProps) {
  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      style={[styles.container, style]}
    >
      <Text style={styles.text}>{text}</Text>
      <Ionicons name={icon} color={colors.accent} size={20} />
    </Pressable>
  );
}
const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    gap: 2,
    alignItems: "center",
  },
  text: {
    fontSize: 16,
    color: colors.accent,
    fontWeight: "500",
  },
});
