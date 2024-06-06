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
import { jwtDecode } from "jwt-decode";
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
    const [expLevel, setExpLevel] = useState(0);
    const [chartData, setChartData] = useState([]);
    const [chartLabels, setChartLabels] = useState([]);
    const [chartValues, setChartValues] = useState([]);
    const [date, setDate] = useState('');
    const [total, setTotal] = useState('');

    useEffect(() => {
        fetchData();
    }, []);
    
    const fetchData = async () => {
        console.log('fetchData called');
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
    
            const response = await fetch('https://fit-quest.azurewebsites.net/api/account/progress-tracking', {
                method: 'GET',
                headers: headers
            });
            console.log('Response status:', response.status);
    
            if (!response.ok) {
                throw new Error(`Failed to fetch progress data: ${response.statusText}`);
            }
    
            const data = await response.json();
            console.log('Response data:', data);
    
            // Check if data is valid and extract chart data
            let chartLabels = [];
            let chartValues = [];
    
            if (data && typeof data === 'object') {
                chartLabels = Object.keys(data);
                chartValues = Object.values(data);
    
                console.log('Chart labels:', chartLabels);
                console.log('Chart values:', chartValues);
    
                setChartData(Object.entries(data).map(([date, total]) => ({ date, total })));
                setChartLabels(chartLabels);
                setChartValues(chartValues);
            } else {
                console.warn('Data is empty or not in expected format:', data);
            }
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };
    
    
    


    

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
                    setExpLevel(payload.exp / 100);

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
    const dashboard2 = () => {
        navigation.navigate('TaskCreation');
      };
      const dashboard3 = () => {
        navigation.navigate('WalkingTask');
      };
      const dashboard = () => {
        navigation.navigate('Dashboard');
      };
      const LoginScreen = () => {
        navigation.navigate('LoginScreen');
      };
      const UserProfile = () => {
        navigation.navigate('UserProfile');
      };
      const Leaderboards = () => {
        navigation.navigate('Leaderboards');
      };
      const Challenge = () => {
        navigation.navigate('Challenge');
      };
      const NotificationPress = () => {
        navigation.navigate('Notification');
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
                    <Image source={require('../assets/images/backwhite.png')} style={styles.back} />
                </Pressable>
                <Text style={styles.textTask}>Profile</Text>
            </View>
            <View style={styles.body}>
            {profile ? <Image style={styles.profileImage} source={{uri: profile}} /> : null}
                <Text style={styles.nametext}>{name} {names}</Text>
                <Text style={styles.exp}>Experience Level: {expLevel}</Text>
                <Text style={styles.exp}>FitCoin: 0</Text>
            </View>
            <View style={styles.parentView}>
            <View style={styles.description}>
            <View style={styles.row}>
                <Text style={styles.texts}>Weight: </Text>
                <Text style={styles.texts}>{Weight} kg</Text>
            </View>
            <View style={styles.row}>
                <Text style={styles.texts}>Height: </Text>
                <Text style={styles.texts}>{Height} cm</Text>
            </View>
            <View style={styles.row}>
                <Text style={styles.texts}>Bdate: </Text>
                <Text style={styles.texts}>{bdate}</Text>
            </View>
            </View>
            </View>
            <View style={styles.box}>
                    {chartLabels.length > 0 && chartValues.length > 0 ? (
            <LineChart
            
    data={{
        labels: chartLabels,
        datasets: [
            {
                data: chartValues
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
) : (
    <Text style={{textAlign: 'center', top: '40%', fontSize: 13, fontFamily: 'Poppins-Medium', color: 'white'}}>No progress data available</Text>
)}

            </View>
            <View style={styles.buttonContainer}>
                <Pressable onPress={progress}>
                    <View style={styles.button}>
                        <Text style={styles.texts}>Progress Report</Text>
                    </View>
                </Pressable>
                <Pressable onPress={Fillup}>
                    <View style={styles.button}>
                        <Text style={styles.texts}>Fill Up</Text>
                    </View>
                </Pressable>
            </View>
            <Pressable onPress={logout} style={styles.logout}>
                <Text style={styles.logoutText}>Logout</Text>
            </Pressable>
            <View style={styles.footer}>
                <View style={styles.navbar}>
                    <View style={styles.IconContainer}>
                        <Pressable onPress={dashboard}>
                            <View style={styles.iconTextWrapper}>
                                <Image source={require('../assets/images/home.png')} style={styles.logo} />
                                <Text style={styles.text}>Profile</Text>
                            </View>
                        </Pressable>
                        <Pressable onPress={Leaderboards}>
                            <View style={styles.iconTextWrapper}>
                                <Image source={require('../assets/images/leader.png')} style={styles.logos} />
                                <Text style={styles.text}>Leaderboards</Text>
                            </View>
                        </Pressable>
                        <Pressable onPress={Challenge}>
                            <View style={styles.iconTextWrapper}>
                                <Image source={require('../assets/images/cha.png')} style={styles.logo} />
                                <Text style={styles.text}>Challenge</Text>
                            </View>
                        </Pressable>
                        <Pressable onPress={UserProfile}>
                            <View style={styles.iconTextWrapper}>
                                <Image source={require('../assets/images/userorange.png')} style={styles.logo} />
                                <Text style={styles.text}>User Profile</Text>
                            </View>
                        </Pressable>
                    </View>
                </View>
            </View>
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
        backgroundColor: '#1F1F1F',
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
    textTask: {
        color: 'white',
        fontSize: 18,
        fontFamily: 'Poppins-Medium',
        left: 20,
        bottom: 5,
    },
      footer: {
        flex: 1,
        justifyContent: 'flex-end',
        alignContent: 'center',
        alignItems: 'center',
    },
    navbar: {
        width: "100%",
        height: 70,
        backgroundColor: '#fefefe',
        elevation: 8,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
    },
    IconContainer: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
    },
    logo: {
        margin: 20,
        width: 20, // Reduce this value to make the logo narrower
        height: 20,
    },
    logos: {
        margin: 20,
        width: 26, // Reduce this value to make the logo narrower
        height: 20,
    },
    TextContainer: {
        flexDirection: 'row',
        justifyContent: 'left',
        alignItems: 'center',
        bottom: 50,
        right: '5%',
    },
    text: {
        fontSize: 10,
        fontFamily: 'Poppins-Medium',
        textAlign: 'center',
        bottom: 15,
    },
    iconTextWrapper: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    body: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    profileImage: {
        width: 90,
        height: 90,
        borderRadius: 50,
        top: 80,
    },
    nametext: {
        color: 'white',
        fontSize: 15,
        fontFamily: 'Poppins-Medium',
        top: 90
    },
    progressBarContainer: {
        width: Dimensions.get('window').width * 0.5,
        height: 10,
        backgroundColor: '#555',
        borderRadius: 5,
        overflow: 'hidden',
        top: 95,
    },
    exp: {
        color: 'white',
        fontSize: 11,
        fontFamily: 'Poppins-Medium',
        top: 90,
    },
    description: {
        alignItems: 'center',
        top: 110,
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        borderColor: 'white', // Set this to the color of your line
        width: '90%',
        height: 50,
        backgroundColor: Color.colorDarkorange,
        borderRadius: 10,
        elevation: 10,
    },
    parentView: {
        flex: 1,
        alignItems: 'center',
      },
    texts: {
        color: 'white',
        fontSize: 13,
        fontFamily: 'Poppins-Medium',
    },
    box: {
        width: "90%",
        height: '25%',
        backgroundColor: Color.colorDarkorange,
        borderRadius: 15,
        alignSelf: 'center',
        top: 20,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        top: 40,
    },
    button: {
        width: 150,
        height: 50,
        backgroundColor: Color.colorDarkorange,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
    },
    logout: {
        width: '90%',
        height: 50,
        backgroundColor: Color.colorDarkorange,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        top: 60,
        alignSelf: 'center',
    },
    logoutText: {
        color: 'white',
        fontSize: 13,
        fontFamily: 'Poppins-Medium',
    },
    
    
});



export default UserProfile;