import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Pressable, Image, Button} from 'react-native';
import { useNavigation, useRoute  } from '@react-navigation/native';
import { Color } from '../GlobalStyle';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { SafeAreaView } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { jwtDecode } from 'jwt-decode';
import base64 from 'base-64';
import "core-js/stable/atob";

const TaskWalkingScreen = () => {
    const [taskDescription, setDesription] = useState('')
    const [Km, setDistance] = useState(0);
    const [rewardExp, setRewards] = useState(0);
    const route = useRoute();
    const { difficulty } = route.params;
    const navigation = useNavigation();
    const [fontError, setFontError] = useState(false);
    const [name, setName] = useState('');

    const Quest = async () => {
    try {
        const token = await AsyncStorage.getItem('access');
        if (!token) {
            throw new Error('Token not found');
        }

        const headers = {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        };

        // Fetch the list of quests from the API
        const response = await fetch(`https://fit-quest.azurewebsites.net/api/quest/`, {
            method: 'GET',
            headers: headers
        });

        if (!response.ok) {
            throw new Error('Failed to fetch quest data');
        }

        const responseData = await response.json();
        const { results } = responseData;

        // Shuffle the array of quests with the first quest prioritized
        shuffleArray(results, 0);

        // Select the first quest from the shuffled array
        const randomQuest = results[0];
        console.log(randomQuest);

        // Assuming setDescription is defined in your component, set the description of the random quest
        setDesription(randomQuest.description);
        setDistance(randomQuest.distance);
        setRewards(randomQuest.prize);

    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
};

// Function to shuffle array elements with the first element prioritized
function shuffleArray(array, firstIndex) {
    const firstElement = array[firstIndex];
    array.splice(firstIndex, 1);
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    array.unshift(firstElement);
}
useEffect(() => {
    Quest();
}, []); // Fetch data when component mounts

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
        navigation.goBack(); // Use navigation.goBack() to navigate back
    };


    const navigateToTracking = () => {
        navigation.navigate('Tracking', { targetDistance: Km }); // Pass Km as parameter
    };


   

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <Pressable onPress={goBack}>
                    <Image source={require('../assets/images/backwhite.png')} style={styles.back} />
                </Pressable>
                <Text style={styles.textTask}>Task</Text>
            </View>   
            <Text style={styles.RunnerText}>WALKING</Text>
              <Image source={require('../assets/images/bg8.png')} style={styles.runner} ></Image>
            <Text style={styles.RunnerText2}>WALKING</Text>
            <View style={styles.box}>
                <Text style={styles.TitleText}>{difficulty}</Text>
                <Text style={styles.Description}>{taskDescription}</Text>
                <View style={styles.boxContainer}>
                    <View style={styles.boxmini}>
                        <Image source={require('../assets/images/Location.png')} style={styles.imagebox} />
                    </View>
                    <Text style={styles.km}>{Km} Kilometers</Text>
                </View>
                <View style={styles.boxContainer}>
                    <View style={styles.boxmini}>
                        <Image source={require('../assets/images/Prize.png')} style={styles.imagebox} />
                    </View>
                    <Text style={styles.km}>{rewardExp} FitCoin</Text>
                </View>
                <Pressable style={styles.buttonStart} onPress={navigateToTracking}>
                    <Text style={styles.buttontext}>Start</Text>
                </Pressable>
                <Pressable style={styles.buttonCancel} onPress={goBack}>
                    <Text style={styles.buttontext}>Cancel</Text>
                </Pressable>
            </View>
        </SafeAreaView>        
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        position: 'relative',
        backgroundColor: Color.colorDarkorange,
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
    RunnerText: {
        fontSize: 110,
        fontFamily: 'Poppins-Medium',
        color: 'white',
        marginLeft: -120,
        marginTop: 80,
        opacity: 0.3,
        zIndex: 1,
    },
    RunnerText2: {
        fontSize: 110,
        fontFamily: 'Poppins-Medium',
        color: 'white',
        marginLeft: 100,
        bottom: 30,
        opacity: 0.3,
        zIndex: 0,
    },
    runner: {
        position: 'absolute',
        zIndex: 1,
        width: "90%",
        height: "50%",
        justifyContent: 'center',
        alignSelf: 'center',
        top: 53,
    },
    box: {
        position: 'absolute',
        width: "100%",
        height: '50%',
        bottom: 0,
        backgroundColor: 'white',
        flex: 1,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        elevation: 2,
        zIndex: 2,
    },
    TitleText: {
        fontSize: 20,
        fontFamily: 'Poppins-Medium',
        paddingLeft: 20,
        paddingTop: 20,
    },
    Description: {
        fontSize: 13,
        fontFamily: 'Poppins-Medium',
        paddingLeft: 20,
        paddingRight: 12,
    },
    boxContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        flexWrap: 'wrap',
        justifyContent: 'flex-start',
        marginTop: 20,
        marginLeft: 20,
    },
    boxmini: {
        width: 50,
        height: 50,
        backgroundColor: Color.colorDarkorange,
        borderRadius: 10,
        elevation: 2,
    },
    km: {
        fontSize: 15,
        fontFamily: 'Poppins-Medium',
        paddingLeft: 10,
        marginTop: 13,
    },
    imagebox: {
        width: 30,
        height: 30,
        marginLeft: 10,
        marginTop: 10,
    },
    buttonStart: {
        width: 330,
        height: 50,
        backgroundColor: Color.colorDarkorange,
        alignSelf: 'center',
        marginTop: 20,
        borderRadius: 10,
        elevation: 2,
    },
    buttontext: {
        fontSize: 15,
        color: 'white',
        fontFamily: 'Poppins-Medium',
        textAlign: 'center',
        marginTop: 13,
    },
    buttonCancel: {
        width: 330,
        height: 50,
        backgroundColor: Color.colorDarkorange,
        alignSelf: 'center',
        marginTop: 10,
        borderRadius: 10,
        elevation: 2,
    },
});

export default TaskWalkingScreen;
