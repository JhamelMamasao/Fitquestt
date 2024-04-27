import React, { useState } from "react";
import { StyleSheet, View, Image, Text, Pressable, ScrollView, ImageBackground} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { SafeAreaView } from "react-native-safe-area-context";
import { Color } from "../GlobalStyle";
import { BlurView } from 'expo-blur';

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
        navigation.navigate('ChooseQuest');
    };
    const handleTaskCreation = (difficulty) => {
        // Navigate to the Tracking screen and pass the difficulty level as a parameter
        navigation.navigate('Task', { difficulty });
      };
      

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <Pressable onPress={goBack}>
                    <Image source={require('../assets/images/Backblack.png')} style={styles.back} />
                </Pressable>
                <Text style={styles.textTask}>Running Task</Text>
            </View>      
            <ScrollView style={styles.scrollView}>
            <View style={styles.separator} />
                <View style={styles.content}>
                <Pressable onPress={() => handleTaskCreation('Getting Started')}>
                <ImageBackground source={require('../assets/images/bg2.png')} style={styles.box}>
                <View style={styles.inner} onPress={() => handleTaskCreation('Getting Started')}>
                    <BlurView intensity={90} tint='dark' style={styles.textContainer}>
                    <Text style={styles.innerText}>Getting Started</Text>
                    </BlurView>
                </View>
                </ImageBackground>
                </Pressable>

                <Pressable onPress={() => handleTaskCreation('Advance')}>
                <ImageBackground source={require('../assets/images/bg3.png')} style={styles.box}>
                <View style={styles.inner}>
                    <BlurView intensity={90} tint='dark' style={styles.textContainer}>
                    <Text style={styles.innerText}>Advance</Text>
                    </BlurView>
                </View>
                </ImageBackground>
                </Pressable>
                
                <Pressable onPress={() => handleTaskCreation('Hard')}>
                <ImageBackground source={require('../assets/images/bg4.png')} style={styles.box}>
                <View style={styles.inner}>
                    <BlurView intensity={90} tint='dark' style={styles.textContainer}>
                    <Text style={styles.innerText}>Hard</Text>
                    </BlurView>
                </View>
                </ImageBackground>
                </Pressable>

                <Pressable onPress={() => handleTaskCreation('Intermediate')}>
                <ImageBackground source={require('../assets/images/bg5.png')} style={styles.box}>
                <View style={styles.inner}>
                <BlurView intensity={90} tint='dark' style={styles.textContainer}>
                    <Text style={styles.innerText}>Intermediate</Text>
                    </BlurView>
                </View>
                </ImageBackground>
                </Pressable>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        position: 'relative',
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
        fontSize: 20,
        fontFamily: 'Poppins-Medium',
        marginTop: 18,
    },
    scrollView: {
        flex: 1,
        marginTop: 70, 
    },
    content: {
        paddingTop: 10, 
    },
    box: {
        padding: 10,
        marginVertical: 5,
        marginHorizontal: 10,
        width: "100%",
        height: 200, 
        
    },
    inner: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between', // Align items with space between them
        padding: 10,
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
    },
    innerText: {
        fontFamily: "Poppins-Medium",
        color: "white",
        fontSize: 20,
        zIndex: 3,
    },
    iconContainer: {
        marginLeft: 'auto', 
        top: 22,
        left: 10,
    },
    icon: {
        width: 150, 
        height: 260, 
    },
    separator: {
        borderBottomColor: 'gray',
        borderBottomWidth: 0.2,
    },
    textContainer: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: 55,
        width: '100%',
        justifyContent: 'center',
        paddingLeft: 10,
        zIndex: 2,
    },
    yeah: {
        width: "85%",
        height: 200,
        top: 18,
        left: 130,
    },
    innerTextt: {
        
    },
    
   
});

export default TaskCreation;
