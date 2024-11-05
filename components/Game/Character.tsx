import { Image, View, Text, StyleSheet } from "react-native";
import { colors } from "../../constants/colors";

export function Character({ image, name }: { image: string; name: string }) {
  return (
    <View style={styles.container}>
      {image ? (
        <Image source={{ uri: image }} style={styles.image} />
      ) : (
        <View style={[styles.image, { backgroundColor: colors.lightGrey }]}>
          <Text> No image found</Text>
        </View>
      )}

      <Text style={styles.name}>{name}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    gap: 10,

    alignItems: "center",
  },
  image: {
    width: 200,
    height: 280,
    objectFit: "cover",
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  name: {
    color: colors.text,
    fontSize: 22,
    fontWeight: "500",
  },
});
