import React, { useState, useEffect } from "react";
import { StyleSheet, View, Image, Text, ScrollView, Pressable } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { SafeAreaView } from "react-native-safe-area-context";
import { Color } from "../GlobalStyle";
import { LinearGradient } from 'expo-linear-gradient';

const Dashboard = () => {
  const navigation = useNavigation();
  const [fontError, setFontError] = useState(false);
  const [name, setName] = useState('');
  
  useEffect(() => {
    // Fetch name from database
    // For demo purposes, let's assume we fetch the name and set it
    const fetchedName = 'Username';
    setName(fetchedName);
  }, []);

  const dashboard2 = () => {
    navigation.navigate('dashboard2');
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
        <Text style={styles.nameText}>{name}</Text>
      </View>
    );
  }

  const Box = ({ title, onPress }) => {
    return (
      <View style={styles.box}>
        <Pressable style={styles.inner} onPress={onPress}>
          <Text style={styles.innerText}>{title}</Text>
        </Pressable>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <Header />
      <View style={styles.boxContainer}>
        <Box title="Quest" onPress={dashboard2}/>
        <Box title="UserProfile" onPress={() => {}} />
        <Box title="LeaderBoards" onPress={() => {}} />
        <Box title="Challenge" onPress={() => {}} />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    backgroundColor: Color.colorDarkorange,
  },
  profile: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: 'white',
    marginRight: 10,
  },
  profileImage: {
    width: '100%',
    height: '100%',
    borderRadius: 25,
  },
  nameText: {
    fontFamily: 'Poppins-Medium',
    fontSize: 20,
    color: 'white',
  },
  boxContainer: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 5,
  },
  box: {
    width: '50%',
    height: '50%',
    padding: 5,

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
    fontSize: 25,
    color: 'white',
  },

  runns: {
    height: '100%',
    width: '100%',
    marginLeft: 10,
  }
});

export default Dashboard;
