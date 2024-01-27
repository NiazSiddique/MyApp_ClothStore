import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

import HomeScreen from './screens/HomeScreen';
import ProductsScreen from './screens/ProductsScreen';
import CustomersOverview from './screens/CustomersOverview';
import OrderManageScreen from './screens/OrderManageScreen';
import SettingsScreen from './screens/SettingsScreen';
import AddProductScreen from './screens/AddProductScreen';
import PrdctContextProvider from './store/product-context';
import AddCustomerScreen from './screens/AddCustomerScreen';
import CartScreen from './screens/CartScreen';

const Stack = createNativeStackNavigator();
const BottomTabs = createBottomTabNavigator();

function GeneralOverview() {
  return (
    <BottomTabs.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: '#4f67ef' },
        headerTintColor: '#b9c1ef',
        tabBarStyle: { backgroundColor: '#4f67ef' },
        tabBarActiveTintColor: '#b9c1ef',
      }}
    >
      <BottomTabs.Screen
        name="HomeB"
        component={HomeScreen}
        options={{
          headerShown: false,
          tabBarLabel: 'Home',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home" size={size} color={color} />
          ),
        }}
      />
      <BottomTabs.Screen
        name="OrdersOverView"
        component={CartScreen}
        options={{
          headerShown: false,
          tabBarLabel: 'OrdersOverView',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="cart" size={size} color={color} />
          ),
        }}
      />
    </BottomTabs.Navigator>
  );
}

export default function App() {
  return (
    <>
      <StatusBar style="light" />
      <PrdctContextProvider>
        <NavigationContainer>
          <Stack.Navigator
            initialRouteName=""
            screenOptions={{
              headerStyle: { backgroundColor: '#1563e9' },
              headerTintColor: '#b9c1ef',
              contentStyle: { backgroundColor: '#abc7ed' },
            }}
          >
            <Stack.Screen name="Home" component={GeneralOverview} />
            <Stack.Screen name="AllProducts" component={ProductsScreen} />
            <Stack.Screen name="Customers" component={CustomersOverview} />
            <Stack.Screen name="Orders" component={OrderManageScreen} />
            <Stack.Screen name="OrdersOverview" component={CartScreen} />
            <Stack.Screen name="AddProduct" component={AddProductScreen} />
            <Stack.Screen name="AddCustomer" component={AddCustomerScreen} />
          </Stack.Navigator>
        </NavigationContainer>
      </PrdctContextProvider>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
