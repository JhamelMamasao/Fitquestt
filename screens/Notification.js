import React, { useState } from "react";
import { StyleSheet, View, Image, Text, Pressable } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { SafeAreaView } from "react-native-safe-area-context";
import { Color } from "../GlobalStyle";
import Dashboard from "./Dashboard";

const Notification = () => {
  const navigation = useNavigation();
  const [fontError, setFontError] = useState(false); 
  
  let [fontsLoaded] = useFonts({
    "Poppins-Medium": require('../assets/fonts/Poppins-Medium.ttf'),
    "Poppins-Bold": require('../assets/fonts/Poppins-Bold.ttf'),
    "Poppins-Black": require('../assets/fonts/Poppins-Black.ttf'),
  });

  const onLayoutRootView = React.useCallback(async () => {
    if (fontsLoaded || fontError) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontError]);

  if (!fontsLoaded && !fontError) {
    return null;
  }

  const goBack = () => {
   navigation.navigate('Dashboard');
  };


  return (
   <SafeAreaView style={styles.container}>
   <View style={styles.header}>
       <Pressable onPress={goBack}>
           <Image source={require('../assets/images/Backblack.png')} style={styles.back} />
       </Pressable>
       <Text style={styles.textTask}>Notification</Text>
   </View>   
   <View style={styles.separator} />
   </SafeAreaView>  
  );
};

const styles = StyleSheet.create({
   container: {
      flex: 1,
      position: 'relative',
      backgroundColor: "#fefefe",
  },
  header: {
      position: 'absolute',
      top: 45,
      left: 0,
      right: 0,
      zIndex: 1,
      flexDirection: 'row',
  },
  back: {
      width: 15,
      height: 15,
      margin: 25,
  },
  textTask: {
      fontSize: 18,
      fontFamily: 'Poppins-Medium',
      marginTop: 20,
  },
  separator: {
   borderBottomColor: 'gray',
   borderBottomWidth: 0.2,
   top: 70,
},
  
});

export default Notification;
