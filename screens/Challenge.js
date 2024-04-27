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

    return (
        <SafeAreaView style={styles.container}>
          <View style={styles.header}>
                <Pressable onPress={goBack}>
                    <Image source={require('../assets/images/backwhite.png')} style={styles.back} />
                </Pressable>
                <Text style={styles.textTask}>Challenge</Text>
            </View>   
            <View style={styles.searchbar}>
               <TextInput style={styles.input} placeholder="Search" />
               <Image source={require('../assets/images/search.png')} style={styles.search}></Image>
            </View>
            <ScrollView vertical={true} style={styles.verticalcontainer}>
            <Pressable onPress={Challengetext}>
               <View style={styles.boxcontainer}>
                   <View style={styles.names}></View>
                   <View style={styles.namesbox}>
                     <View style={styles.textcontainer}>
                     <Text style={styles.textbox}>{name}</Text>
                     <Text style={styles.kmbox}>12km</Text>
                     </View>
                   </View>
                   <Text style={styles.numbering}>1</Text>
                   
               </View>
            </Pressable>
               <View style={styles.boxcontainer}>
                   <View style={styles.names}></View>
                   <View style={styles.namesbox}>
                     <View style={styles.textcontainer}>
                     <Text style={styles.textbox}>{name}</Text>
                     <Text style={styles.kmbox}>12km</Text>
                     </View>
                   </View>
                   <Text style={styles.numbering}>1</Text>
                   
               </View>
               <View style={styles.boxcontainer}>
                   <View style={styles.names}></View>
                   <View style={styles.namesbox}>
                     <View style={styles.textcontainer}>
                     <Text style={styles.textbox}>{name}</Text>
                     <Text style={styles.kmbox}>12km</Text>
                     </View>
                   </View>
                   <Text style={styles.numbering}>1</Text>
                   
               </View>
               <View style={styles.boxcontainer}>
                   <View style={styles.names}></View>
                   <View style={styles.namesbox}>
                     <View style={styles.textcontainer}>
                     <Text style={styles.textbox}>{name}</Text>
                     <Text style={styles.kmbox}>12km</Text>
                     </View>
                   </View>
                   <Text style={styles.numbering}>1</Text>
                   
               </View>
               

            </ScrollView>

        </SafeAreaView>        
    );
};

const styles = StyleSheet.create({
   container: {
      flex: 1,
      backgroundColor: Color.colorDarkorange,
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
      flex: 1,
      top: 150,
      flexDirection: 'column',
     
  },
  names: {
      width: 45,
      height: 45,
      backgroundColor: 'white',
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
      backgroundColor: 'white',
      borderRadius: 20,
      marginBottom: 10,
      left: 23,
  },
  numbering: {
      fontSize: 20,
      fontFamily: 'Poppins-SemiBold',
      color: 'white',
      top: 10,
      textAlign: 'right',
      left: 33,
      marginTop: 8,
  },
  textbox: {
      fontSize: 15,
      fontFamily: 'Poppins-Medium',
      color: 'black',
      top: 13,
      left: 20,
  },
  kmbox: {
   fontSize: 15,
   fontFamily: 'Poppins-Medium',
   color: 'black',
   top: 13,
   left: 80,
},

  textcontainer: {
      flexDirection: 'row',
  }
    
});

export default TaskScreen;
