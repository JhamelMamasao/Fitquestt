import React from "react";
import { View, Text, Pressable, Image, StyleSheet } from "react-native";
import { Color } from "../GlobalStyle";
import { useFonts } from 'expo-font';
import { useNavigation } from "@react-navigation/native";


const WelcomeScreen = () => {
    const navigation = useNavigation();

    const handleSignUpPress = () => {
        navigation.navigate('Register');
    };

    const handleSignInPress = () => {
        navigation.navigate('Login');
    };

    let [fontsLoaded, fontError] = useFonts({
        "Poppins-Medium": require('../assets/fonts/Poppins-Medium.ttf'),
        "Poppins-Bold": require('../assets/fonts/Poppins-Bold.ttf'),
        "Poppins-Black": require('../assets/fonts/Poppins-Black.ttf'),
    });
    if (!fontsLoaded && !fontError) {
        return null;
    }

return (
    <View style={styles.container}>
        <Image source={require('../assets/images/background.jpg')} style={styles.backgroundImage} />
        <View style={styles.overlay}></View>
        <View style={styles.contentContainer}>
            <Image source={require('../assets/images/FinalLogo.png')} style={styles.Logo1} />
            <Text style={styles.getStartedText}>Gamified Fitness Tracker</Text>
            <Pressable style={styles.buttons} onPress={handleSignInPress}>
                    <Text style={styles.buttonText}>Sign In</Text>
                </Pressable>
                <Pressable style={styles.button} onPress={handleSignUpPress}>
                    <Text style={styles.buttonTexts}>Sign Up</Text>
            </Pressable>
        </View>
    </View>
    );
 };

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    backgroundImage: {
        position: 'absolute',
        width: '180%',
        height: '130%',
        top: 0,
        left: '-15%',
        backgroundColor: 'white',
        resizeMode: 'cover',
    },
    overlay: {
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0,0,0,0.6)',
        position: 'absolute',
    },
    contentContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 2,  
    },
    Logo1: {
      position: 'absolute',
      width: 350,
      height: 350,
      top: 120,
      
    },
    getStartedText: {
        fontSize: 13,
        fontFamily: "Poppins-Medium",
        color: '#fefefe',
        top: 5,
        
    },
    buttons: {
        backgroundColor: Color.colorDarkorange,
        padding: 18,
        borderRadius: 8,
        marginVertical: 10,
        width: 300,
        alignItems: 'center',
        shadowColor: 'black',
        shadowOpacity: 0.5,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 4,
        elevation: 8,
        zIndex: 2,
        top: 10,
    },
    button: {
        backgroundColor: '#fefefe',
        padding: 18,
        borderRadius: 8,
        marginVertical: 5,
        width: 300,
        alignItems: 'center',
        borderColor: 'black',
        shadowColor: 'black',
        shadowOpacity: 0.5,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 5,
        elevation: 8,
        zIndex: 2,
        top: 10,
    },
    buttonText: {
        color: 'white',
        fontSize: 13,
        fontWeight: 'bold',
        fontFamily: "Poppins-Medium",
    },
    buttonTexts: {
        color: Color.colorDarkorange,
        fontSize: 13,
        fontWeight: 'bold',
        fontFamily: "Poppins-Medium",
    },
});
    

export default WelcomeScreen;

