import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";


import Opening from "./screens/Opening";
import Login from "./screens/Login";
import Register from "./screens/Register";
import Dashboard from "./screens/Dashboard";
import ChooseQuest from "./screens/ChooseQuest";
import Tracking from "./screens/Tracking";
import Fillup from "./screens/Fillup";


const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Opening" component={Opening} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Register" component={Register} />
        <Stack.Screen name="Dashboard" component={Dashboard} />
        <Stack.Screen name="ChooseQuest" component={ChooseQuest} />
        <Stack.Screen name="Tracking" component={Tracking} />    
        <Stack.Screen name="Fillup" component={Fillup} />       
      </Stack.Navigator>
    </NavigationContainer>
  );
};


export default App;