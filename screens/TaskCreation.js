import React, { useState } from "react";
import { StyleSheet, View, Image, Text, Pressable } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { SafeAreaView } from "react-native-safe-area-context";
import { Color } from "../GlobalStyle";

const TaskCreation = () => {
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
        <Pressable style={styles.header}>
            <Image onPress={goBack} source={require('../assets/images/Backblack.png')} style={styles.back}/>
        </Pressable>
    </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        flex: 1.2, 
        alignItems: 'flex-start',
    },
    back: {
        width: '6%',
        height: '3%',
        left: '3%',
        top: '3%',
    }
    
});

export default TaskCreation;
