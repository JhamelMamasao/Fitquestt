import React, { useState } from "react";
import { StyleSheet, View, Image, Text, Pressable, ScrollView, ImageBackground} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { SafeAreaView } from "react-native-safe-area-context";
import { Color } from "../GlobalStyle";
import { BlurView } from 'expo-blur';

const WalkingTask = () => {
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
    const handleTaskCreation = (difficulty) => {
        // Navigate to the Tracking screen and pass the difficulty level as a parameter
        navigation.navigate('TaskForWalk', { difficulty });
      };
      
      

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <Pressable onPress={goBack}>
                    <Image source={require('../assets/images/backwhite.png')} style={styles.back} />
                </Pressable>
                <Text style={styles.textTask}>Walking Task</Text>
            </View>      
            <ScrollView style={styles.scrollView}>
            <View style={styles.separator} />
                <View style={styles.content}>
                <Pressable onPress={() => handleTaskCreation('Beginner')} style={styles.box1}>
                <Image source={require('../assets/images/bg6.png')} style={styles.coverImage} />
                <View style={styles.inner}>
                    <BlurView intensity={10} tint='light' style={styles.textContainer}>
                    <Text style={styles.innerText}>Getting Started</Text>
                    </BlurView>
                </View>
                </Pressable>
                <Pressable onPress={() => handleTaskCreation('Intermediate')} style={styles.box1}>
                <Image source={require('../assets/images/bg7.png')} style={styles.coverImage} />
                <View style={styles.inner}>
                    <BlurView intensity={10} tint='light' style={styles.textContainer}>
                    <Text style={styles.innerText}>Intermediate</Text>
                    </BlurView>
                </View>
                   
                </Pressable>
                
                <Pressable onPress={() => handleTaskCreation('Advance')} style={styles.box1}>
                <Image source={require('../assets/images/bg9.png')}style={styles.coverImage}/>
                <View style={styles.inner}>
                    <BlurView intensity={10} tint='light' style={styles.textContainer}>
                    <Text style={styles.innerText}>Advance</Text>
                    </BlurView>
                </View>
                </Pressable>

                <Pressable onPress={() => handleTaskCreation('Expert')} style={styles.box1}>
                <Image source={require('../assets/images/bg10.png')} style={styles.coverImage}/>
                <View style={styles.inner}>
                <BlurView intensity={10} tint='light' style={styles.textContainer}>
                    <Text style={styles.innerText}>Expert</Text>
                    </BlurView>
                </View>
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
        backgroundColor: "#1F1F1F",
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
        color: 'white',
    },
    scrollView: {
        flex: 1,
        marginTop: 70, 
    },
    content: {
        paddingTop: 10, 
    },
    box1: {
        marginVertical: 10,
        marginHorizontal: 10,
        width: "95%",
        height: 190,
        backgroundColor: '#fefefe',
        borderRadius: 10,
        overflow: 'hidden', 
        elevation: 8,
      },
      coverImage: {
        padding: 10, // Move the padding from box1 to coverImage
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
        opacity: 0.85,
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
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
    },
    innerText: {
        fontFamily: "Poppins-Medium",
        color: "white",
        fontSize: 18,
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
        borderBottomColor: 'white',
        borderBottomWidth: 0.2,
    },
    textContainer: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: 45,
        width: '100%',
        justifyContent: 'center',
        paddingLeft: 10,
        zIndex: 2,
        backgroundColor: Color.colorDarkorange,
        opacity: 0.9,
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

export default WalkingTask;
