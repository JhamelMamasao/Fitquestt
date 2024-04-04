import React, { useState, useEffect } from "react";
import { StyleSheet, View, Image, Text, Pressable } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { SafeAreaView } from "react-native-safe-area-context";
import { Color } from "../GlobalStyle";
import AsyncStorage from '@react-native-async-storage/async-storage';
import base64 from 'base-64';
import "core-js/stable/atob";
import { jwtDecode } from 'jwt-decode';

const UserProfile = () => {
    const navigation = useNavigation();
    const [fontError, setFontError] = useState(false); 
    const [name, setName] = useState('');
    const [names, setNames] = useState('');
    const [Weight, setWeight] = useState('');
    const [Height, setHeight] = useState('');
    const [profile, setProfile] = useState('');
    const [bdate, setBdate] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const token = await AsyncStorage.getItem('access');
                console.log(token);
                if (token) {
                    const parts = token.split('.');
                    if (parts.length !== 3) {
                        throw new Error('The token is invalid');
                    }

                    const payload = jwtDecode(token);
                    console.log('Decoded payload:', payload);

                    setName(payload.first_name);
                    setNames(payload.last_name);
                    setWeight(payload.weight);
                    setHeight(payload.height);
                    setProfile(payload.profile);
                    setBdate(payload.birth_date);
                }
            } catch (error) {
                console.error(error);
            }
        };
        fetchData();
    }, []);

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

    const progress = () => {
        navigation.navigate('ProgressReport');
    };
    const Fillup = () => {
        navigation.navigate('Fillup');
    };

    const logout = async () => {
        try {
            await AsyncStorage.removeItem('access'); // Remove authentication token
            // Navigate to the login screen
            navigation.reset({ 
                index: 0, 
                routes: [{ name: 'Login' }] 
            });
        } catch (error) {
            console.error('Error logging out:', error);
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <Pressable onPress={goBack}>
                    <Image source={require('../assets/images/Backblack.png')} style={styles.back} />
                </Pressable>
                <Text style={styles.textTask}>UserProfile</Text>
                <Pressable onPress={logout}>
                <View style={styles.logoutButton}>
                    <Text style={styles.logoutText}>Logout</Text>
                </View>
            </Pressable>
            </View>
            <View style={styles.bg}></View>
            <Image style={styles.profile} source={{uri: profile}}></Image>
            <Text style={styles.Nametext}>{name} {names}</Text>
            <Pressable onPress={Fillup}>
                <View style={styles.circle}>
                     <Image source={require('../assets/images/Edit.png')} style={styles.edit} />
                </View>
            </Pressable>
            <Text style={styles.runner}>Runner</Text>
            <View style={styles.expBarContainer}>
                <View style={styles.expBar}></View>
            </View>
            <View style={styles.align}>
                <Text style={styles.names}>{bdate}</Text>
                <Text style={styles.namesss}>{Height}<Text style={styles.cm}>cm</Text></Text>
                <Text style={styles.names}>{Weight}<Text style={styles.cm}>kg</Text></Text>
            </View>
            <View style={styles.align}>
                <Text style={styles.namess}>BirthDate</Text>
                <Text style={styles.namessss}>Height</Text>
                <Text style={styles.namess}>Weight</Text>
            </View>
            <View style={styles.seeallalign}>
                <Text style={styles.Rewardtext}>Rewards Summary</Text>
                <Text style={styles.seeall}>See-All</Text>
            </View>
            <View style={styles.box}>
                <Image source={require('../assets/images/3dicons.png')} style={styles.dicons}></Image>
            </View>
            <View style={styles.seeallalign}>
                <Text style={styles.Achivementtext}>Achievements Summary</Text>
                <Text style={styles.seealll}>See-All</Text>
            </View>
            <View style={styles.box1}>
                <Image source={require('../assets/images/reward.png')} style={styles.dicons}></Image>
            </View>
            <Pressable onPress={progress}>
                <View style={styles.button}>
                    <Text style={styles.buttontext}>Progress Report</Text>
                </View>
            </Pressable>
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
        justifyContent: 'space-between',
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
        left: 10,
        color: 'white',
    },
    logoutButton: {
        backgroundColor: 'white',
        width: 70,
        height: 30,
        borderRadius: 10,
        marginTop: 18,
        right: 5,
        elevation: 5,
        
    },
    logoutText: {
        fontFamily: 'Poppins-Medium',
        textAlign: 'center',
        top: 5,

    },
    bg: {
        backgroundColor: Color.colorDarkorange,
        position: 'absolute',
        width: "100%",
        height: '25%',   
        zIndex: 0, 
    },
    profile: {
        position: 'absolute',
        width: 100,
        height: 100,
        borderRadius: 55,
        backgroundColor: 'white',
        marginLeft: 130,
        marginTop: 130,
        elevation: 5,
    },
    expBarContainer: {
        height: 10,
        width: '50%',
        backgroundColor: '#ddd',
        borderRadius: 10,
        alignSelf: 'center',
        marginTop: 200,
    },
      expBar: {
        height: '100%',
        width: 50,
        backgroundColor: Color.colorDarkorange,
        borderRadius: 10,
    },
    Nametext: {
        fontSize: 18,
        fontFamily: 'Poppins-Medium',
        top: 200,
        textAlign: 'center',
      },
    runner: {
        fontSize: 12,
        fontFamily: 'Poppins-Medium',
        top: 195,
        right: 3,
        textAlign: 'center',
    },
    align: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        top: 20,
        marginLeft: 30,
        marginRight: 50,
    },
    names:{
        fontSize: 18,
        fontFamily: 'Poppins-Medium',
    },
    namesss:{
        fontSize: 18,
        fontFamily: 'Poppins-Medium',
        right: 13,
    },
    namess:{
        fontSize: 12,
        fontFamily: 'Poppins-Medium',
    },
    namessss:{
        fontSize: 12,
        fontFamily: 'Poppins-Medium',
        left: 10,
    },
    cm:{
        fontSize: 13,
        fontFamily: 'Poppins-Medium',
    },
    box: {
        width: '90%',
        backgroundColor: 'white',
        height: '15%',
        alignSelf: 'center',
        top: 40,
        borderRadius: 10,
        elevation: 5,
    },
    box1: {
        width: '90%',
        backgroundColor: 'white',
        height: '15%',
        alignSelf: 'center',
        top: 60,
        borderRadius: 10,
        elevation: 3,
    },
    Rewardtext: {
        fontSize: 15,
        top: 40,
        paddingLeft: 30,
        fontFamily: 'Poppins-Medium',
    },
    Achivementtext: {
        fontSize: 15,
        top: 60,
        paddingLeft: 30,
        fontFamily: 'Poppins-Medium',

    },
    seeall: {
        fontSize: 10,
        fontFamily: 'Poppins-Medium',
        top: 45,
        right: 30,
    },
    seealll: {
        fontSize: 10,
        fontFamily: 'Poppins-Medium',
        top: 65,
        right: 30,
    },
    seeallalign: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    dicons: {
        top: 18,
        left: 10,
    },
    button: {
        width: "90%",
        height: 60,
        backgroundColor: Color.colorDarkorange,
        alignSelf: 'center',
        top: 85,
        borderRadius: 15,
        elevation: 5,
    },
    buttontext: {
        fontSize: 15,
        fontFamily: 'Poppins-Medium',
        textAlign: 'center',
        top: 20,
        color: 'white',
    },
    circle: {
        width: 30,
        height: 30,
        borderRadius: 55,
        backgroundColor: Color.colorDarkorange,
        position: 'absolute',
        top: 130,
        left: 200,
    },
    edit: {
        width: 20,
        height: 20,
        top: 5,
        left: 5,
    },

   

    
    


});


export default UserProfile;