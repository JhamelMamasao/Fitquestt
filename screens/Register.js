import React, { useState } from "react";
import { StyleSheet, View, Pressable, Text, TextInput, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Color } from "../GlobalStyle";
import { SafeAreaView } from "react-native-safe-area-context";

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

      const response = await fetch('https://fitquest-8it9.onrender.com/api/auth/register', {
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
        navigation.navigate('Fillup'); // Navigate to success screen or next step
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
      <View style={styles.inputContainer}>
        <Text style={styles.loginText}>Sign Up</Text>
        <Text style={styles.inputText}>Email</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your email"
          onChangeText={(text) => setEmail(text)}
          value={email}
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.inputText}>Username</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your Username"
          onChangeText={(text) => setUsername(text)}
          value={username}
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.inputText}>Password</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your password"
          secureTextEntry={true}
          onChangeText={(text) => setPassword1(text)}
          value={password1}
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.inputText}>Confirm Password</Text>
        <TextInput
          style={styles.input}
          placeholder="Confirm your password"
          secureTextEntry={true}
          onChangeText={(text) => setPassword2(text)}
          value={password2}
        />
      </View>

      {error !== '' && <Text style={styles.error}>{error}</Text>}

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
    {"If you already have an account \n please "}
    <Text style={styles.textSignup}>Sign In</Text>
  </Text>
</Pressable>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fefefe',
    justifyContent: 'center',
    alignItems: 'center',
  },
  loginText: {
    fontSize: 40,
    textAlign: "left",
    color: Color.colorDarkorange,
    fontFamily: "Poppins-Bold",
  },
  inputContainer: {
    width: "80%",
    alignSelf: "center",
    marginBottom: 5,
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
    marginBottom: 3,
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
    marginTop: 15,
    shadowColor: 'black',
    shadowOpacity: 0.8,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
    elevation: 8,
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
  Signup: {
    backgroundColor: 'transparent',
    marginTop: 5,
    fontFamily: "Poppins-Medium",
    right: 10,
  },
  textSignup: {
    flexDirection: "row",
    color: Color.colorDarkorange,
    fontSize: 13,
    textAlign: 'center',
    marginHorizontal: 5,
    fontFamily: "Poppins-Bold",
  },
  textall: {
    flexDirection: "row",
    fontSize: 13,
    textAlign: 'center',
    fontFamily: "Poppins-Medium",
  },
  error: {
    color: 'red',
    fontSize: 12,
    textAlign: 'center',
  },
});

export default Register;
