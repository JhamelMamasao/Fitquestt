import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Pressable, Image, FlatList, Animated, Easing } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Color } from '../GlobalStyle';

const days = [
    { day: '28', dayOfWeek: 'SUN' },
    { day: '29', dayOfWeek: 'MON' },
    { day: '30', dayOfWeek: 'TUE' },
    { day: '1', dayOfWeek: 'WED' },
    { day: '2', dayOfWeek: 'THU' },
    { day: '3', dayOfWeek: 'FRI' },
    { day: '4', dayOfWeek: 'SAT' },
    // Add more days as needed
];

const History = () => {
    const [fontError, setFontError] = useState(false);
    const [selectedDay, setSelectedDay] = useState(null);
    const [isBoxVisible, setIsBoxVisible] = useState(false);
    const navigation = useNavigation();
    const slideAnim = useRef(new Animated.Value(0)).current; // Initial value for bottom position

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

    useEffect(() => {
        if (fontsLoaded || fontError) {
            onLayoutRootView();
        }
    }, [fontsLoaded, fontError, onLayoutRootView]);

    if (!fontsLoaded && !fontError) {
        return null;
    }

    const goBack = () => {
        navigation.navigate('UserProfile');
    };

    const toggleBox = (day) => {
        setSelectedDay(day);
        if (isBoxVisible) {
            Animated.timing(slideAnim, {
                toValue: 0,
                duration: 300,
                easing: Easing.ease,
                useNativeDriver: false,
            }).start(() => setIsBoxVisible(false));
        } else {
            setIsBoxVisible(true);
            Animated.timing(slideAnim, {
                toValue: 300, // Adjust based on the height of the box
                duration: 300,
                easing: Easing.ease,
                useNativeDriver: false,
            }).start();
        }
    };

    const renderDayItem = ({ item }) => (
        <Pressable onPress={() => toggleBox(item)}>
            <View style={styles.dayContainer}>
                <Text style={styles.dayText}>{item.day}</Text>
                <Text style={styles.dayOfWeekText}>{item.dayOfWeek}</Text>
            </View>
        </Pressable>
    );

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <Pressable onPress={goBack}>
                    <Image source={require('../assets/images/backwhite.png')} style={styles.back} />
                </Pressable>
                <Text style={styles.textTask}>Progress History</Text>
            </View>
            <FlatList
                data={days}
                renderItem={renderDayItem}
                keyExtractor={(item, index) => index.toString()}
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.calendarList}
            />
            {isBoxVisible && (
                <Animated.View style={[styles.bottomBox, { bottom: slideAnim }]}>
                    <Text style={styles.bottomBoxText}>History</Text>
                </Animated.View>
            )}
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        position: 'relative',
        backgroundColor: '#1F1F1F',
        paddingHorizontal: 20,
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
        fontSize: 15,
        fontFamily: 'Poppins-Medium',
        marginTop: 20,
        color: 'white',
    },
    calendarList: {
        marginTop: 80,
        right: 0,
    },
    dayContainer: {
        alignItems: 'center',
        marginHorizontal: 5,
        padding: 10,
        borderRadius: 10,
        height: 70,
        backgroundColor: Color.colorDarkorange,
    },
    dayText: {
        fontSize: 18,
        fontFamily: 'Poppins-Bold',
        color: 'white',
    },
    dayOfWeekText: {
        fontSize: 14,
        fontFamily: 'Poppins-Medium',
        color: 'white',
    },
    bottomBox: {
        position: 'absolute',
        left: 0,
        right: 0,
        height: '80%', // Adjust the height as needed
        backgroundColor: 'white',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        padding: 20,
        top: '30%',
    },
    bottomBoxText: {
        fontSize: 18,
        fontFamily: 'Poppins-Medium',

    },
});

export default History;
