import React, { useState, useEffect } from "react";
import { StyleSheet, View, Image, Text, Pressable, Dimensions} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { SafeAreaView } from "react-native-safe-area-context";
import { Color } from "../GlobalStyle";
import AsyncStorage from '@react-native-async-storage/async-storage';
import base64 from 'base-64';
import "core-js/stable/atob";
import { jwtDecode } from 'jwt-decode';
import {
    LineChart,
    BarChart,
    PieChart,
    ProgressChart,
    ContributionGraph,
    StackedBarChart
  } from "react-native-chart-kit";

const UserProfile = () => {
    const navigation = useNavigation();
    const [fontError, setFontError] = useState(false); 
    const [name, setName] = useState('');
    const [names, setNames] = useState('');
    const [Weight, setWeight] = useState('');
    const [Height, setHeight] = useState('');
    const [profile, setProfile] = useState('');
    const [bdate, setBdate] = useState('');
    const [exp, setExp] = useState('');

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
                    setExp(payload.exp);
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
            await AsyncStorage.removeItem('access'); 
            navigation.reset({ 
                index: 0, 
                routes: [{ name: 'Login' }] 
            });
        } catch (error) {
            console.error('Error logging out:', error);
        }
    };
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
                    <Image source={require('../assets/images/backwhite.png')} style={styles.back} />
                </Pressable>
                <Text style={styles.textTask}>Profile</Text>
            </View>
            <View style={styles.bg}></View>
            {profile ? <Image style={styles.profile} source={{ uri: profile }} /> : null}
            <Text style={styles.Nametext}>{name} {names}</Text>
            <Text style={styles.runner}>Runner</Text>
            <View style={styles.expBarContainer}>
                <View style={styles.expBar}></View>
            </View>
            <Text style={styles.exptext}>{exp}</Text>
            <View style={styles.align}>
        <Text style={styles.names}>{bdate}</Text>
        <Text style={styles.namesss}>
          {Height}
          <Text style={styles.cm}>cm</Text>
        </Text>
        <Text style={styles.names}>
          {Weight}
          <Text style={styles.cm}>kg</Text>
        </Text>
      </View>
      <View style={styles.align}>
        <Text style={styles.namess}>BirthDate</Text>
        <Text style={styles.namessss}>Height</Text>
        <Text style={styles.namess}>Weight</Text>
      </View>
      <View style={styles.box}>
      <LineChart
    data={{
        labels: ["January 1"],
      datasets: [
        {
          data: [
            Math.random() * 100,
          ]
        }
      ]
    }}
    width={330} 
    height={190}
    yAxisInterval={1} 
    chartConfig={{
      backgroundColor: "#FD7702",
      backgroundGradientFrom: "#FD7702",
      backgroundGradientTo: "#FD7702",
      decimalPlaces: 2, 
      color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
      labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
      style: {
        borderRadius: 16
      },
      propsForDots: {
        r: "6",
        strokeWidth: "2",
        stroke: "#ffa726"
      }
    }}
    bezier
    style={{
      borderRadius: 16
    }}
  />
      </View>
      <Pressable onPress={Fillup} style={styles.buttontext}>
        <Text style={styles.update}>Update</Text>
      </Pressable>
      <Pressable onPress={logout} style={styles.buttontext}>
        <Text style={styles.update}>Log Out</Text>
      </Pressable>
        </SafeAreaView>
    );
};

const chartConfig = {
    backgroundGradientFrom: "#1E2923",
    backgroundGradientFromOpacity: 0,
    backgroundGradientTo: "#08130D",
    backgroundGradientToOpacity: 0.5,
    color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
    strokeWidth: 2,
    barPercentage: 0.5,
    useShadowColorFromDataset: false 
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
        fontSize: 18,
        fontFamily: 'Poppins-Medium',
        marginTop: 18,
        left: 10,
        color: 'white',
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

    circles: {
        position: 'absolute',
        width: 100,
        height: 100,
        borderRadius: 55,
        backgroundColor: 'black',
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
        top: 210,
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
    exptext: {
        fontSize: 12,
        fontFamily: 'Poppins-Medium',
        top: '29%',
        left: 90,
    },
    align: {
        flexDirection: "row",
        justifyContent: "space-between",
        top: '65%',
        marginLeft: 30,
        marginRight: 50,
      },
      names: {
        fontSize: 18,
        fontFamily: "Poppins-Medium",
      },
      namesss: {
        fontSize: 18,
        fontFamily: "Poppins-Medium",
        right: 13,
      },
      namess: {
        fontSize: 12,
        fontFamily: "Poppins-Medium",
      },
      namessss: {
        fontSize: 12,
        fontFamily: "Poppins-Medium",
        left: 10,
      },
      cm: {
        fontSize: 13,
        fontFamily: "Poppins-Medium",
      },
      box: {
        width: "90%",
        height: '25%',
        backgroundColor: 'white',
        borderRadius: 15,
        alignSelf: 'center',
        top: '35%', 
      },
      buttontext: {
        width: '90%',
        height: 60,
        backgroundColor: Color.colorDarkorange,
        borderRadius: 15,
        alignSelf: 'center',
        top: '38%',
        elevation: 5,
        marginBottom: 15,
      },
      update: {
        fontSize: 15,
        fontFamily: 'Poppins-Medium',
        color: 'white',
        textAlign: 'center',
        top: 18,
      }
});


export default UserProfile;