import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Pressable, TextInput, Text, Image, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Color } from '../GlobalStyle';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { SafeAreaView } from 'react-native-safe-area-context';
import { jwtDecode } from 'jwt-decode';
import AsyncStorage from '@react-native-async-storage/async-storage';
import base64 from 'base-64';
import "core-js/stable/atob";
import {
  LineChart,
  BarChart,
  PieChart,
  ProgressChart,
  ContributionGraph,
  StackedBarChart
} from "react-native-chart-kit";
import { Dimensions } from 'react-native';

const screenWidth = Dimensions.get('window').width;




const FinalDashboard = () => {
  const navigation = useNavigation();
  const [fontError, setFontError] = useState(false);
  const [name, setName] = useState(' ');
  const [names, setNames] = useState(' ');
  const [profile, setProfile] = useState(' ');
  const [greeting, setGreeting] = useState(' ');
  const [totalKm, setTotalKm] = useState('200');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = await AsyncStorage.getItem('access');
        console.log(token)
        if (token) {
          const parts = token.split('.');
          if (parts.length !== 3) {
            throw new Error('The token is invalid');
          }
  
          const header = JSON.parse(base64.decode(parts[0]));
          console.log('Decoded header:', header);
  
          const payload = jwtDecode(token);
          console.log('Decoded payload:', payload);
          
          setName(payload.first_name);
          setProfile(payload.profile);
          setNames(payload.last_name);
        }
        const hour = new Date().getHours();
        if (hour >= 5 && hour < 12) {
          setGreeting('Good morning');
        } else if (hour >= 12 && hour < 18) {
          setGreeting('Good afternoon');
        } else {
          setGreeting('Good evening');
        }
      } catch (error) {
        console.error(error);
      }
    };

    
    fetchData();
  }, []);

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

  let [fontsLoaded] = useFonts({
    "Poppins-Medium": require('../assets/fonts/Poppins-Medium.ttf'),
    "Poppins-Bold": require('../assets/fonts/Poppins-Bold.ttf'),
    "Poppins-Black": require('../assets/fonts/Poppins-Black.ttf'),
    "Poppins-Light": require('../assets/fonts/Poppins-Light.ttf'),
    "Poppins-SemiBold": require('../assets/fonts/Poppins-SemiBold.ttf'),
  });

  const onLayoutRootView = React.useCallback(async () => {
    if (fontsLoaded || fontError) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontError]);

  if (!fontsLoaded && !fontError) {
    return null;
  }

  

  const Header = () => {
    return (
      <View style={styles.header}> 
          <View style={styles.profile}>
          <Image style={styles.profileImage} source={{uri: profile}} />
          </View>
          <Text style={styles.greet}>{name}{'\n'}{names}</Text>
          <Image source={require('../assets/images/Notification.png')} style={styles.notification} onPress={NotificationPress} />
      </View>
    )
  }
  const Box = ({ title, onPress, icon }) => {
    return (
      <View style={styles.box}>
        <Pressable style={styles.inner} onPress={onPress}>
        <View style={styles.circle}>
          {icon && <Image source={icon} style={styles.icon} />}
        </View>
          <Text style={styles.innerText}>{title}</Text>
        </Pressable>
      </View>
    );
  }
  const data = {
    data: [0.4]
  };

  return (
    <SafeAreaView style={styles.container} onLayout={onLayoutRootView}>
      <Header />
      <Text style={styles.good}>{greeting},</Text>
      <Text style={styles.naText}>Let's Run</Text>
      <View style={styles.TextContainer}>
        <ProgressChart
          data={data}
          width={screenWidth * 0.6} // Adjust width as needed
          height={220}
          strokeWidth={11}
          radius={35}
          chartConfig={chartConfig}
          hideLegend={true} // Set this to true to hide the labels
        />
        <Text style={styles.TotalKm}>{totalKm}</Text>
        <Text style={styles.TotalKms}>Km</Text>
      </View>
      <Text style={styles.TotalKmss}>Total Kilometers for this season</Text>
      <Pressable style={styles.box1} onPress={dashboard2}>
        <Image source={require('../assets/images/running.png')} style={styles.coverImage} />
        <Text style={styles.RunningText}>Running{'\n'}Day</Text>
        <View style={styles.boxmini}>
          <Text style={styles.Start}>Start</Text>
        </View>
      </Pressable>
      <Pressable style={styles.box2} onPress={dashboard3}>
      <Image source={require('../assets/images/walking.png')} style={styles.coverImage} />
      <Text style={styles.RunningText}>Walking{'\n'}Day</Text>
        <View style={styles.boxmini}>
        <Text style={styles.Start}>Start</Text>
        </View>
        </Pressable>
      <View style={styles.footer}>
        <View style={styles.navbar}>
          <View style={styles.IconContainer}>
            <Pressable onPress={dashboard}>
              <View style={styles.iconTextWrapper}>
                <Image source={require('../assets/images/homeorange.png')} style={styles.logo} />
                <Text style={styles.text}>Profile</Text>
              </View>
            </Pressable>
            <Pressable onPress={UserProfile}>
              <View style={styles.iconTextWrapper}>
                <Image source={require('../assets/images/user.png')} style={styles.logo} />
                <Text style={styles.text}>User Profile</Text>
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
  backgroundGradientToOpacity: 0,
  color: (opacity = 1) => `rgba(255, 165, 0, ${opacity})`, 
  strokeWidth: 2,
  barPercentage: 0.5,
  useShadowColorFromDataset: false
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1F1F1F",
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
  },
  profile: {
    width: 45,
    height: 45,
    top: 10,
    borderRadius: 55,
    backgroundColor: 'transparent',
  },
  profileImage: {
    width: '100%',
    height: '100%',
    borderRadius: 25,
  },
  greet: {
    fontSize: 15,
    fontFamily: 'Poppins-Medium',
    top: 10,
    left: 15,
    color: '#fefefe',
  },
  good: {
    fontSize: 15,
    fontFamily: 'Poppins-Medium',
    color: '#fefefe',
    left: 20,
    top: 10,
  },
  naText: {
    fontSize: 30,
    fontFamily: 'Poppins-Bold',
    color: '#fefefe',
    left: 20,
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
  TotalKm: {
    fontSize: 25,
    fontFamily: 'Poppins-Bold',
    color: Color.colorDarkorange,
    right: 40,
    bottom: 10,
  },
  TotalKms: {
    fontSize: 13,
    fontFamily: 'Poppins-Medium',
    color: '#fefefe',
    right: 35,
    bottom: 10,
  },
  TotalKmss: {
    fontSize: 11,
    fontFamily: 'Poppins-Medium',
    color: '#fefefe',
    left: 140,
    bottom: '22%',
  },
  TextContainers: {
    flexDirection: 'row',
    justifyContent: 'left',
    alignItems: 'center',
    bottom: 50,
    right: '5%',
  },
  box2: {
    width: '90%',
    height: '23%',
    backgroundColor: '#fefefe',
    borderRadius: 10,
    bottom: '12%',
    left: 20,
    overflow: 'hidden', 
    elevation: 8,
  },
  box1: {
    width: '90%',
    height: '23%',
    backgroundColor: '#fefefe',
    borderRadius: 10,
    bottom: '15%',
    left: 20,
    overflow: 'hidden', 
    elevation: 8,
    position: 'relative',
  },
  coverImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
    opacity: 0.85, // This ensures the image covers the entire box
  },
  boxmini: {
    position: 'absolute', // Positions boxmini absolutely within its parent
    top: 120,
    right: 0,
    width: '30%',
    height: '30%',
    backgroundColor: Color.colorDarkorange,
    borderTopLeftRadius: 10,
    elevation: 8,
  },
  RunningText: {
    position: 'absolute',
    top: 50,
    left: 10,
    fontSize: 30,
    fontFamily: 'Poppins-Bold',
    color: '#fefefe',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    textShadowColor: '#000',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 1,
  },
  Start: {
    top: 10,
    fontSize: 20,
    fontFamily: 'Poppins-SemiBold',
    color: '#fefefe',
    textAlign: 'center',
  },
  notification: {
    width: 20,
    height: 20,
    left: 200,
    top: 10,
  },
});

export default FinalDashboard;