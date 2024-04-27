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
    const [modalVisibles, setModalVisibles] = useState(false);
    
    
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
                    <Image source={require('../assets/images/Backblack.png')} style={styles.back} />
                </Pressable>
                <Text style={styles.textTask}>Set a Challenge</Text>
         </View>  
                <Image source={require('../assets/images/placeholder.jpg')} style={styles.profile} />
                <View style={styles.expBarContainer}>
                <View style={styles.expBar}></View>
            </View>
             <Text style={styles.exptext}>00</Text> 
             <View style={styles.box}>
             <Text style={styles.Name}>Name</Text>
             <Text style={styles.Names}>Jhamel Mamasao</Text>
             <View style={styles.TextAlign}>
               <Text style={styles.Name}>Age</Text>
               <Text style={styles.Names}>20</Text>
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
            <Text style={styles.ModalText1}> Rem atque recusandae qui eaque nostrum sit soluta dolores qui rerum dolorem ut consequatur quia vel neque odit vel temporibus dolor. Ut eveniet distinctio eos autem provident ut modi corrupti 33 tempore soluta non .</Text>
            <TextInput style={styles.input} placeholder="Enter Challenge" />
            <Pressable onPress={() => setModalVisible(!modalVisible)} style={styles.Buttons}>
              <Text style={styles.Buttonstext}>Cancel</Text>
            </Pressable>
            <Pressable style={styles.Buttons2} onPress={() => setModalVisibles(true)}>
              <Text style={styles.Buttonstext2}>Confirm</Text>
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
      backgroundColor: 'white',
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
      color: 'black',
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
   color: 'black',
   top: 210,
   left: 90,
},
box: {
   width: "90%",
   height: '35%',
   backgroundColor: Color.colorDarkorange,
   alignSelf: 'center',
   top: 230,
   borderRadius: 20,
   elevation: 2,
   padding: 5,
},
Name: {
   fontSize: 15,
   fontFamily: 'Poppins-Bold',
   color: 'white',
   top: 15,
   left: 20,
},
Names: {
   fontSize: 18,
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
   height: 70,
   top: 280,
   alignSelf: 'center',
   borderRadius: 10,
   elevation: 2,
},
ButtonText: {
   fontSize: 15,
   fontFamily: 'Poppins-Medium',
   color: 'white',
   textAlign: 'center',
   top: 25,
},
ModalBox: {
   flex: 1,
   justifyContent: 'center',
   alignItems: 'center',
   backgroundColor: 'rgba(0,0,0,0.5)',
},
Modals: {
   width: '90%',
   height: '60%',
   backgroundColor: 'white',
   borderRadius: 10,
   padding: 20,
   borderColor: Color.colorDarkorange,
   borderWidth: 2,
},
ModalText: {
   fontSize: 20,
   fontFamily: 'Poppins-Medium',
   textAlign: 'center',
   marginBottom: 20,
   color: Color.colorDarkorange
},
ModalText1: {
   fontSize: 15,
   fontFamily: 'Poppins-Medium',
   textAlign: 'center',
   color: Color.colorDarkorange,
   marginBottom: 10,
   lineHeight: 20,
},
input: {
   width: '95%',
   height: 50,
   backgroundColor: '#ddd',
   borderRadius: 10,
   alignSelf: 'center',
   top: 20,
   paddingLeft: 10,
},
Buttons: {
   width: '95%',
   height: 50,
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
   height: 50,
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
}

    
});

export default TaskScreen;
