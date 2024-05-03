import { Text, View, StyleSheet } from "react-native";

export default function Logo() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Todo-List!</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
  },
  text: {
    textAlign: "center",
    fontSize: 45,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#d62828",
  },
});
