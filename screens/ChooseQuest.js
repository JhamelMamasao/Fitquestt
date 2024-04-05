import React, { useState } from "react";
import { StyleSheet, View, Image, Text, Pressable } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { SafeAreaView } from "react-native-safe-area-context";
import { Color } from "../GlobalStyle";
import Dashboard from "./Dashboard";

const ChooseQuest = () => {
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
    navigation.goBack();
  };
  const Tracking = () => {
    navigation.navigate('TaskCreation');
  };


  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerContainer}>
        <Pressable onPress={goBack} style={styles.backButton}>
          <Image source={require('../assets/images/backwhite.png')} style={styles.back} />
        </Pressable>
        <Image source={require('../assets/images/back2.jpg')} style={styles.header} />
      </View>

      <View style={styles.box}>
        <Text style={styles.TitleText}>Choose Quest</Text>
        <View style={styles.box1}>
          <Pressable style={styles.Buttons} onPress={Tracking}>
            <Text style={styles.ButtonText}>Daily Quest</Text>
          </Pressable>
          <Pressable style={styles.Buttons}>
            <Text style={styles.ButtonText}>Walking Quest</Text>
          </Pressable>
        </View>
      </View>
    </SafeAreaView>        
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerContainer: {
    position: 'absolute',
    zIndex: 1,
    width: '110%',
    height: '90%',
    bottom: 350,
  },
  header: {
    flex: 1.2,
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  backButton: {
    position: 'absolute',
    top: 300,
    left: 25,
    width: 30,
    height: 30,
    zIndex: 2,
  },
  back: {
    width: '70%',
    height: '70%',
    resizeMode: 'cover',
  },
  box: {
    flex: 1.6,
    backgroundColor: Color.colorDarkorange,
    zIndex: 2,
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    marginTop: '90%',
  },
  box1: {
    backgroundColor: 'white',
    borderTopRightRadius: 50,
    borderTopLeftRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 80,
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
  Buttons: {
    backgroundColor: Color.colorDarkorange,
    padding: 35,
    borderRadius: 55,
    width: '90%',
    alignItems: 'center',
    shadowColor: 'black',
    shadowOpacity: 0.5,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    marginBottom: 30,
    bottom: 50,
    elevation: 8,
  },
  ButtonText: {
    fontFamily: 'Poppins-Medium',
    fontSize: 20,
    color: 'white',
  },
  TitleText: {
    textAlign: 'center',
    fontFamily: 'Poppins-Bold',
    fontSize: 25,
    color: 'white',
    marginTop: 23,
  },
  runns: {
    height: '100%',
    width: '100%',
    marginLeft: 10,
  }
});

export default ChooseQuest;
