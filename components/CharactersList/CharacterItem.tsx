import { Image, StyleSheet, View, Text, Pressable } from "react-native";
import { colors } from "../../constants/colors";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";

type CharacterItemProps = {
  id: string;
  name: string;
  image: string;
  attempts: boolean[];
};
export function CharacterItem({
  name,
  image,
  id,
  attempts,
}: CharacterItemProps) {
  const navigation = useNavigation();
  function handleSelectCharacter() {
    navigation.navigate("Details", {
      characterId: id,
    });
  }

  const containsSuccessfulAttempts = attempts.includes(true);

  return (
    <View style={styles.container}>
      <Pressable
        style={styles.characterContainer}
        onPress={handleSelectCharacter}
      >
        {image ? (
          <Image source={{ uri: image }} style={styles.image} />
        ) : (
          <View
            style={[styles.image, { backgroundColor: colors.lightGrey }]}
          ></View>
        )}

        <View style={styles.infoContainer}>
          <Text style={styles.name}>{name}</Text>
          <Text style={styles.attempts}>Attempts: {attempts.length}</Text>
        </View>
      </Pressable>

      <View style={styles.buttonsContainer}>
        {containsSuccessfulAttempts ? (
          <Ionicons
            name="checkmark-circle-outline"
            size={30}
            color={colors.green}
          />
        ) : (
          <>
            <Pressable>
              <Ionicons
                name="refresh-outline"
                size={30}
                color={colors.darkGrey}
              />
            </Pressable>
            <Ionicons
              name="close-circle-outline"
              size={30}
              color={colors.red}
            />
          </>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 10,
    marginVertical: 10,
  },
  image: {
    height: 45,
    width: 30,
  },
  characterContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  infoContainer: {
    gap: 5,
    alignItems: "flex-start",
  },
  name: {
    fontSize: 14,
    fontWeight: "500",
    color: colors.text,
  },
  attempts: {
    fontSize: 14,
    color: colors.text,
  },
  buttonsContainer: {
    flexDirection: "row",
    gap: 10,
    alignItems: "center",
  },
});