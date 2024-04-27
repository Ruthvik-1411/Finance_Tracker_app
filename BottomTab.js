import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Text, View, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import AddExpensesScreen from './screens/AddExpensesScreen';
import TrackerScreen from './screens/TrackerScreen';
import CardsScreen from './screens/CardsScreen';
import InvestmentsScreen from './screens/InvestmentsScreen';
import BankingScreen from './screens/BankingScreen';
const Tab = createBottomTabNavigator();

const CustomTabBarButton = ({ children, onPress, ...props }) => (
  <TouchableOpacity
    style={{
      top: -25,
      justifyContent: 'center',
      alignItems: 'center',
    }}
    onPress={onPress}>
    <View
      style={{
        width: 60,
        height: 60,
        borderRadius: 35,
        backgroundColor: props.focused ? '#0f0f0f' : '#0f0f0f',
        // backgroundColor: '#000000',
      }}>
      {children}
    </View>
  </TouchableOpacity>
);

const Tabs = () => {
  return (
    <Tab.Navigator
      // tabBarOptions={{
      //   showLabel: false,
      // }}
      initialRouteName="Add"
      screenOptions={({ route }) => ({
        "tabBarShowLabel": false,
        "tabBarStyle": [{
            "display": "flex"
          },
        null
        ],
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Add') {
            iconName = focused ? 'plus' : 'plus';
            size=55;
            color = focused ? '#ffffff' : '#f0f0f0';
          } else if (route.name === 'Tracker') {
            iconName = focused ? 'chart-arc' : 'chart-arc';
            size=30;
          } else if (route.name === 'Cards') {
            iconName = focused ? 'credit-card-settings' : 'credit-card-settings-outline';
            size=30;
          } else if (route.name === 'Stocks') {
            iconName = focused ? 'finance' : 'finance';
            size=30;
          } else if (route.name === 'Bank') {
            iconName = focused ? 'bank' : 'bank-outline';
            size=30;
          }
          return <Icon name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: 'black',
        tabBarInactiveTintColor: 'gray',
      })}>
      <Tab.Screen
        name="Bank"
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
          tabBarButton: (props) => <CustomTabBarButton {...props} focused={true} />,
        }}
      />
      <Tab.Screen
        name="Tracker"
        component={TrackerScreen}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name="Stocks"
        component={InvestmentsScreen}
        options={{ headerShown: false }}
      />
    </Tab.Navigator>
  );
};

export default Tabs;
