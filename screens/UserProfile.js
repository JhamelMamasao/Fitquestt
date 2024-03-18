import React, { useState } from "react";
import { StyleSheet, View, Image, Text, Pressable } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { SafeAreaView } from "react-native-safe-area-context";
import { Color } from "../GlobalStyle";
import LevelUpBar from "./LevelUpBar";

const UserProfile = () => {
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

    const FinalDashboard = () => {
        navigation.navigate('FinalDashboard');
    };

    return (
        <View style={styles.container}> 
            <View style={styles.header}>
                <Pressable onPress={FinalDashboard}>
                    <Image source={require('../assets/images/backwhite.png')} style={styles.back} />
                </Pressable>
                <Text style={styles.headertext}>User Profile</Text>
            </View>
            <View style={styles.images}>
            </View>
            <Text style={styles.textname}>Jhamel Mamasao</Text>
            <LevelUpBar
                    currentLevel={1}
                    experience={300}
                    experienceToNextLevel={500}
                />
            <View style={styles.Box}>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    header: { 
        top: 40, 
        left: 0, 
        right: 0, 
        alignItems: 'center',
        padding: 20,
        justifyContent: 'space-between',
        flexDirection: 'row',
        alignContent: 'space-between',
        backgroundColor: Color.colorDarkorange,
    },
    back: {
        width: 20,
        height: 20,
    },
    headertext: {
        fontFamily: 'Poppins-Medium',
        fontSize: 18,
        color: 'white',
        textAlign: 'center',
        flex: 1,
    },
    images: {
        width: 100,
        height: 100,
        borderRadius: 100 / 2,
        backgroundColor: Color.colorDarkorange,
        alignItems: 'center',
        alignSelf: 'center',
        top: 60,
        elevation: 8,
    },
    textname: {
        textAlign: 'center',
        alignSelf: 'center',
        top: 65,
        fontFamily: 'Poppins-Medium',
        fontSize: 20,
        color: Color.colorDarkorange,
    },
    Box: {
        width: '90%',
        height: '40%',
        backgroundColor: 'white',
        borderRadius: 15,
        justifyContent: 'center',
        alignSelf: 'center',
        top: 80,
        elevation: 10,
    }
});

export default UserProfile;
