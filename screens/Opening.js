import React from 'react';
import { View, Text, Image, Pressable, StyleSheet } from 'react-native';
import { Color } from '../GlobalStyle';
import { useNavigation } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';

const WelcomeScreen = () => {
  const navigation = useNavigation();

  const handleSignInPress = () => {
    navigation.navigate('LoginScreen');
  };

  const handleSignUpPress = () => {
    navigation.navigate('Register');
  };

  let [fontsLoaded, fontError] = useFonts({
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

  return (
    <View style={styles.container} onLayout={onLayoutRootView}>
      <Text style={styles.LogoText}>
        FITQUEST
      </Text>
      <Text style={styles.getStartedText}>Gamified Fitness Tracker</Text>
      <Pressable style={styles.buttons} onPress={handleSignInPress}>
        <Text style={styles.buttonText}>Sign In</Text>
      </Pressable>

      <Pressable style={styles.button} onPress={handleSignUpPress}>
        <Text style={styles.buttonTexts}>Sign Up</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  LogoText: {
    fontSize: 50,
    fontFamily: "Poppins-Black",
    color: Color.colorDarkorange,
   
  },
  getStartedText: {
    fontSize: 15,
    fontFamily: "Poppins-medium",
   
  },

  buttons: {
    backgroundColor: Color.colorDarkorange, 
    padding: 15,
    borderRadius: 8,
    marginVertical: 10,
    width: "80%",  
    alignItems: 'center',
    shadowColor: 'black',  
    shadowOpacity: 0.5,    
    shadowOffset: { width: 0, height: 2 },  
    shadowRadius: 4,       
  },
  
  button: {
    backgroundColor: 'transparent', 
    padding: 15,
    borderRadius: 8,
    marginVertical: 10,
    width: "80%",  
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'black',  
    shadowColor: 'black',  
    shadowOpacity: 0.5,    
    shadowOffset: { width: 0, height: 2 },  
    shadowRadius: 4,       
  },
  
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    fontFamily: "Poppins-medium",
  },

  buttonTexts: {
    color: Color.colorDarkorange,
    fontSize: 16,
    fontWeight: 'bold',
    fontFamily: "Poppins-medium",
  },
});

export default WelcomeScreen;