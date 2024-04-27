import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Pressable, TextInput, Text, Image, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Color } from '../GlobalStyle';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { SafeAreaView } from 'react-native-safe-area-context';

const FinalDashboard = () => {
  const navigation = useNavigation();
  const [fontError, setFontError] = useState(false);
  const [name, setName] = useState(' ');

  useEffect(() => {
    const fetchedName = 'Jhamel';
    setName(fetchedName);
  }, []);

  const dashboard2 = () => {
    navigation.navigate('ChooseQuest');
  };
  const LoginScreen = () => {
    navigation.navigate('LoginScreen');
  };

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

  const Header = () => {
    return (
      <View style={styles.header}> 
          <View style={styles.profile}>
               <Image  style={styles.profileImage} />
          </View>
          <View style={styles.textContainer}>
          <Text style={styles.greet}>Hello {name},</Text>
          <Text style={styles.naText}>Let's Run</Text>
      </View>
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
        <Text style={styles.dashboardtext}>Dashboard</Text>
        <ScrollView horizontal={true} style={styles.boxContainer}>
          <Box title="User Profile" onPress={() => {}} icon={require('../assets/images/users.png')} />
          <Box title="Leaderboards" onPress={() => {}} icon={require('../assets/images/la.png')} />
          <Box title="Challenge" onPress={() => {}} icon={require('../assets/images/cha.png')} />
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    padding: 10,
    flexDirection: 'row-reverse',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    
  },
  profile: {
    width: 55,
    height: 55,
    borderRadius: 50,
    backgroundColor: Color.colorDarkorange,
    
    
    
  },
  profileImage: {
    width: '100%',
    height: '100%',
    borderRadius: 25,
  },
  greet: {
    fontSize: 20,
    fontFamily: 'Poppins-Medium',

   
  },
  naText: {
    fontSize: 30,
    fontFamily: 'Poppins-Bold',
    alignSelf: 'flex-start',
  },
  circle: {
    width: 100,
    height: 100,
    borderRadius: 80,
    backgroundColor: 'rgba(255, 255, 255, 0.4)', 
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: 'black',
    alignItems: 'center',
},
  icon: {
    width: 100,
    height: 100,
    borderRadius: 25,
  },
  boxContainer1: {
    flex: 1,
    padding: 10,
  },
  boxContainer: {
    flex: 1,
    marginTop: 20,
    flexDirection: 'row',
  },
  dashboardtext: {
    top: 20,
    fontSize: 20,
    fontFamily: 'Poppins-Medium',
    marginLeft: 9,
  },
  box: {
    width: 200, 
    height: '100%', 
    padding: 5,
    shadowColor: 'black',
    shadowOpacity: 0.8,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
    elevation: 8,
  },
  box1: {
    width: '100%',
    height: '40%',
    backgroundColor: Color.colorDarkorange,
    padding: 11,
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
    fontSize: 20,
    top: 10,
    color: 'white',
  },
  Challengetext:  {
    fontSize: 40,
    fontFamily: 'Poppins-Bold',
    marginLeft: 9,
    color: 'white',
    marginTop: 10,
  },
  Challengetext1:  {
    fontSize: 17,
    fontFamily: 'Poppins-Medium',
    marginLeft: 9,
    color: 'white',
    top: '-5%',
  },
  Vector: {
    width: 70,
    height: 50,
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
    height: '80%', 
    position: 'absolute', 
    bottom: '-38%', 
    right: 110,
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




});

export default FinalDashboard;