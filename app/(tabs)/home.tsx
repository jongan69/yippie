import { Text, View, StyleSheet } from "react-native";
import { usePokemonList } from "@hooks/usePokemon";

const Home = () => {
  const { data } = usePokemonList();

  return (
    <View style={styles.container}>
      <View style={styles.main}>
        <Text style={styles.title}>Yippie!</Text>
        <View className="flex-1 items-center justify-center bg-red-500">
          <Text className="text-md font-bold">You Made it</Text>
        </View>
        <Text style={styles.subtitle}>{`There is no app, I love you <3`}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    padding: 24,
  },
  main: {
    flex: 1,
    justifyContent: "center",
    maxWidth: 960,
    marginHorizontal: "auto",
  },
  title: {
    fontSize: 64,
    fontWeight: "bold",
  },
  subtitle: {
    fontSize: 36,
    color: "#38434D",
  },
  linkButton: {
    fontSize: 24,
    color: "#1B95E0",
    marginTop: 16,
  },
});

export default Home;
