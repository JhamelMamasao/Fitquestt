import React, { useState } from "react";
import { StyleSheet, View, Image, Text, Pressable } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { SafeAreaView } from "react-native-safe-area-context";
import { LineChart } from "react-native-chart-kit";
import { Color } from "../GlobalStyle";
import Dashboard from "./Dashboard";

const ProgressReport = () => {
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
        navigation.navigate('Dashboard')
    }

    const data = {
        labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"] ,
        datasets: [
            {
                data: [20, 20, 0, 0, 0, 0],
            }
        ]
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <Pressable onPress={goBack}>
                    <Image source={require('../assets/images/Backblack.png')} style={styles.back} />
                </Pressable>
            </View>
            <Text style={styles.progress}>Progress Report</Text>
            <View style={styles.chartContainer}>
                <LineChart
                    data={data}
                    width={330}
                    height={250}
                    chartConfig={chartConfig}
                    bezier
                    style={styles.chart}
                    propsForDots={{
                        r: '6', // size of the dot
                        strokeWidth: '2', // size of outer line
                        stroke: Color.colorDarkorange // color of outer line
                    }}
                    propsForBackgroundLines={{
                        stroke: 'white' // color of the lines
                    }}
                />
            </View>
            <Text style={styles.Activity}>Activity History</Text>
            <View style={styles.box}>

            </View>
        </SafeAreaView>
    );
};

const chartConfig = {
    backgroundGradientFrom: Color.colorDarkorange,
    backgroundGradientTo: Color.colorDarkorange,
    decimalPlaces: 0,
    color: (opacity = 100) => `rgba(255, 255, 255, ${opacity})`,
    style: {
        borderRadius: 10,
        elevation: 5,
    },
    horizontalLabelRotation: 40,
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
    },
    chartContainer: {
        alignItems: "center",
        marginTop: 80,
    },
    chart: {
        marginVertical: 8,
        borderRadius: 10,
        
    },
    data: {
        fontSize: 10,
        fontFamily: 'Poppins-Medium',
        color: 'white',
    },
    progress: {
        fontSize: 18,
        fontFamily: 'Poppins-Medium',
        top: 80,
        paddingLeft: 20,
    },
    Activity: {
        fontSize: 18,
        fontFamily: 'Poppins-Medium',
        top: 30,
        paddingLeft: 20,
    },
    box: {
        width: '90%',
        height: '40%',
        backgroundColor: 'white',
        alignSelf: 'center',
        top: 30,
        borderRadius: 10,
        elevation: 5,
    }
    
});

export default ProgressReport;
