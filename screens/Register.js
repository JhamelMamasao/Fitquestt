import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Pressable,
  Text,
  TextInput,
  Image,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Color } from "../GlobalStyle";
import { SafeAreaView } from "react-native-safe-area-context";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { jwtDecode } from "jwt-decode";

const Register = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password1, setPassword1] = useState("");
  const [password2, setPassword2] = useState("");
  const [error, setError] = useState("");

  const handleSignUp = async () => {
    try {
      if (!email || !username || !password1 || !password2) {
        setError("Please fill in all fields");
        return;
      }

      console.log("Signing up with:", {
        email,
        username,
        password1,
        password2,
      });

      const response = await fetch(
        "https://fitquest-8it9.onrender.com/api/auth/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
            username,
            password1,
            password2,
          }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        navigation.navigate("Fillup");
        const decoded = jwtDecode(data.access); // decode the access token

        console.log(decoded);

        await AsyncStorage.setItem("access", data.access); // save the access token
        await AsyncStorage.setItem("refresh", data.refresh); // save the refresh token

        await AsyncStorage.setItem("user_id", decoded.user_id.toString()); // save the decoded user_id
        await AsyncStorage.setItem("first_name", decoded.first_name); // save the decoded first_name
        await AsyncStorage.setItem("last_name", decoded.last_name); // save the decoded last_name
        await AsyncStorage.setItem("birth_date", decoded.birth_date); // save the decoded birth_date
        await AsyncStorage.setItem("email", decoded.email); // save the decoded email
        await AsyncStorage.setItem("username", decoded.username); // save the decoded username
        await AsyncStorage.setItem(
          "height",
          decoded.height ? decoded.height.toString() : "0"
        ); // save the decoded height
        await AsyncStorage.setItem(
          "weight",
          decoded.weight ? decoded.weight.toString() : "0"
        ); // save the decoded weight
        await AsyncStorage.setItem("profile", decoded.profile); // save the decoded profile
        await AsyncStorage.setItem("slug", decoded.slug); // save the decoded slug
      } else {
        setError(data.message); // Display error message from the server
      }
    } catch (error) {
      console.error("Error:", error);
      setError("An error occurred. Please try again."); // Set generic error message
    }
  };

  const handleSignInPress = () => {
    console.log("Navigating to sign-in screen");
    navigation.navigate("Login");
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

      {error !== "" && <Text style={styles.error}>{error}</Text>}

      <Pressable style={styles.submitButton} onPress={handleSignUp}>
        <Text style={styles.submitButtonText}>Submit</Text>
      </Pressable>

      <Text style={styles.SocialText}>Login with</Text>
      <View style={styles.socialIconsContainer}>
        <Pressable
          style={styles.socialIcon}
          onPress={() => console.log("Google Login")}
        >
          <Image
            source={require("../assets/images/google.png")}
            style={styles.socialIconImage}
          />
        </Pressable>
        <Pressable
          style={styles.socialIcon}
          onPress={() => console.log("Facebook Login")}
        >
          <Image
            source={require("../assets/images/fb.png")}
            style={styles.socialIconImage}
          />
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
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
  },
  loginText: {
    fontSize: 50,
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
    height: 50,
    borderColor: "gray",
    borderWidth: 1,
    width: "100%",
    padding: 10,
    borderRadius: 5,
    shadowColor: "black",
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
    marginTop: 15,
    shadowColor: "black",
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
  socialIconsContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 5,
  },
  socialIcon: {
    backgroundColor: "transparent",
    padding: 5,
    borderRadius: 20,
    marginHorizontal: 10,
  },
  socialIconImage: {
    width: 35,
    height: 35,
  },
  Signup: {
    backgroundColor: "transparent",
    marginTop: 5,
    fontFamily: "Poppins-Medium",
    right: 10,
  },
  textSignup: {
    flexDirection: "row",
    color: Color.colorDarkorange,
    fontSize: 13,
    textAlign: "center",
    marginHorizontal: 5,
    fontFamily: "Poppins-Medium",
  },
  textall: {
    flexDirection: "row",
    fontSize: 13,
    textAlign: "center",
    fontFamily: "Poppins-Medium",
  },
  error: {
    color: "red",
    fontSize: 12,
    textAlign: "center",
  },
});

export default Register;
