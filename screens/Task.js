import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, StyleSheet, Pressable, Image } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Color } from '../GlobalStyle';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { SafeAreaView } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';

const TaskWalkingScreen = () => {
    const [taskDescription, setDescription] = useState('');
    const [Km, setDistance] = useState(0);
    const [rewardExp, setRewards] = useState(0);
    const route = useRoute();
    const { difficulty } = route.params;
    const navigation = useNavigation();
    const [fontError, setFontError] = useState(false);

    const Quest = useCallback(async () => {
        try {
            const token = await AsyncStorage.getItem('access');
            if (!token) {
                throw new Error('Token not found');
            }

            const headers = {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            };

            const response = await fetch(`https://fit-quest.azurewebsites.net/api/quest/`, {
                method: 'GET',
                headers: headers
            });

            if (!response.ok) {
                throw new Error('Failed to fetch quest data');
            }

            const { results } = await response.json();

            // Filter quests by difficulty and type
            const runningQuests = results.filter(quest => quest.difficulty === difficulty && quest.type === 'Running');
            
            if (runningQuests.length > 0) {
              // Shuffle runningQuests and select one
              const selectedQuest = shuffleAndSelect(runningQuests);
            
              setDescription(selectedQuest.description);
              setDistance(selectedQuest.distance);
              setRewards(selectedQuest.prize);
            }

        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }, [difficulty]);

    const shuffleAndSelect = (array) => {
        const newArray = array.slice();
        for (let i = newArray.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
        }
        return newArray[0];
    };

    useEffect(() => {
        Quest();
    }, [Quest]);

    let [fontsLoaded] = useFonts({
        "Poppins-Medium": require('../assets/fonts/Poppins-Medium.ttf'),
        "Poppins-Bold": require('../assets/fonts/Poppins-Bold.ttf'),
        "Poppins-Black": require('../assets/fonts/Poppins-Black.ttf'),
    });

    const onLayoutRootView = useCallback(async () => {
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

    const navigateToTracking = () => {
        navigation.navigate('Tracking', { targetDistance: Km });
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <Pressable onPress={goBack} accessibilityLabel="Go back">
                    <Image source={require('../assets/images/backwhite.png')} style={styles.back} />
                </Pressable>
                <Text style={styles.textTask}>Task</Text>
            </View>
            <Text style={styles.RunnerText}>RUNNER</Text>
            <Image source={require('../assets/images/runner2.png')} style={styles.runner} />
            <Text style={styles.RunnerText2}>RUNNER</Text>
            <View style={styles.box}>
                <View style={{flexDirection: 'row'}}>
                <Text style={styles.TitleText}>{difficulty}</Text>
                <Image source={require('../assets/images/info.png')} style={{width: 15, height: 15, marginTop: 25, marginLeft: 10}} />
                </View>
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
                <Pressable style={styles.buttonStart} onPress={navigateToTracking} accessibilityLabel="Start tracking">
                    <Text style={styles.buttontext}>Start</Text>
                </Pressable>
                <Pressable style={styles.buttonCancel} onPress={goBack} accessibilityLabel="Cancel">
                    <Text style={styles.buttontext}>Cancel</Text>
                </Pressable>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
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
        backgroundColor: '#1F1F1F',
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
        color: 'white',
    },
    Description: {
        fontSize: 13,
        fontFamily: 'Poppins-Medium',
        paddingLeft: 20,
        paddingRight: 12,
        color: 'white',
    },
    boxContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        marginTop: 20,
        marginLeft: 20,
    },
    boxmini: {
        width: 50,
        height: 50,
        backgroundColor: Color.colorDarkorange,
        borderRadius: 10,
        elevation: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    km: {
        fontSize: 13,
        fontFamily: 'Poppins-Medium',
        paddingLeft: 10,
        marginTop: 13,
        color: 'white',
    },
    imagebox: {
        width: 30,
        height: 30,
    },
    buttonStart: {
        width: 330,
        height: 50,
        backgroundColor: Color.colorDarkorange,
        alignSelf: 'center',
        marginTop: 20,
        borderRadius: 10,
        elevation: 10,
        justifyContent: 'center',
    },
    buttontext: {
        fontSize: 13,
        color: 'white',
        fontFamily: 'Poppins-Medium',
        textAlign: 'center',
    },
    buttonCancel: {
        width: 330,
        height: 50,
        backgroundColor: Color.colorDarkorange,
        alignSelf: 'center',
        marginTop: 10,
        borderRadius: 10,
        elevation: 10,
        justifyContent: 'center',
    },
});

export default TaskWalkingScreen;
