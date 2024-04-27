import React, { useState } from "react";
import { StyleSheet, View, Pressable, Text, TextInput, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Color } from "../GlobalStyle";
import { useFonts } from 'expo-font';
import { SafeAreaView } from "react-native-safe-area-context";

const LoginScreen = () => {
  const navigation = useNavigation();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [usernameError, setUsernameError] = useState('');
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
        <Text style={styles.LoginText}>Sign In</Text>
        <Text style={styles.inputText}>Username</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your username"
          onChangeText={setUsername}
          value={username}
        />
        {usernameError !== '' && <Text style={styles.error}>{usernameError}</Text>}
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.inputText}>Password</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your password"
          secureTextEntry
          onChangeText={setPassword}
          value={password}
        />
        {passwordError !== '' && <Text style={styles.error}>{passwordError}</Text>}
      </View>

      <Pressable onPress={handleForgotPassword}>
        <Text style={styles.forgot}>Forgot Password?</Text>
      </Pressable>

      <Pressable style={styles.submitButton} onPress={handleLogin}>
        <Text style={styles.submitButtonText}>Submit</Text>
      </Pressable>

      <Text style={styles.SocialText}>Login with</Text>
      <View style={styles.socialIconsContainer}>
        <Pressable style={styles.socialIcon} onPress={() => console.log("Google Login")}>
          <Image source={require('../assets/images/google.png')} style={styles.socialIconImage} />
        </Pressable>
        <Pressable style={styles.socialIcon} onPress={() => console.log("Facebook Login")}>
          <Image source={require('../assets/images/fb.png')} style={styles.socialIconImage} />
        </Pressable>
      </View>

      <Pressable style={styles.signUp} onPress={handleSignUpPress}>
        <Text style={styles.textSignin}>
          Create an account?{' '}
          <Text style={styles.textSignUp}>Sign Up</Text>
        </Text>
      </Pressable>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
  LoginText: {
    fontSize: 50,
    textAlign: "left",
    color: Color.colorDarkorange,
    fontFamily: "Poppins-Bold",
  },
  forgot: {
    fontSize: 14,
    textAlign: "right",
    marginLeft: 200,
    fontFamily: "Poppins-Medium",
  },
  inputContainer: {
    width: "80%",
    alignSelf: "center",
    marginBottom: 10,
  },
  input: {
    height: 50,
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
    fontSize: 15,
    marginBottom: 5,
    fontFamily: "Poppins-Medium",
  },
  submitButtonText: {
    color: "white",
    fontSize: 16,
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
    elevation: 8,
  },
  SocialText: {
    width: "100%",
    textAlign: "center",
    fontSize: 14,
    marginVertical: 10,
    fontFamily: "Poppins-Medium",
  },
  SocialText: {
    width: "100%",
    textAlign: "center",
    fontSize: 14,
    marginVertical: 10,
    fontFamily: "Poppins-Medium",
  },
  socialIconsContainer: {
    flexDirection: "row",
    justifyContent: "center", 
    marginBottom: 10,
  },
  socialIcon: {
    backgroundColor: "transparent",
    padding: 5,
    borderRadius: 20,
    marginHorizontal: 10, 
  },
  socialIconImage: {
    width: 40,
    height: 40,
  },
  signUp: {
    backgroundColor: 'transparent',
  },
  textSignin: {
    flexDirection: "row",
    fontSize: 14,
    right: 10,
    textAlign: 'center',
    fontFamily: "Poppins-Medium",
  },
  textSignUp: {
    color: Color.colorDarkorange,
    fontSize: 14,
    fontFamily: "Poppins-Medium",
  },
  error: {
    color: 'red',
    fontSize: 12,
  },
});

export default LoginScreen;
