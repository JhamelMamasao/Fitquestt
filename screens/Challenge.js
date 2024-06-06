import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Pressable, Image, ScrollView, TextInput} from 'react-native';
import { useNavigation, useRoute  } from '@react-navigation/native';
import { Color } from '../GlobalStyle';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { SafeAreaView } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { jwtDecode } from 'jwt-decode';
import base64 from 'base-64';
import "core-js/stable/atob";

const TaskScreen = () => {
    const navigation = useNavigation();
    const [fontError, setFontError] = useState(false);
    const [name, setName] = useState('Jhamel Mamasao');
    const [players, setPlayers] = useState([
        { name: 'Jhamel Mamasao', km: '10km' },
        { name: 'Angela Diane Nucum', km: '10km' },
        { name: 'Jonathan Figuron', km: '10km' },
        { name: 'Jeffrey Agdoro', km: '10km' },
        { name: 'Mj Palo', km: '10km' },
        { name: 'Josh Mendoza', km: '10km' },
        { name: 'John Matthew Lirio', km: '10km' },
        { name: 'Dado', km: '10km' },
        { name: 'Rj Tolosa', km: '10km' },
    ]);
    const [searchQuery, setSearchQuery] = useState('');
    
    let [fontsLoaded] = useFonts({
        "Poppins-Medium": require('../assets/fonts/Poppins-Medium.ttf'),
        "Poppins-Bold": require('../assets/fonts/Poppins-Bold.ttf'),
        "Poppins-Black": require('../assets/fonts/Poppins-Black.ttf'),
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

    const goBack = () => {
        navigation.navigate('Dashboard');
      }
    
    const Challengetext = () => {
        navigation.navigate('ChallengeProfile');
    }
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

    return (
        <SafeAreaView style={styles.container}>
          <View style={styles.header}>
                <Pressable onPress={goBack}>
                    <Image source={require('../assets/images/backwhite.png')} style={styles.back} />
                </Pressable>
                <Text style={styles.textTask}>Challenge</Text>
            </View>   
            <View style={styles.searchbar}>
        <TextInput 
          style={styles.input} 
          placeholder="Search"  
          onChangeText={text => setSearchQuery(text)} 
          value={searchQuery}
        />      
               <Image source={require('../assets/images/search.png')} style={styles.search}></Image>
            </View>
            <ScrollView style={styles.verticalcontainer} contentContainerStyle={styles.scrollContent}>
                {players.filter(player => player.name.toLowerCase().includes(searchQuery.toLowerCase())).map((player, index) => (
                    <Pressable onPress={Challengetext} key={index}>
                        <View style={styles.boxcontainer}>
                            <View style={styles.names}></View>
                            <View style={styles.namesbox}>
                                <View style={styles.textcontainer}>
                                    <Text style={styles.textbox}>{player.name}</Text>
                                    <Text style={styles.kmbox}>{player.km}</Text>
                                </View>
                            </View>
                            <Text style={styles.numbering}>{index + 1}</Text>
                        </View>
                    </Pressable>
                ))}
            </ScrollView>
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
                                <Image source={require('../assets/images/leaderorange.png')} style={styles.logo} />
                                <Text style={styles.text}>Challenge</Text>
                            </View>
                        </Pressable>
                        <Pressable onPress={UserProfile}>
                            <View style={styles.iconTextWrapper}>
                                <Image source={require('../assets/images/user.png')} style={styles.logo} />
                                <Text style={styles.text}>User Profile</Text>
                            </View>
                        </Pressable>
                    </View>
                </View>
            </View>
        </SafeAreaView>        
    );
};

const styles = StyleSheet.create({
   container: {
      flex: 1,
      backgroundColor: '#1F1F1F',
      position: 'relative'
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
      color: 'white',
  },
  searchbar: {
      position: 'absolute',
      width: '90%',
      height: 40,
      backgroundColor: 'white',
      borderRadius: 20,
      alignSelf: 'center',
      top: 120,
  },
  input: {
      height: 40,
      width: '90%',
      alignSelf: 'center',
      fontFamily: 'Poppins-Medium',
  },
  search: {
      position: 'absolute',
      right: 10,
      top: 10,
  },
  verticalcontainer: {
      top: 150,
      flexDirection: 'column',
  },
  scrollContent: {
      paddingBottom: 150,
  },
  names: {
      width: 45,
      height: 45,
      backgroundColor: Color.colorDarkorange,
      borderRadius: 55,
      marginBottom: 10,
      left: 15,
  },
  boxcontainer: {
      flexDirection: 'row',
      flexWrap: 'wrap',
  },
  namesbox: {
      width: '70%',
      height: 45,
      backgroundColor: Color.colorDarkorange,
      borderRadius: 20,
      marginBottom: 10,
      left: 23,
  },
  numbering: {
      fontSize: 20,
      fontFamily: 'Poppins-Bold',
      color: 'white',
      top: 10,
      textAlign: 'right',
      left: 33,
      marginTop: 8,
  },
  textbox: {
      fontSize: 15,
      fontFamily: 'Poppins-SemiBold',
      color: 'white',
      top: 13,
      left: 20,
  },
  kmbox: {
      fontSize: 15,
      fontFamily: 'Poppins-SemiBold',
      color: 'white',
      textAlign: 'left',
      right: 20,
      top: 13,
  },
  textcontainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
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
    
});

export default TaskScreen;
