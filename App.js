import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import TaskCreation from "./screens/TaskCreation";
import Opening from "./screens/Opening";
import Login from "./screens/Login";
import Register from "./screens/Register";
import Dashboard from "./screens/Dashboard";
import ChooseQuest from "./screens/ChooseQuest";
import Tracking from "./screens/Tracking";
import Fillup from "./screens/Fillup";
import Task from "./screens/Task";
import UserProfile from "./screens/UserProfile";
import ProgressReport from "./screens/ProgressReport";
import Leaderboards from "./screens/Leaderboards";


const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Leaderboards" component={Leaderboards} />
       <Stack.Screen name="Opening" component={Opening} />
        <Stack.Screen name="Dashboard" component={Dashboard} />
        <Stack.Screen name="Fillup" component={Fillup} />
        <Stack.Screen name="TaskCreation" component={TaskCreation} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="UserProfile" component={UserProfile} />
        <Stack.Screen name="ProgressReport" component={ProgressReport} />
        <Stack.Screen name="Task" component={Task} />
        <Stack.Screen name="Tracking" component={Tracking} />  
        <Stack.Screen name="Register" component={Register} />
        <Stack.Screen name="ChooseQuest" component={ChooseQuest} />          
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
