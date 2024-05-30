import React, { useState } from "react";
import { StyleSheet, View, Pressable, Text, TextInput, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Color } from "../GlobalStyle";
import { SafeAreaView } from "react-native-safe-area-context";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Register = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password1, setPassword1] = useState('');
  const [password2, setPassword2] = useState('');
  const [error, setError] = useState('');

  const handleSignUp = async () => {
    try {
      if (!email || !username || !password1 || !password2) {
        setError('Please fill in all fields');
        return;
      }

      console.log("Signing up with:", { email, username, password1, password2 });

      const response = await fetch('https://fit-quest.azurewebsites.net/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          username,
          password1,
          password2,
        }),
      });

      if (response.ok) {
        try {
          
          const login = await fetch('https://fit-quest.azurewebsites.net/api/auth/login', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              username,
              password: password1,
            }),
          });

          const data = await response.json();
          await AsyncStorage.setItem('access', data.access);
          console.log("Login successful:", data);
        } catch (error) {
          
            console.error('Errorrrrrrrrrrrrrrrrrrrrrrrrrrr:', error);
        }

        
        navigation.navigate('Fillup');
      } else {
        const data = await response.json();
        setError(data.message); // Display error message from the server
      }
    } catch (error) {
      console.error('Error:', error);
      setError('An error occurred. Please try again.'); // Set generic error message
    }
  }

  const handleSignInPress = () => {
    console.log("Navigating to sign-in screen");
    navigation.navigate('Login');
  };

  return (
    <SafeAreaView style={styles.container}>
       <View style={styles.Headerbox}>
       <Pressable onPress={() => navigation.goBack()} style={styles.backButton}>
          <Image source={require('../assets/images/backwhite.png')} style={styles.back} />
        </Pressable>
          <Text style={styles.Welcome}>Create{'\n'}Account.</Text>
     </View>
     <View style={styles.inputContainer}>
        <Text style={styles.inputText}>Email</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your email"
          placeholderTextColor={'grey'}
          onChangeText={(text) => setEmail(text)}
          value={email}
        />
        {error !== '' && <Text style={styles.error}>{error}</Text>}
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.inputText}>Username</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your Username"
          placeholderTextColor={'grey'}
          onChangeText={(text) => setUsername(text)}
          value={username}
        />
        {error !== '' && <Text style={styles.error}>{error}</Text>}
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.inputText}>Password</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your password"
          secureTextEntry={true}
          placeholderTextColor={'grey'}
          onChangeText={(text) => setPassword1(text)}
          value={password1}
        />
        {error !== '' && <Text style={styles.error}>{error}</Text>}
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.inputText}>Confirm Password</Text>
        <TextInput
          style={styles.input}
          placeholder="Confirm your password"
          secureTextEntry={true}
          placeholderTextColor={'grey'}
          onChangeText={(text) => setPassword2(text)}
          value={password2}
        />
        {error !== '' && <Text style={styles.error}>{error}</Text>}
      </View>
      <Pressable style={styles.submitButton} onPress={handleSignUp}>
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
      <Pressable style={styles.Signup} onPress={handleSignInPress}>
        <Text style={styles.textall}>
          {"if you already have an account \n please "}
          <Text style={styles.textSignup}>Sign In</Text>
        </Text>
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
    top: 220,

  },
  inputText: {
    color: Color.colorWhite,
    fontSize: 13,
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
    marginBottom: 8,
  },
  submitButton: {
    backgroundColor: Color.colorDarkorange,
    padding: 10,
    margin: 15,
    height: 50,
    borderRadius: 10,
    top: 215,
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
  error: {
    color: 'red',
    fontSize: 8,
    fontFamily: 'Poppins-Medium',
    bottom: 5,
  },
  SocialText: {
    color: Color.colorWhite,
    fontFamily: 'Poppins-Medium',
    fontSize: 12,
    alignSelf: 'center',
    top: 210,
  },
  socialIconsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    top: 220,
  },
  socialIcon: {
    backgroundColor: Color.colorDarkorange,
    width: 40,
    height: 40,
    padding: 5,
    borderRadius: 20,
    marginHorizontal: 10, 
  },
  socialIconImage: {
    width: 30,
    height: 30,
  },
  Signup: {
    top: 230,
    alignSelf: 'center',
  },
  textall: {
    color: Color.colorWhite,
    fontFamily: 'Poppins-Medium',
    fontSize: 12,
    textAlign: 'center',
  },
  textSignup: {
    color: Color.colorDarkorange,
    fontFamily: 'Poppins-Bold',
    fontSize: 12,
  },

});

export default Register;
