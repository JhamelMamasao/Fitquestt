import React, { useState, useEffect, useRef } from "react";
import { StyleSheet, View, Image, Text, Pressable } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { SafeAreaView } from "react-native-safe-area-context";
import MapView, { Polyline, Marker } from 'react-native-maps';
import { Color } from "../GlobalStyle";
import AsyncStorage from '@react-native-async-storage/async-storage';
import base64 from 'base-64';
import "core-js/stable/atob";
import { jwtDecode } from "jwt-decode";


const HistoryMap = () => {
    const navigation = useNavigation();
    const [fontError, setFontError] = useState(false);
    const [coordinates, setCoordinates] = useState([]); // Array of { latitude, longitude } objects
    const mapRef = useRef(null);
    const route = useRoute();
    const { taskSlug, targetDistance } = route.params;
    const [difficulty, setDifficulty] = useState(''); // Beginner, Intermediate, or Advanced
    const [time_limit, setDuration] = useState(''); // Duration in minutes
    const [prize, setFitcoin] = useState(''); // Fitcoin
    const [total_distance, setTotalDistance] = useState(''); // Total distance
    const [type, setType] = useState(''); // Type of task [Walking, Running, Cycling, Swimming]



    console.log(taskSlug);

    useEffect(() => {
        fetchHistory();
    }, []);

    const fetchHistory = async () => {
        try {
            const token = await AsyncStorage.getItem('access');
            console.log('Token:', token);
            if (!token) {
                throw new Error('Token not found');
            }

            const decodedToken = jwtDecode(token);
            console.log('Decoded token:', decodedToken);

            const headers = {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            };
            console.log('Headers:', headers);

            const response = await fetch(`https://fit-quest.azurewebsites.net/api/quest/history/${taskSlug}`, {
                method: 'GET',
                headers: headers
            });
            console.log('Response:', response);

            if (!response.ok) {
                throw new Error('Failed to fetch history data');
            }

            const data = await response.json();
            console.log('Response data:', data);
            setCoordinates(data);
        } catch (error) {
            console.error('Error fetching history:', error);
        }
    };

    useEffect(() => {
        fetchQuest();
    }, []);

    const fetchQuest = async () => {
        try {
            const token = await AsyncStorage.getItem('access');
            console.log('Token:', token);
            if (!token) {
                throw new Error('Token not found');
            }
    
            const decodedToken = jwtDecode(token);
            console.log('Decoded token:', decodedToken);
    
            const headers = {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            };
            console.log('Headers:', headers);
    
            const response = await fetch(`https://fit-quest.azurewebsites.net/api/quest/${taskSlug}`, {
                method: 'GET',
                headers: headers
            });
            console.log('Response:', response);
    
            if (!response.ok) {
                throw new Error('Failed to fetch quest data');
            }
    
            const responseData = await response.json(); // Parse response JSON
            console.log('Response data:', responseData);
    
            // Set state with extracted data
            setDifficulty(responseData.difficulty);
            setDuration(responseData.time_limit);
            setFitcoin(responseData.prize);
            setTotalDistance(responseData.total_distance);
            setType(responseData.type);
        } catch (error) {
            console.error('Error fetching quest data:', error);
        }
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

    const goBack = () => {
        navigation.navigate('Dashboard');
    };

    return (
        <SafeAreaView style={styles.container} onLayout={onLayoutRootView}>
            <View style={styles.header}>
                <Pressable onPress={goBack}>
                    <Image source={require('../assets/images/Backblack.png')} style={styles.back} />
                </Pressable>
                <Text style={styles.progress}>Location History</Text>
            </View>
            <View style={styles.mapContainer}>
                <MapView
                    ref={mapRef}
                    style={styles.map}
                    initialRegion={{
                        latitude: 13.645287,
                        longitude: 123.164014,
                        latitudeDelta: 0.001,
                        longitudeDelta: 0.001,
                    }}
                    scrollEnabled={false}
                    zoomEnabled={false}
                    rotateEnabled={false}
                    pitchEnabled={false}
                >
                    <Polyline
                        coordinates={coordinates}
                        strokeWidth={4}
                        strokeColor={Color.colorDarkorange}
                    />
                </MapView>
                <View style={styles.box}>
                    <Text style={{ fontFamily: 'Poppins-Bold', fontSize: 18, color: Color.colorDarkorange }}>Location History</Text>
                    <View style={styles.boxcontainer}>
                        <View>
                            <Text style={{ fontFamily: 'Poppins-Medium', fontSize: 15, color: Color.colorWhite, textAlign: 'center'}}>Distance</Text>
                            <Text style={{ fontFamily: 'Poppins-Bold', fontSize: 18, color: Color.colorDarkorange, textAlign: 'center'}}>
  {total_distance !== undefined ? Number(total_distance).toFixed(0) : 'Loading...'}
</Text>
                        </View>
                        <View>
                            <Text style={{ fontFamily: 'Poppins-Medium', fontSize: 15, color: Color.colorWhite, textAlign: 'center'}}>Duration</Text>
                            <Text style={{ fontFamily: 'Poppins-Bold', fontSize: 18, color: Color.colorDarkorange, textAlign: 'center'}}>{time_limit}</Text>
                        </View>
                    </View>
                    <View style={styles.boxcontainer}>
                        <View>
                            <Text style={{ fontFamily: 'Poppins-Medium', fontSize: 15, color: Color.colorWhite, textAlign: 'center'}}>Type</Text>
                            <Text style={{ fontFamily: 'Poppins-Bold', fontSize: 18, color: Color.colorDarkorange, textAlign: 'center'}}>{type}</Text>
                        </View>
                        <View>
                            <Text style={{ fontFamily: 'Poppins-Medium', fontSize: 15, color: Color.colorWhite, textAlign: 'center'}}>Fitcoin</Text>
                            <Text style={{ fontFamily: 'Poppins-Bold', fontSize: 18, color: Color.colorDarkorange, textAlign: 'center'}}>{prize}</Text>
                        </View>

                    </View>
                    <View style={styles.boxcontainer}>
                        <View>
                            <Text style={{ fontFamily: 'Poppins-Medium', fontSize: 15, color: Color.colorWhite, textAlign: 'center'}}>Difficulty</Text>
                            <Text style={{ fontFamily: 'Poppins-Bold', fontSize: 18, color: Color.colorDarkorange, textAlign: 'center'}}>{difficulty}</Text>
                        </View>
                    </View>
                </View>
            </View>
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
        padding: 20,
    },
    back: {
        width: 15,
        height: 15,
    },
    progress: {
        fontSize: 15,
        fontFamily: 'Poppins-Medium',
        left: 10,
        bottom: 2,
    },
    mapContainer: {
        height: '70%', // Adjust this value as needed
        justifyContent: 'center',
        alignItems: 'center',
    },
    map: {
        width: '100%',
        height: '100%',
    },
    box: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: '110%',
        backgroundColor: '#1F1F1F',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        padding: 20,
        top: '90%',
    },
    boxcontainer: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center', // Align text vertically
        marginTop: 10,
        marginHorizontal: -50,
    }
});

export default HistoryMap;
