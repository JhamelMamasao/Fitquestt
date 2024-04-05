import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Pressable,
  TextInput,
  Text,
  Image,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Picker } from "@react-native-picker/picker";
import { Color } from "../GlobalStyle";
import * as SplashScreen from "expo-splash-screen";
import { SafeAreaView } from "react-native-safe-area-context";
import * as ImagePicker from "expo-image-picker";
import { useFonts } from "expo-font";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { jwtDecode } from "jwt-decode";

const Fillup = () => {
  const navigation = useNavigation();
  const [first_name, setfirst_name] = useState("");
  const [last_name, setlast_name] = useState("");
  const [gender, setGender] = useState("");
  const [height, setHeight] = useState("");
  const [weight, setweight] = useState("");
  const [birth_date, setbirth_date] = useState("");
  const [nameError, setNameError] = useState("");
  const [heightError, setHeightError] = useState("");
  const [weightError, setweightError] = useState("");
  const [birth_dateError, setbirth_dateError] = useState("");
  const [image, setImage] = useState(null);
  const [fontError, setFontError] = useState(false);

  const Logout = () => {
    navigation.navigate("Opening");
  };

  const FinalDashboard = async () => {
    if (validateForm()) {
      const endpoint = "https://fitquest-8it9.onrender.com/api/account/update";

      let formData = new FormData(); // use let or var not const... const can't be modified
      formData.append("username", await AsyncStorage.getItem("username")); // need username
      formData.append("first_name", first_name);
      formData.append("last_name", last_name);
      formData.append("height", +height); // dont remove '+' it convert str to int
      formData.append("weight", +weight); // dont remove '+' it convert str to int
      formData.append("birth_date", birth_date);

      const access = await AsyncStorage.getItem("access"); // get access token

      fetch(endpoint, {
        method: "PATCH",
        body: formData,
        headers: {
          Authorization: `Bearer ${access}`, // need this if need authorization
          "Content-type": "multipart/form-data",
        },
      })
        .then(async (response) => {
          console.log(response);
          if (response.ok) {
            const data = await response.json();
            const decoded = jwtDecode(data.access); // decode the access token

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

            console.log("1111111111111111111111");

            navigation.navigate("Dashboard");
          } else {
            throw new Error(response);
          }
        })
        .then((result) => {
          console.log("API response:", result);
          navigation.navigate("Dashboard");
        })
        .catch((error) => {
          console.log(error);
          // console.error("Error during API request:", error.message);
        });
    }
  };

  const validateForm = () => {
    let valid = true;
    if (first_name.trim() === "") {
      setNameError("Name is required");
      valid = false;
    } else {
      setNameError("");
    }
    if (last_name.trim() === "") {
      setNameError("Name is required");
      valid = false;
    } else {
      setNameError("");
    }
    if (isNaN(height) || height.trim() === "") {
      setHeightError("Height must be a number");
      valid = false;
    } else {
      setHeightError("");
    }
    if (isNaN(weight) || weight.trim() === "") {
      setweightError("Weight must be a number");
      valid = false;
    } else {
      setweightError("");
    }
    if (birth_date.trim() === "") {
      setbirth_dateError("Birth date is required");
      valid = false;
    } else {
      setbirth_dateError("");
    }
    return valid;
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
    });

    if (!result.cancelled) {
      setImage(result.uri);
    }
  };

  let [fontsLoaded] = useFonts({
    "Poppins-Medium": require("../assets/fonts/Poppins-Medium.ttf"),
    "Poppins-Bold": require("../assets/fonts/Poppins-Bold.ttf"),
    "Poppins-Black": require("../assets/fonts/Poppins-Black.ttf"),
  });

  const onLayoutRootView = React.useCallback(async () => {
    if (fontsLoaded || fontError) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontError]);

  if (!fontsLoaded && !fontError) {
    return null;
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.images}>
        <View style={styles.Circle}>
          <Pressable style={styles.socialIcon} onPress={pickImage}>
            <Image
              source={require("../assets/images/upload.png")}
              style={styles.icon}
            />
          </Pressable>
          {image && (
            <Image source={{ uri: image }} style={styles.circleImage} />
          )}
        </View>
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.inputText}>First Name</Text>
        <TextInput
          style={styles.input}
          onChangeText={(text) => setfirst_name(text)}
          value={first_name}
        />
        {nameError !== "" && <Text style={styles.error}>{nameError}</Text>}
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.inputText}>Last Name</Text>
        <TextInput
          style={styles.input}
          onChangeText={(text) => setlast_name(text)}
          value={last_name}
        />
        {nameError !== "" && <Text style={styles.error}>{nameError}</Text>}
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.inputText}>Birth Date</Text>
        <TextInput
          style={styles.input}
          onChangeText={(text) => setbirth_date(text)}
          value={birth_date}
          placeholder="YYYY-MM-DD"
        />
        {birth_dateError !== "" && (
          <Text style={styles.error}>{birth_dateError}</Text>
        )}
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.inputText}>Height</Text>
        <Picker
          selectedValue={height}
          style={styles.input}
          onValueChange={(itemValue, itemIndex) => setHeight(itemValue)}
        >
          <Picker.Item label="Select Height" value="" />
          {Array.from({ length: 150 }, (_, i) => i + 100).map((value) => (
            <Picker.Item
              key={value.toString()}
              label={`${value} cm`}
              value={value.toString()}
            />
          ))}
        </Picker>
        {heightError !== "" && <Text style={styles.error}>{heightError}</Text>}
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.inputText}>Weight</Text>
        <Picker
          selectedValue={weight}
          style={styles.input}
          onValueChange={(itemValue, itemIndex) => setweight(itemValue)}
        >
          <Picker.Item label="Select Weight" value="" />
          {Array.from({ length: 150 }, (_, i) => i + 50).map((value) => (
            <Picker.Item
              key={value.toString()}
              label={`${value} kg`}
              value={value.toString()}
            />
          ))}
        </Picker>
        {weightError !== "" && <Text style={styles.error}>{weightError}</Text>}
      </View>

      <View style={styles.ButtonContainers}>
        <Pressable style={styles.submitButton} onPress={FinalDashboard}>
          <Text style={styles.submitButtonText}>Submit</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
  },
  images: {
    width: 90,
    height: 90,
    borderRadius: 100 / 2,
    backgroundColor: Color.colorDarkorange,
    borderWidth: 3,
  },
  Circle: {
    width: 25,
    height: 25,
    borderRadius: 100 / 2,
    alignSelf: "flex-end",
    marginTop: 70,
    backgroundColor: "white",
    borderWidth: 2,
  },
  icon: {
    width: 20,
    height: 20,
    alignSelf: "flex-end",
  },
  inputContainer: {
    width: "80%",
    alignItems: "flex-start",
  },
  inputText: {
    fontSize: 13,
    fontFamily: "Poppins-Medium",
    marginTop: 10,
    textAlign: "left",
  },
  input: {
    width: "100%",
    height: 45,
    borderColor: "black",
    borderWidth: 1,
    paddingHorizontal: 10,
    borderRadius: 5,
    shadowColor: "black",
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
  },
  error: {
    color: "red",
    fontSize: 12,
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
    paddingVertical: 15,
    borderRadius: 15,
    width: 300,
    alignSelf: "center",
    marginTop: 20,
    elevation: 10,
    fontWeight: "bold",
  },
  ButtonContainers: {
    flexDirection: "row",
    marginTop: 5,
  },
});

export default Fillup;
