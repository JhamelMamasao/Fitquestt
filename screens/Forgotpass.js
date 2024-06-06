import React, { useState } from "react";
import { StyleSheet, View, Pressable, Text, TextInput, Image} from "react-native"; // Import AsyncStorage
import { useNavigation } from "@react-navigation/native";
import { Color } from "../GlobalStyle";
import { useFonts } from 'expo-font';
import { SafeAreaView } from "react-native-safe-area-context";
import AsyncStorage from '@react-native-async-storage/async-storage';


const Forgotpass = () => {
  const navigation = useNavigation();
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [usernameError, setUsernameError] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [fontsLoaded, error] = useFonts({
    "Poppins-Medium": require('../assets/fonts/Poppins-Medium.ttf'),
    "Poppins-Bold": require('../assets/fonts/Poppins-Bold.ttf'),
  }); 

  const handleLogin = async () => {
    try {
      if (!validateForm()) {
        return;
      }

      // Send a POST request to your API endpoint for authentication
      const response = await fetch('https://fitquest-8it9.onrender.com/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username,
          password,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        // Store access token in AsyncStorage
        await AsyncStorage.setItem('access', data.access);

        // Navigate to Dashboard
        navigation.navigate('Dashboard');
      } else {
        setUsernameError('Invalid username or password');
        setPasswordError('Invalid username or password');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleSignUpPress = () => {
    navigation.navigate('Register');
  };

  const handleForgotPassword = () => {
    console.log("Forgot Password");
  };

  const validateForm = () => {
    let valid = true;
    if (username.trim() === '') {
      setUsernameError('Username is required');
      valid = false;
    } else {
      setUsernameError('');
    }

    if (password.trim() === '') {
      setPasswordError('Password is required');
      valid = false;
    } else {
      setPasswordError('');
    }
    return valid;
  };

  if (!fontsLoaded && !error) {
    return null;
  }

  return (
    <SafeAreaView style={styles.container}>
    <View style={styles.Headerbox}>
    <Pressable onPress={() => navigation.goBack()} style={styles.backButton}>
       <Image source={require('../assets/images/backwhite.png')} style={styles.back} />
     </Pressable>
       <Text style={styles.Welcome}>Forgot{'\n'}Password.</Text>
  </View>
      <View style={styles.inputContainer}>
      <Text style={styles.inputText}>Old Password</Text>
        <TextInput
          style={styles.input}
          placeholder="Old Password"
          placeholderTextColor={'white'}
          secureTextEntry
          onChangeText={setOldPassword}
          value={username}
        />
        {passwordError !== '' && <Text style={styles.error}>{passwordError}</Text>}
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.inputText}>New Password</Text>
        <TextInput
          style={styles.input}
          placeholder="New Password"
          placeholderTextColor={'white'}
          secureTextEntry
          onChangeText={setNewPassword}
          value={password}
        />
        {passwordError !== '' && <Text style={styles.error}>{passwordError}</Text>}
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.inputText}>Confirm Password</Text>
        <TextInput
          style={styles.input}
          placeholder="Confirm Password"
          placeholderTextColor={'white'}
          secureTextEntry
          onChangeText={setConfirmPassword}
          value={password}
        />
        {passwordError !== '' && <Text style={styles.error}>{passwordError}</Text>}
      </View>

      <Pressable style={styles.submitButton} onPress={handleLogin}>
        <Text style={styles.submitButtonText}>Submit</Text>
      </Pressable>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1F1F1F",
  },
  Headerbox: {
    flex: 0.3, 
    backgroundColor: Color.colorDarkorange,
    width: '100%',
    height: 230,
    borderBottomLeftRadius: 70, 
    position: 'absolute',
    padding: 30,
  },
  back: {
    width: 20,
    height: 15,
    alignContent: 'flex-start',
    top: 50,
  },
  Welcome: {
    fontSize: 25,
    fontFamily: 'Poppins-Medium',
    color: Color.colorWhite,
    top: 80,
  },
  inputContainer: {
    width: '80%',
    alignSelf: 'center',
    top: 260,

  },
  inputText: {
    color: Color.colorWhite,
    fontSize: 14,
    fontFamily: 'Poppins-Medium',
  },
  input: {
    height: 45,
    borderColor: "gray",
    borderBottomWidth: 1,
    width: "100%",
    padding: 10,
    color: Color.colorWhite,
    fontSize: 12,
    marginBottom: 10,
  },
  submitButton: {
    backgroundColor: Color.colorDarkorange,
    padding: 10,
    margin: 15,
    height: 50,
    borderRadius: 10,
    top: 270,
    width: '80%',
    alignSelf: 'center',
    justifyContent: 'center',
  },
  submitButtonText: {
    color: Color.colorWhite,
    fontFamily: 'Poppins-Medium',
    fontSize: 12,
    textAlign: 'center',
  },
  

});

export default Forgotpass;
