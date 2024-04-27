import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Pressable, TextInput, Text, Image } from "react-native";  
import { useNavigation } from "@react-navigation/native";
import {Picker} from '@react-native-picker/picker';
import { Color } from "../GlobalStyle";
import * as SplashScreen from 'expo-splash-screen';
import { SafeAreaView } from "react-native-safe-area-context";
import * as ImagePicker from 'expo-image-picker';
import { useFonts } from 'expo-font';

const Fillup = () => {
  const navigation = useNavigation();
  const [fname, setFName] = useState('');
  const [lname, setLName] = useState('');
  const [gender, setGender] = useState('');
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [birthdate, setBirthdate] = useState('');
  const [nameError, setNameError] = useState('');
  const [genderError, setGenderError] = useState('');
  const [heightError, setHeightError] = useState('');
  const [weightError, setWeightError] = useState('');
  const [birthdateError, setBirthdateError] = useState('');
  const [image, setImage] = useState(null);
  const [fontError, setFontError] = useState(false); 

  const Logout = () => {
    navigation.navigate('Opening');
  };

  const FinalDashboard = () => {
    navigation.navigate('Dashboard');
  };

  const validateForm = () => {
    let valid = true;
    if (fname.trim() === '') {
      setNameError('Name is required');
      valid = false;
    } else {
      setNameError('');
    }
    if (lname.trim() === '') {
      setNameError('Name is required');
      valid = false;
    } else {
      setNameError('');
    }
    if (gender.trim() === '') {
      setGenderError('Gender is required');
      valid = false;
    } else {
      setGenderError('');
    }
    if (isNaN(height) || height.trim() === '') {
      setHeightError('Height must be a number');
      valid = false;
    } else {
      setHeightError('');
    }
    if (isNaN(weight) || weight.trim() === '') {
      setWeightError('Weight must be a number');
      valid = false;
    } else {
      setWeightError('');
    }
    if (birthdate.trim() === '') {
      setBirthdateError('Birthdate is required');
      valid = false;
    } else {
      setBirthdateError('');
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

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.images}>
        <View style={styles.Circle}>
          <Pressable style={styles.socialIcon} onPress={pickImage}>
            <Image source={require('../assets/images/upload.png')} style={styles.icon} />
          </Pressable>
          {image && <Image source={{ uri: image }} style={styles.circleImage} />}
        </View>
      </View>



      <View style={styles.inputContainer}>
        <Text style={styles.inputText}>First Name</Text>
        <TextInput
          style={styles.input}
          onChangeText={(text) => setFName(text)}
          value={fname}
        />
        {nameError !== '' && 
        <Text style={styles.error}>{nameError}</Text>}
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.inputText}>Last Name</Text>
        <TextInput
          style={styles.input}
          onChangeText={(text) => setLName(text)}
          value={lname}
        />
        {nameError !== '' && 
        <Text style={styles.error}>{nameError}</Text>}
      </View>


      <View style={styles.inputContainer}>
        <Text style={styles.inputText}>Gender</Text>
        <Picker
          selectedValue={gender}
          style={styles.input}
          onValueChange={(itemValue, itemIndex) =>
            setGender(itemValue)
          }>
          <Picker.Item label="Select Gender" value="" />
          <Picker.Item label="Male" value="male" />
          <Picker.Item label="Female" value="female" />
        </Picker>
        {genderError !== '' && 
        <Text style={styles.error}>{genderError}</Text>}
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.inputText}>Birthdate</Text>
        <TextInput
          style={styles.input}
          onChangeText={(text) => setBirthdate(text)}
          value={birthdate}
          placeholder="YYYY-MM-DD"
        />
        {birthdateError !== '' && 
        <Text style={styles.error}>{birthdateError}</Text>}
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.inputText}>Height</Text>
        <Picker
          selectedValue={height}
          style={styles.input}
          onValueChange={(itemValue, itemIndex) =>
            setHeight(itemValue)
          }>
          <Picker.Item label="Select Height" value="" />
          {Array.from({length: 150}, (_, i) => i + 100).map(value => (
            <Picker.Item key={value.toString()} label={`${value} cm`} value={value.toString()} />
          ))}
        </Picker>
        {heightError !== '' && 
        <Text style={styles.error}>{heightError}</Text>}
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.inputText}>Weight</Text>
        <Picker
          selectedValue={weight}
          style={styles.input}
          onValueChange={(itemValue, itemIndex) =>
            setWeight(itemValue)
          }>
          <Picker.Item label="Select Weight" value=""/>
          {Array.from({length: 150}, (_, i) => i + 50).map(value => (
            <Picker.Item key={value.toString()} label={`${value} kg`} value={value.toString()} />
          ))}
        </Picker>
        {weightError !== '' && 
        <Text style={styles.error}>{weightError}</Text>}
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
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
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
    alignSelf: 'flex-end',
    marginTop: 70,
    backgroundColor: 'white',
    borderWidth: 2,
  },
  icon: {
    width: 20,
    height: 20,
    alignSelf: 'flex-end',
  },
  inputContainer: {
    width: "80%",
    alignItems: 'flex-start',
  },
  inputText: {
    fontSize: 13,
    fontFamily: 'Poppins-Medium',
    marginTop: 10,
    textAlign: 'left', 
  },
  input: {
    width: "100%", 
    height: 45,
    borderColor: 'black',
    borderWidth: 1,
    paddingHorizontal: 10,
    borderRadius: 5,
    shadowColor: 'black',
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
  },
  error: {
    color: 'red',
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
  },
  ButtonContainers: {
    flexDirection: 'row',
    marginTop: 5,
  },
});

export default Fillup;