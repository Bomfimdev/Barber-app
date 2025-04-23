import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import HomeScreen from "./screens/HomeScreen";
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";
import ScheduleScreen from "./screens/ScheduleScreen";

export type RootStackParamList = {
  Login: undefined;
  Register: undefined;
  Home: undefined;
  Schedule: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: true, title: "" }} />
        <Stack.Screen name="Register" component={RegisterScreen} options={{ headerShown: true, title: "" }} />
        <Stack.Screen name="Schedule" component={ScheduleScreen} options={{ headerShown: true, title: "" }} />
        <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false, title: "" }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
