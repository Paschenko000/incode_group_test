import { ActivityIndicator, StyleSheet, View, Text } from "react-native";

export function LoadingOverlay() {
  return (
    <View style={styles.loading}>
      <Text style={styles.message}>Loading...</Text>
      <ActivityIndicator size="small" color="black" />
    </View>
  );
}

const styles = StyleSheet.create({
  loading: {
    justifyContent: "center",
    flex: 1,
    alignItems: "center",
    gap: 5,
  },
  message: {
    fontSize: 16,
    fontWeight: "500",
    color: "#000",
  },
});
