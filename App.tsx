import { StatusBar } from "expo-status-bar";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import HomeScreen from "./screens/HomeScreen";
import ListScreen from "./screens/ListScreen";
import { Ionicons } from "@expo/vector-icons";
import CharacterScreen from "./screens/CharacterScreen";
import { TextButton } from "./components/ui/TextButton";
import { colors } from "./constants/colors";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

// TODO: Reset button functionality
function GameNavigation() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerRight: () => (
          <TextButton
            text="Reset"
            color={colors.accent}
            onPress={() => console.log()}
          />
        ),
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home-outline" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="List"
        component={ListScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="list-outline" size={size} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <>
      <StatusBar style="dark" />
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="Game"
            component={GameNavigation}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Character"
            component={CharacterScreen}
            options={{ headerBackTitle: "Back" }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}
