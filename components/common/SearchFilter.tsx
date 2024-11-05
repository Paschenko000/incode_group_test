import { Pressable, StyleSheet, TextInput, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "../../constants/colors";
import { useRef } from "react";

export function SearchFilter({
  onChange,
}: {
  onChange: (text: string) => void;
}) {
  const inputRef = useRef<TextInput>();

  return (
    <View style={styles.searchContainer}>
      <TextInput
        ref={inputRef}
        placeholder="Find characters..."
        style={styles.input}
        placeholderTextColor={colors.darkGrey}
        onChange={(e) => onChange(e.nativeEvent.text)}
      />
      <Pressable onPress={() => inputRef.current?.blur()}>
        <Ionicons name="search-outline" color={colors.darkGrey} size={22} />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    backgroundColor: colors.lightGrey,
    borderRadius: 10,
    borderColor: colors.border,
    justifyContent: "space-between",
    gap: 5,
  },
  input: {
    padding: 10,
    flex: 1,
    fontSize: 16,
  },
});
