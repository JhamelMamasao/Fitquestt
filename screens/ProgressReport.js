import React, { useState, useEffect, useRef } from "react";
import { StyleSheet, View, Image, Text, Pressable } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { SafeAreaView } from "react-native-safe-area-context";
import MapView, { Polyline, Marker } from 'react-native-maps';
import { Color } from "../GlobalStyle";

const HistoryMap = () => {
    const navigation = useNavigation();
    const [fontError, setFontError] = useState(false);
    const [coordinates, setCoordinates] = useState([]); // Array of { latitude, longitude } objects
    const mapRef = useRef(null);

    useEffect(() => {
        // Fetch user's location history coordinates
        const mockCoordinates = [
            { latitude: 13.645287, longitude: 123.164014 },
            { latitude: 13.645292, longitude: 123.164175 },
            { latitude: 13.645301, longitude: 123.164337 },
            { latitude: 13.645325, longitude: 123.164357 },
            { latitude: 13.645389, longitude: 123.164378 },
            { latitude: 13.645410, longitude: 123.164380 },
            { latitude: 13.645600, longitude: 123.164400 },
            { latitude: 13.645900, longitude: 123.164500 },
            { latitude: 13.646100, longitude: 123.164600 },
            { latitude: 13.646500, longitude: 123.165100 },
            // Add more coordinates as needed
        ];
        setCoordinates(mockCoordinates);

        if (mapRef.current && mockCoordinates.length > 0) {
            mapRef.current.fitToCoordinates(mockCoordinates, {
                edgePadding: { top: 50, right: 50, bottom: 50, left: 50 },
                animated: true,
            });
        }
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
                            <Text style={{ fontFamily: 'Poppins-Bold', fontSize: 18, color: Color.colorDarkorange, textAlign: 'center'}}>1.5 km</Text>
                        </View>
                        <View>
                            <Text style={{ fontFamily: 'Poppins-Medium', fontSize: 15, color: Color.colorWhite, textAlign: 'center'}}>Duration</Text>
                            <Text style={{ fontFamily: 'Poppins-Bold', fontSize: 18, color: Color.colorDarkorange, textAlign: 'center'}}>15 mins</Text>
                        </View>
                    </View>
                    <View style={styles.boxcontainer}>
                        <View>
                            <Text style={{ fontFamily: 'Poppins-Medium', fontSize: 15, color: Color.colorWhite, textAlign: 'center'}}>Exp</Text>
                            <Text style={{ fontFamily: 'Poppins-Bold', fontSize: 18, color: Color.colorDarkorange, textAlign: 'center'}}>150 kcal</Text>
                        </View>
                        <View>
                            <Text style={{ fontFamily: 'Poppins-Medium', fontSize: 15, color: Color.colorWhite, textAlign: 'center'}}>Fitcoin</Text>
                            <Text style={{ fontFamily: 'Poppins-Bold', fontSize: 18, color: Color.colorDarkorange, textAlign: 'center'}}>2000</Text>
                        </View>

                    </View>
                    <View style={styles.boxcontainer}>
                        <View>
                            <Text style={{ fontFamily: 'Poppins-Medium', fontSize: 15, color: Color.colorWhite, textAlign: 'center'}}>Difficulty</Text>
                            <Text style={{ fontFamily: 'Poppins-Bold', fontSize: 18, color: Color.colorDarkorange, textAlign: 'center'}}>Hard</Text>
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
        alignItems: 'center',
        top: 10,
        marginTop: 10,
        marginHorizontal: -50,
    }
});

export default HistoryMap;
