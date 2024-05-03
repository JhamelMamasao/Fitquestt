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
      <View style={styles.inputContainer}>
        <Text style={styles.LoginText}>Forgot Password</Text>
        <Text style={styles.inputText}>Old Password</Text>
        <TextInput
          style={styles.input}
          placeholder="Old Password"
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
    backgroundColor: "#fefefe",
    justifyContent: 'center',
    alignItems: 'center',
  },
  LoginText: {
    fontSize: 30,
    textAlign: "left",
    color: Color.colorDarkorange,
    fontFamily: "Poppins-Bold",
  },
  forgot: {
    fontSize: 13,
    textAlign: "right",
    left: 90,
    fontFamily: "Poppins-Medium",
  },
  inputContainer: {
    width: "80%",
    alignSelf: "center",
    marginBottom: 10,
  },
  input: {
    height: 45,
    borderColor: "gray",
    borderWidth: 1,
    width: "100%",
    padding: 10,
    borderRadius: 5,
    shadowColor: 'black',
    shadowOpacity: 0.6,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
  },
  inputText: {
    fontSize: 13,
    marginBottom: 5,
    fontFamily: "Poppins-Medium",
  },
  submitButtonText: {
    color: "white",
    fontSize: 13,
    fontWeight: "bold",
    textAlign: "center",
    fontFamily: "Poppins-Medium",
  },
  submitButton: {
    backgroundColor: Color.colorDarkorange,
    paddingVertical: 18,
    borderRadius: 15,
    width: "80%",
    alignSelf: "center",
    marginTop: 10,
    shadowColor: 'black',
    shadowOpacity: 0.8,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
    elevation: 5,
  },
  SocialText: {
    textAlign: "center",
    fontSize: 13,
    marginVertical: 10,
    fontFamily: "Poppins-Medium",
  },
  socialIconsContainer: {
    flexDirection: "row",
    justifyContent: "center", 
    marginBottom: 8,
  },
  socialIcon: {
    backgroundColor: "transparent",
    padding: 5,
    borderRadius: 20,
    marginHorizontal: 5, 
  },
  socialIconImage: {
    width: 30,
    height: 30,
  },
  signUp: {
    backgroundColor: 'transparent',
  },
  textSignin: {
    flexDirection: "row",
    fontSize: 13,
    textAlign: 'center',
    fontFamily: "Poppins-Medium",
  },
  textSignUp: {
    color: Color.colorDarkorange,
    fontSize: 13,
    fontFamily: "Poppins-Bold",
   
  },
  error: {
    color: 'red',
    fontSize: 12,
  },
});

export default Forgotpass;
