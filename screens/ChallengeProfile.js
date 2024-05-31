import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Pressable, Image, ScrollView, TextInput, Modal} from 'react-native';
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
    const [modalVisible, setModalVisible] = useState(false);
    const [modalVisible2, setModalVisible2] = useState(false); // New state for the second modal
    
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
      navigation.navigate('Challenge');
    }

    return (
        <SafeAreaView style={styles.container}>
          <View style={styles.header}>
                <Pressable onPress={goBack}>
                    <Image source={require('../assets/images/backwhite.png')} style={styles.back} />
                </Pressable>
                <Text style={styles.textTask}>Set a Challenge</Text>
         </View>  
                <Image source={require('../assets/images/placeholder.jpg')} style={styles.profile} />
                <View style={styles.expBarContainer}>
                <View style={styles.expBar}></View>
            </View>
             <Text style={styles.exptext}>00</Text> 
             <View style={styles.box}>
               <Text style={styles.Name}>Basic Information</Text>
             </View>
             <View style={styles.TextAligns}>
             <View style={styles.TextAlign}>
               <Text style={styles.Names}>Name</Text>
               <Text style={styles.real}>Jhamel Mamasao</Text>
             </View>
             <View style={styles.TextAlign}>
               <Text style={styles.Names}>Age</Text>
               <Text style={styles.real}>20</Text>
             </View>
             <View style={styles.TextAlign}>
               <Text style={styles.Names}>Height</Text>
               <Text style={styles.real}>170cm</Text>
             </View>
             <View style={styles.TextAlign}>
               <Text style={styles.Names}>Weight</Text>
               <Text style={styles.real}>50kg</Text>
             </View>
             </View>
             <Pressable onPress={() => setModalVisible(true)} style={styles.button}>
                    <Text style={styles.ButtonText}>Set Challenge</Text>
      </Pressable>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.ModalBox}>
          <View style={styles.Modals}>
            <Text style={styles.ModalText}>Set Challenge</Text>
            <Text style={styles.ModalText1}>Challenge your opponent to beat your kilometers! Set the distance and see who comes out on top.</Text>
            <TextInput style={styles.input} placeholder="Enter Kilometers" />
            <Pressable onPress={() => setModalVisible(!modalVisible)} style={styles.Buttons}>
              <Text style={styles.Buttonstext}>Cancel</Text>
            </Pressable>
            <Pressable style={styles.Buttons2} onPress={() => setModalVisible2(true)}>
              <Text style={styles.Buttonstext2}>Confirm</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible2} // Use modalVisible2 for the second modal
        onRequestClose={() => {
          setModalVisible2(!modalVisible2);
        }}
      >
         <View style={styles.ModalBoxs}>
             <View style={styles.Modals2}>
                 <Image source={require('../assets/images/check.png')} style={styles.check} />
                 <Text style={styles.ModalText2}>Challenge Has Been Set!</Text>
                 <Text style={styles.ModalText11}>Your challenge has been successfully dispatched to the designated recipient. Stay tuned for their response and keep your competitive spirit high!</Text>
                 <Pressable onPress={goBack} style={styles.Buttons3}>
                     <Text style={styles.Buttonstext2}>Close</Text>
                  </Pressable>
         </View>
         </View>

      </Modal>
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
      fontSize: 15,
      fontFamily: 'Poppins-Medium',
      marginTop: 18,
      color: 'white',
  },
  profile: {
      position: 'absolute',
      width: 100,
      height: 100,
      borderRadius: 55,
      backgroundColor: 'white',
      top: 130,
      left: 130,
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
exptext: {
   fontSize: 12,
   fontFamily: 'Poppins-Medium',
   color: 'white',
   top: 210,
   left: 90,
},
box: {
   width: "90%",
   height: '7%',
   backgroundColor: Color.colorDarkorange,
   alignSelf: 'center',
   top: 230,
   borderRadius: 10,
   elevation: 2,
   padding: 5,
},
Name: {
   fontSize: 15,
   fontFamily: 'Poppins-Medium',
   color: 'white',
   top: 10,
   left: 20,
},
TextAlign: {
   flexDirection: 'row',
   justifyContent: 'space-between',
},
button: {
   width: "90%",
   backgroundColor: Color.colorDarkorange,
   height: 60,
   top: 300,
   alignSelf: 'center',
   borderRadius: 10,
   elevation: 2,
},
ButtonText: {
   fontSize: 13,
   fontFamily: 'Poppins-Medium',
   color: 'white',
   textAlign: 'center',
   top: 20,
},
ModalBox: {
   flex: 1,
   justifyContent: 'center',
   alignItems: 'center',
   backgroundColor: 'rgba(0,0,0,0.5)',
},
Modals: {
   width: '85%',
   height: 370,
   backgroundColor: 'white',
   borderRadius: 10,
   padding: 20,
},
ModalText: {
   fontSize: 20,
   fontFamily: 'Poppins-Medium',
   textAlign: 'center',
   marginBottom: 20,
   color: 'black',
},
ModalText1: {
   fontSize: 13,
   fontFamily: 'Poppins-Medium',
   textAlign: 'center',
   color: 'black',
   marginBottom: 10,
},
input: {
   width: '95%',
   height: 48,
   backgroundColor: '#ddd',
   borderRadius: 10,
   alignSelf: 'center',
   fontSize: 13,
   top: 20,
   paddingLeft: 10,
},
Buttons: {
   width: '95%',
   height: 48,
   backgroundColor: 'white',
   borderRadius: 10,
   alignSelf: 'center',
   top: 50,
   borderColor: Color.colorDarkorange,
   borderWidth: 2,
},
Buttonstext: {
   fontSize: 13,
   fontFamily: 'Poppins-Medium',
   color: Color.colorDarkorange,
   textAlign: 'center',
   top: 15,
},
Buttons2: {
   width: '95%',
   height: 48,
   backgroundColor: Color.colorDarkorange,
   borderRadius: 10,
   alignSelf: 'center',
   top: 70,
},
Buttonstext2: {
   fontSize: 13,
   fontFamily: 'Poppins-Medium',
   color: 'white',
   textAlign: 'center',
   top: 15,
},
TextAligns: {
   top: 250,
},
TextAlign: {
   flexDirection: 'row',
   margin: 5,
},
Names: {
   fontSize: 15,
   fontFamily: 'Poppins-Medium',
   color: 'white',
   left: 20,
},
real: {
   fontSize: 15,
   fontFamily: 'Poppins-Medium',
   color: 'white',
   position: 'absolute',
   textAlign: 'right',
   right: 20,
},
ModalBoxs: {
   flex: 1,
   justifyContent: 'center',
   alignItems: 'center',
   backgroundColor: 'rgba(0,0,0,0.5)',
},
Modals2: {
   width: '85%',
   height: 370,
   backgroundColor: 'white',
   borderRadius: 10,
   padding: 20,
  
},
ModalText2: {
   fontSize: 18,
   fontFamily: 'Poppins-Medium',
   textAlign: 'center',
   top: 40,
   marginBottom: 20,
   color: 'black',
},
check: {
   width: 80,
   height: 80,
   alignSelf: 'center',
   top: 20,
},
Buttons3: {
   width: '95%',
   height: 45,
   backgroundColor: '#5BE01C',
   borderRadius: 10,
   alignSelf: 'center',
   top: 30,
},
Buttonstext2: {
   fontSize: 13,
   fontFamily: 'Poppins-Medium',
   color: 'white',
   textAlign: 'center',
   top: 15,
},
ModalText11: {
   fontSize: 13,
   fontFamily: 'Poppins-Medium',
   textAlign: 'center',
   color: 'black',
   marginBottom: 10,
   top: 25,
   padding: 10,
},





    
});

export default TaskScreen;
