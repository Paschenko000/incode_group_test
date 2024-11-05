import { Pressable, StyleSheet, TextInput, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "../../constants/colors";

export function SearchFilter({
  onChange,
}: {
  onChange: (text: string) => void;
}) {
  return (
    <View style={styles.searchContainer}>
      <TextInput
        placeholder="Find characters..."
        style={styles.input}
        placeholderTextColor={colors.darkGrey}
        onChange={(e) => onChange(e.nativeEvent.text)}
      />
      <Pressable>
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
    height: 45,
    padding: 10,
    borderColor: colors.border,
    justifyContent: "space-between",
    gap: 5,
  },
  input: {
    fontSize: 16,
    flexShrink: 1,
  },
});
