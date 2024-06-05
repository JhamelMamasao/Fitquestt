import React, { useState } from 'react';
import { View, TextInput, StyleSheet, SafeAreaView, Text, Pressable} from 'react-native';
import { useFonts } from 'expo-font';
import { useNavigation } from "@react-navigation/native";
import { Color } from '../GlobalStyle';

const VerificationCodeScreen = () => {
   const [code, setCode] = useState(Array(6).fill(''));
   const navigation = useNavigation();
   const [fontError, setFontError] = useState(false); // Initialize an array with 6 empty strings

  const handleChange = (text, index) => {
    const newCode = [...code];
    newCode[index] = text;
    setCode(newCode);
  };
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


  return (
   <SafeAreaView style={styles.container}>
       <Text style={styles.Enter}>Enter Verification Code</Text>
      <Text style={styles.description}>Please enter the verification code {' \n '} we sent to your email address</Text>
    <View style={styles.containers}>
      {code.map((_, i) => (
        <TextInput
          key={i}
          style={styles.input}
          keyboardType="number-pad"
          maxLength={1}
          placeholderTextColor={'white'}
          onChangeText={(text) => handleChange(text, i)}
          value={code[i]}
        />
      ))}
    </View>
    <Pressable style={styles.button}>
         <Text style={{color: 'red', fontFamily: 'Poppins-Medium', fontSize: 15}}>Resend Code?</Text>
    </Pressable>
    <Pressable style={styles.buttons}>
         <Text style={{color: 'white', fontFamily: 'Poppins-Medium', fontSize: 15}}>Verify</Text>
      </Pressable>
   </SafeAreaView>
  );
};

const styles = StyleSheet.create({
   container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#1f1f1f',
   },
  containers: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  input: {
    width: 45,
    height: 45,
    borderWidth: 1,
    borderColor: 'white',
    textAlign: 'center',
    margin: 3,
    borderRadius: 10,
  },
  Enter: {
   color: 'white',
   fontSize: 20,
   fontFamily: 'Poppins-Medium',
   marginBottom: 10,
  },
  description: {
   color: 'white',
   fontSize: 13,
   fontFamily: 'Poppins-Medium',
   marginBottom: 20,
   textAlign: 'justify',
  },
   button: {
    width: '90%',
    height: 50,
    backgroundColor: 'transparent',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    top: 20,
   },
   buttons: {
    width: '90%',
    height: 50,
    backgroundColor: Color.colorDarkorange,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    top: 40,
   },
});

export default VerificationCodeScreen;