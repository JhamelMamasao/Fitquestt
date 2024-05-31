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
import ProgressReport from "./screens/ProgressReport";import * as React from "react";
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
import Challenge from "./screens/Challenge";
import ChallengeProfile from "./screens/ChallengeProfile";
import TaskForWalk from "./screens/TaskForWalk";
import WalkingTask from "./screens/WalkingTask";
import Notification from "./screens/Notification";
import Forgotpass from "./screens/Forgotpass";
import History from "./screens/History";
import VerificationCode from "./screens/VerificationCode";


const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false, // Hide headers if necessar
          animation: "fade", // Slide from right
        }}
      >
        <Stack.Screen name="VerificationCode" component={VerificationCode} />
        <Stack.Screen name="Opening" component={Opening} />
        <Stack.Screen name="Dashboard" component={Dashboard} />
         <Stack.Screen name="Tracking" component={Tracking} />  
      <Stack.Screen name="Forgotpass" component={Forgotpass} />
      <Stack.Screen name="History" component={History} />
      <Stack.Screen name="Notification" component={Notification} />
      <Stack.Screen name="Leaderboards" component={Leaderboards} />
      <Stack.Screen name="WalkingTask" component={WalkingTask} />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Challenge" component={Challenge} />
      <Stack.Screen name="ChallengeProfile" component={ChallengeProfile} />
      <Stack.Screen name="TaskForWalk" component={TaskForWalk} />
        <Stack.Screen name="Fillup" component={Fillup} />
        <Stack.Screen name="TaskCreation" component={TaskCreation} />
        <Stack.Screen name="UserProfile" component={UserProfile} />
        <Stack.Screen name="ProgressReport" component={ProgressReport} />
        <Stack.Screen name="Task" component={Task} />
        <Stack.Screen name="Register" component={Register} />
        <Stack.Screen name="ChooseQuest" component={ChooseQuest} />          
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;

import Leaderboards from "./screens/Leaderboards";
import Challenge from "./screens/Challenge";
import ChallengeProfile from "./screens/ChallengeProfile";
import TaskForWalk from "./screens/TaskForWalk";
import WalkingTask from "./screens/WalkingTask";
import Notification from "./screens/Notification";
import Forgotpass from "./screens/Forgotpass";
import History from "./screens/History";


const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false, // Hide headers if necessar
          animation: "fade", // Slide from right
        }}
      >
       <Stack.Screen name="Opening" component={Opening} />
        <Stack.Screen name="Dashboard" component={Dashboard} />
         <Stack.Screen name="Tracking" component={Tracking} />  
      <Stack.Screen name="Forgotpass" component={Forgotpass} />
      <Stack.Screen name="History" component={History} />
      <Stack.Screen name="Notification" component={Notification} />
      <Stack.Screen name="Leaderboards" component={Leaderboards} />
      <Stack.Screen name="WalkingTask" component={WalkingTask} />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Challenge" component={Challenge} />
      <Stack.Screen name="ChallengeProfile" component={ChallengeProfile} />
      <Stack.Screen name="TaskForWalk" component={TaskForWalk} />
        <Stack.Screen name="Fillup" component={Fillup} />
        <Stack.Screen name="TaskCreation" component={TaskCreation} />
        <Stack.Screen name="UserProfile" component={UserProfile} />
        <Stack.Screen name="ProgressReport" component={ProgressReport} />
        <Stack.Screen name="Task" component={Task} />
        <Stack.Screen name="Register" component={Register} />
        <Stack.Screen name="ChooseQuest" component={ChooseQuest} />          
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
