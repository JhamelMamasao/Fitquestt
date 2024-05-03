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



const FinalDashboard = () => {
  const navigation = useNavigation();
  const [fontError, setFontError] = useState(false);
  const [name, setName] = useState(' ');
  const [names, setNames] = useState(' ');
  const [profile, setProfile] = useState(' ');
  const [greeting, setGreeting] = useState(' ');

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
    navigation.navigate('ChooseQuest');
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
          <Pressable onPress={NotificationPress}>
          <Image source={require('../assets/images/Notification.png')} style={styles.notif} />
        </Pressable>

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

  return (
    <SafeAreaView style={styles.container}>
      <Header />
      <Text style={styles.good}> {greeting},</Text>
      <Text style={styles.naText}>Let's Run</Text>
      <View style={styles.boxContainer1}>
        <View style={styles.box1}>
          <Text style={styles.Challengetext}>Daily Quest</Text>
          <Text style={styles.Challengetext1}>Every day, a new challenge</Text>
        
          <Pressable style={styles.Vector} onPress={dashboard2}>
            <Image source={require('../assets/images/Vector.png')} style={styles.vector1} />
          </Pressable>
          
          <View style={styles.imageContainer}>
            <Image source={require('../assets/images/runrun.png')} style={styles.run} />
          </View>
        </View>
        <Text style={styles.dashboardtext}>Others</Text>
        <ScrollView horizontal={true} style={styles.boxContainer}>
          <Box title="User Profile" onPress={UserProfile} icon={require('../assets/images/users.png')} />
          <Box title="Leaderboards" onPress={Leaderboards} icon={require('../assets/images/la.png')} />
          <Box title="Challenge"onPress={Challenge} icon={require('../assets/images/cha.png')} />
        </ScrollView>
        
      </View>
    </SafeAreaView>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fefefe',
  },
  header: {
    padding: 15,
    flexDirection: 'row',
    alignItems: 'center',
    
  },
  profile: {
    width: 45,
    height: 45,
    top: 10,
    borderRadius: 55,
    backgroundColor: 'tranparent',
  },
  profileImage: {
    width: '100%',
    height: '100%',
    borderRadius: 25,
  },
  greet: {
    fontSize: 18,
    fontFamily: 'Poppins-Medium',
    top: 10,
    left: 15,

  },
  greets: {
    fontSize: 18,
    fontFamily: 'Poppins-Medium',
    top: 22,
    left: -45,

  },
  naText: {
    fontSize: 35,
    fontFamily: 'Poppins-SemiBold',
    alignSelf: 'flex-start',
    left: 17,
    top: 5,
  },

  circle: {
    width: 80,
    height: 80,
    borderRadius: 80,
    backgroundColor: 'rgba(255, 255, 255, 0.4)', 
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: 'black',
    alignItems: 'center',
    elevetion: 5,
},
  icon: {
    width: 80,
    height: 80,
    borderRadius: 25,
  },
  boxContainer1: {
    flex: 1,
    padding: 10,
  },
  boxContainer: {
    flex: 1,
    top: "5%",
    flexDirection: 'row',
  },
  dashboardtext: {
    top: 35,
    fontSize: 20,
    fontFamily: 'Poppins-SemiBold',
    marginLeft: 9,
  },
  box: {
    width: 170, 
    height: '85%', 
    padding: 5,
    shadowColor: 'black',
    top: 20,
    shadowOpacity: 0.8,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
    elevation: 10,
  },
  box1: {
    width: '100%',
    height: '40%',
    backgroundColor: Color.colorDarkorange,
    padding: 13,
    borderRadius: 10,
    position: 'relative',
    overflow: 'hidden', 
    shadowColor: 'black',
    shadowOpacity: 0.8,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
    elevation: 8,
  },
  inner: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    backgroundColor: 'lightgray',
    backgroundColor: Color.colorDarkorange,
  },
  innerText: {
    fontFamily: 'Poppins-Medium',
    fontSize: 18,
    top: 10,
    color: 'white',
  },
  Challengetext:  {
    fontSize: 35,
    fontFamily: 'Poppins-SemiBold',
    marginLeft: 5,
    color: 'white',
    marginTop: 10,
  },
  Challengetext1:  {
    fontSize: 15,
    fontFamily: 'Poppins-Medium',
    marginLeft: 5,
    color: 'white',
    top: '-5%',
  },
  Vector: {
    width: 60,
    height: 40,
    borderRadius: 55,
    backgroundColor: 'white',
    top: 60,
    left: 10,
    shadowColor: 'black',
    shadowOpacity: 0.8,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
    elevation: 10,
  },
  run: {
    width: '80%',
    height: '85%', 
    position: 'absolute', 
    bottom: '-40%', 
    right: 120,
  },
  imageContainer: {
    width: '100%',
    height: '150%',
    position: 'absolute', // Position the container within the box
    bottom: 100,
    left: 200,
    justifyContent: 'flex-end', 
  },
  vector1: {
    width: '40%',
    height: '40%', 
    position: 'absolute', // Position the image within the box
    bottom: '30%', 
    left: '30%',
  },
  buttonlogout: {
    width: 100,
    height: 40,
    borderRadius: 80,
    backgroundColor: Color.colorDarkorange,
    left: 120,
  },

  Logout: {
    textAlign: 'center',
    top: 10,
    fontFamily: 'Poppins-Medium',
    color: 'white',

  },
  notif: {
    width: 25,
    height: 25,
    left: 200,
    position: 'absolute',
  },

  good: {
    fontSize: 16,
    fontFamily: 'Poppins-Medium',
    top: 15,
    left: 15,
  },




});

export default FinalDashboard;