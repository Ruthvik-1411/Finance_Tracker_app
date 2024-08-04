import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Text, View, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

import AddExpensesScreen from "./screens/AddExpensesScreen";
import TrackerScreen from "./screens/TrackerScreen";
import CardsScreen from "./screens/CardsScreen";
import InvestmentsScreen from "./screens/InvestmentsScreen";
import BankingScreen from "./screens/BankingScreen";
const Tab = createBottomTabNavigator();

const CustomTabBarButton = ({ children, onPress, ...props }) => (
  <TouchableOpacity
    style={{
      top: -25,
      justifyContent: "center",
      alignItems: "center",
    }}
    onPress={onPress}
  >
    <View
      style={{
        width: 39,
        height: 39,
        borderRadius: 5,
        backgroundColor: props.focused
          ? "rgba(128,128,128,1)"
          : "rgba(128,128,128,0.8)",
        transform: [{ rotate: "45deg" }],
      }}
    >
      {children}
    </View>
  </TouchableOpacity>
);

const Tabs = () => {
  return (
    <Tab.Navigator
      initialRouteName="Add"
      screenOptions={({ route }) => ({
        tabBarShowLabel: true, // defaults to true
        tabBarStyle: [
          {
            display: "flex",
          },
          null,
        ],
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === "Add") {
            iconName = focused ? "close" : "close";
            size = 35;
            color = focused ? "#ffffff" : "#f0f0f0";
          } else if (route.name === "Tracker") {
            iconName = focused ? "chart-arc" : "chart-arc";
            size = 25;
          } else if (route.name === "Cards") {
            iconName = focused
              ? "credit-card-settings"
              : "credit-card-settings-outline";
            size = 25;
          } else if (route.name === "Investments") {
            iconName = focused ? "finance" : "finance";
            size = 25;
          } else if (route.name === "Banking") {
            iconName = focused ? "bank" : "bank-outline";
            size = 25;
          }
          return <Icon name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: "black",
        tabBarInactiveTintColor: "gray",
      })}
    >
      <Tab.Screen
        name="Banking"
        component={BankingScreen}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name="Cards"
        component={CardsScreen}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name="Add"
        component={AddExpensesScreen}
        options={{
          headerShown: false,
          tabBarLabel: "",
          tabBarButton: (props) => (
            <CustomTabBarButton {...props} focused={true} />
          ),
        }}
      />
      <Tab.Screen
        name="Tracker"
        component={TrackerScreen}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name="Investments"
        component={InvestmentsScreen}
        options={{ headerShown: false }}
      />
    </Tab.Navigator>
  );
};

export default Tabs;
