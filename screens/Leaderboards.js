import React, { useState, useEffect } from "react";
import { StyleSheet, View, Pressable, Text, Image, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Color } from '../GlobalStyle';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { SafeAreaView } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { jwtDecode } from 'jwt-decode';
import base64 from 'base-64';
import "core-js/stable/atob";

const Leaderboards = () => {
    const navigation = useNavigation();
    const [fontError, setFontError] = useState(false);
    const [players, setPlayers] = useState([]);
    const roundedTotal = parseFloat(players.total).toFixed(4);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const token = await AsyncStorage.getItem('access');
            if (!token) {
                throw new Error('Token not found');
            }
            const decodedToken = jwtDecode(token);

            const headers = {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            };

            const response = await fetch('https://fitquest-8it9.onrender.com/api/leaderboard/', {
                method: 'GET',
                headers: headers
            });

            if (!response.ok) {
                throw new Error('Failed to fetch leaderboard data');
            }

            const data = await response.json();
            console.log('Response data:', data);

            // Sort players based on total scores
            const sortedPlayers = data.sort((a, b) => b.total - a.total);
            setPlayers(sortedPlayers);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    let [fontsLoaded] = useFonts({
        "Poppins-Medium": require('../assets/fonts/Poppins-Medium.ttf'),
        "Poppins-Bold": require('../assets/fonts/Poppins-Bold.ttf'),
        "Poppins-Black": require('../assets/fonts/Poppins-Black.ttf'),
        "Poppins-Light": require('../assets/fonts/Poppins-Light.ttf'),
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
        navigation.navigate('Dashboard')
    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <Pressable onPress={goBack}>
                    <Image source={require('../assets/images/Backblack.png')} style={styles.back} />
                </Pressable>
                <Text style={styles.textTask}>Leaderboards</Text>
            </View>
            <View style={styles.boxContainer}>
    {players.length > 0 && (
        <View style={[styles.box, styles.topPlayer]} key={"top1"}>
            <Text style={styles.exp}>{parseFloat(players[0]?.total).toFixed(4)}</Text>
            <Image style={styles.profile} source={{uri: players[0]?.profile}} />
            <Text style={styles.nametext}>{players[0]?.first_name}</Text>
        </View>
    )}
    {/* Hatian ang natitira na dalawang players */}
    {players.slice(1, 3).map((player, index) => (
        <View style={[styles.box, index === 0 ? styles.leftTopPlayer : styles.rightTopPlayer]} key={index + 1}>
            <Text style={styles.exp}>{parseFloat(player.total).toFixed(4)}</Text>
            <Image style={styles.profile} source={{uri: player.profile}} />
            <Text style={styles.nametext}>{player.first_name}</Text>
        </View>
    ))}
</View>
            <Image source={require('../assets/images/top1.png')} style={styles.top1} />
            <Image source={require('../assets/images/top3.png')} style={styles.top2} />
            <Image source={require('../assets/images/top2.png')} style={styles.top3} />
            <Text style={styles.titleText}>POPULAR</Text>
            <View style={styles.popular}>
                <View style={styles.popularContainer}>
                    <Text style={styles.numbers}>Top</Text>
                    <Text style={styles.profiless}>Profile</Text>
                    <Text style={styles.names}>Name</Text>
                    <Text style={styles.exps}>Exp</Text>
                </View>
            </View>
            <ScrollView>
                {players.slice(3).map((player, index) => (
                    <View style={styles.otherboxes} key={index}>
                        <View style={styles.otherContainer}>
                            <Text style={styles.number}>{index + 4}</Text>
                            <Image style={styles.ProfileOther} source={{uri: player.profile}} />
                            <Text style={styles.nameOther}>{player.first_name} {player.last_name}</Text>
                            <Text style={styles.expOther}>{parseFloat(player.total).toFixed(4)}</Text>
                        </View>
                    </View>
                ))}
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
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
        color: 'black',
        textAlign: 'center',
    },
    boxContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 70,
        padding: 10,
    },
    box: {
        width: 110,
        height: 130,
        backgroundColor: 'white',
        elevation: 5,
        borderRadius: 15,
    },
    boxs: {
        width: 110,
        height: 160,
        backgroundColor: 'white',
        bottom: 30,
        elevation: 5,
        borderRadius: 15,
    },
    
    top1: {
        position: 'absolute',
        width: 65,
        height: 65,
        top: 95,
        left: 78,
    },
    top3: {
        position: 'absolute',
        width: 65,
        height: 65,
        top: 95,
        left: 310,
    },
    top2: {
        position: 'absolute',
        width: 65,
        height: 65,
        top: 95,
        left: 195,
    },
    profile: {
        width: 60,
        height: 60,
        backgroundColor: Color.colorDarkorange,
        borderRadius: 50,
        left: 25,
        top: 15,
    },
    profiles: {
        width: 70,
        height: 70,
        backgroundColor: Color.colorDarkorange,
        borderRadius: 50,
        left: 20,
        top: 15,
    },
    nametext: {
        fontFamily: 'Poppins-Bold',
        fontSize: 12,
        top: 25,
        textAlign: 'center',
        color: Color.colorDarkorange,
    },
    nametexts: {
        fontFamily: 'Poppins-Bold',
        fontSize: 14,
        top: 30,
        textAlign: 'center',
        color: Color.colorDarkorange,
    },
    exp: {
        fontFamily: 'Poppins-Bold',
        fontSize: 12,
        top: 10,
        textAlign: 'center',
    },
    titleText: {
        fontFamily: 'Poppins-Bold',
        left: 15,
        fontSize: 20,
        marginTop: 20,
        bottom: 5,
    },
    popular: {
        width: "95%",
        top: -5,
        height: 45,
        left: 10,
        backgroundColor: Color.colorDarkorange,
        borderRadius: 5,
    },
    otherboxes: {
        width: "95%",
        height: 60,
        marginTop: 3,
        left: 10,
        backgroundColor: 'white',
        borderRadius: 5,
        elevation: 5,
    },
    otherContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        
    },
    number: {
        fontFamily: 'Poppins-Bold',
        fontSize: 25,
        left: 20,
        top: 15,
    },
    ProfileOther: {
        position: 'absolute',
        width: 50,
        height: 50,
        backgroundColor: Color.colorDarkorange,
        borderRadius: 55,
        right: "68%",
        top: 5,
    },
    nameOther: {
        fontFamily: 'Poppins-Medium',
        fontSize: 13,
        left: 20,
        top: 10,
    },
    expOther: {
        fontFamily: 'Poppins-Medium',
        fontSize: 12,
        right: 40,
        top: 10,
    },
    popularContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    numbers: {
        top: 12,
        left: 15,
        color: 'white',
        fontFamily: 'Poppins-Bold',
        fontSize: 13,

    },
    profiless: {
        top: 12,
        left: -40,
        color: 'white',
        fontFamily: 'Poppins-Bold',
        fontSize: 13,

    },
    names: {
        top: 12,
        left: -40,
        color: 'white',
        fontFamily: 'Poppins-Bold',
        fontSize: 13,


    },
    exps: {
        top: 12,
        left: -40,
        color: 'white',
        fontFamily: 'Poppins-Bold',
        fontSize: 13,

    }
});

export default Leaderboards;
