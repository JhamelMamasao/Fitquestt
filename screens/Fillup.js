import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Pressable, TextInput, Text, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Picker } from '@react-native-picker/picker';
import { Color } from "../GlobalStyle";
import * as SplashScreen from 'expo-splash-screen';
import { SafeAreaView } from "react-native-safe-area-context";
import * as ImagePicker from 'expo-image-picker';
import { useFonts } from 'expo-font';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DecodeToken from './DecodeToken';

const Fillup = () => {
  const navigation = useNavigation();
  const [first_name, setfirst_name] = useState('');
  const [last_name, setlast_name] = useState('');
  const [username, setUsername] = useState('');
  const [height, setHeight] = useState('');
  const [weight, setweight] = useState('');
  const [birth_date, setbirth_date] = useState('');

  const [nameError, setNameError] = useState('');
  const [usernameError, setUsernameError] = useState('');
  const [heightError, setHeightError] = useState('');
  const [weightError, setweightError] = useState('');
  const [birth_dateError, setbirth_dateError] = useState('');
  const [image, setImage] = useState(null);
  const [fontError, setFontError] = useState(false);



  const Logout = () => {
    navigation.navigate('Opening');
  };


  const FinalDashboard = async () => {
    if (validateForm()) {
      const endpoint = 'https://fit-quest.azurewebsites.net/api/account/update';

      const access = await AsyncStorage.getItem('access');

      const formData = new FormData();
  
      if (image !== null) {
        formData.append("profile", {
          uri: image.uri,
          name: image.fileName,
          type: image.mimeType,
        });
      }

      formData.append('first_name', first_name);
      formData.append('last_name', last_name);
      formData.append('username', username);
      formData.append('height', height);
      formData.append('weight', weight);
      formData.append('birth_date', birth_date);
      
      fetch(endpoint, {
        method: 'PUT',
        headers: {
          "Content-Type": "multipart/form-data",
          'Authorization': `Bearer ${access}`,
        },
        body: formData,
      })
        .then(async (response) => {
          const data = await response.json();
          await AsyncStorage.setItem('access', data.access);
          await AsyncStorage.setItem('refresh', data.refresh);
          DecodeToken(data.access);
          navigation.navigate('Dashboard');
        })
        .catch(error => {
          // Handle errors
          console.log(JSON.stringify(error));
          console.error(error);
        });
    }
  };

  const validateForm = () => {
    let valid = true;
    if (first_name.trim() === '') {
      setNameError('Name is required');
      valid = false;
    } else {
      setNameError('');
    }

    if (username.trim() === '') {
      setUsernameError('Username is required');
      valid = false;
    } else {
      setNameError('');
    }

    if (last_name.trim() === '') {
      setNameError('Name is required');
      valid = false;
    } else {
      setNameError('');
    }
    if (isNaN(height) || height.trim() === '') {
      setHeightError('Height must be a number');
      valid = false;
    } else {
      setHeightError('');
    }
    if (isNaN(weight) || weight.trim() === '') {
      setweightError('Weight must be a number');
      valid = false;
    } else {
      setweightError('');
    }
    if (birth_date.trim() === '') {
      setbirth_dateError('Birth date is required');
      valid = false;
    } else {
      setbirth_dateError('');
    }
    
    // if (image === null) {
    //   console.error('Please upload a profile picture');
    //   valid = false;
    // } else {}

    return valid;
  };

  const pickImage = async () => {
    console.log('pickImage');
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
    });

    if (!result.cancelled) {
      setImage(result.assets[0]);
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
      <View style={styles.header}>
      </View>
      <View style={styles.images}>
        <View style={styles.Circle}>
          <Pressable style={styles.socialIcon} onPress={pickImage}>
            <Image source={require('../assets/images/upload.png')} style={styles.icon} />
          </Pressable>
          {image && <Image source={{ uri: image.uri }} style={styles.circleImage} />}
        </View>
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.inputText}>First Name</Text>
        <TextInput
          style={styles.input}
          onChangeText={(text) => setfirst_name(text)}
          placeholder='First Name'
          placeholderTextColor={'white'}
          value={first_name}
        />
        {nameError !== '' && 
        <Text style={styles.error}>{nameError}</Text>}
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.inputText}>Last Name</Text>
        <TextInput
          style={styles.input}
          onChangeText={(text) => setlast_name(text)}
          placeholder='Last Name'
          placeholderTextColor={'white'}
          value={last_name}
        />
        {nameError !== '' && 
        <Text style={styles.error}>{nameError}</Text>}
      </View>
    
      <View style={styles.inputContainer}>
        <Text style={styles.inputText}>Username</Text>
        <TextInput
          style={styles.input}
          onChangeText={(text) => setUsername(text)}
          placeholder='Username'
          placeholderTextColor={'white'}
          value={username}
        />
        {nameError !== '' && 
        <Text style={styles.error}>{nameError}</Text>}
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.inputText}>Birth Date</Text>
        <TextInput
          style={styles.input}
          onChangeText={(text) => setbirth_date(text)}
          value={birth_date}
          placeholderTextColor={'white'}
          placeholder="YYYY-MM-DD"
        />
        {birth_dateError !== '' && 
        <Text style={styles.error}>{birth_dateError}</Text>}
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.inputText}>Height</Text>
        <Picker
          selectedValue={height}
          style={styles.input}
          onValueChange={(itemValue, itemIndex) =>
            setHeight(itemValue)
          }>
          <Picker.Item label="Select Height" value="" style={styles.inputs}/>
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
          onValueChange={(itemValue, itemIndex) => setweight(itemValue)
          }
          >
          <Picker.Item label="Select Weight" value="" style={styles.inputs}/>
          {Array.from({length: 150}, (_, i) => i + 50).map(value => (
            <Picker.Item key={value.toString()} label={`${value} kg`} value={value.toString()} />
          ))}
        </Picker>
        {weightError !== '' && 
        <Text style={styles.error}>{weightError}</Text>}
      </View>

        <Pressable style={styles.submitButton} onPress={FinalDashboard}>
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
  header: {
    width: 400,
    height: 400,
    position: 'absolute',
    backgroundColor: Color.colorDarkorange,
    alignSelf: 'center',
    borderRadius: 400,
    bottom: '80%',
  },
  images: {
    width: 100,
    height: 100,
    position: 'absolute',
    alignSelf: 'center',
    backgroundColor: 'white',
    borderRadius: 400,
    bottom: '75%',
  },
  Circle: {
    width: 30,
    height: 30,
    borderRadius: 400,
    backgroundColor: Color.colorDarkorange,
    position: 'absolute',
    alignSelf: 'center',
    bottom: '1%',
    right: '3%',
  },
  socialIcon: {
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputContainer: {
    top: '25%',
    marginHorizontal: 30,
    marginVertical: 10,
  },
  inputText: {
    color: 'white',
    fontFamily: 'Poppins-Medium',
    fontSize: 12,
  },
  input: {
    borderBottomWidth: 1,
    borderBottomColor: 'white',
    color: 'white',
    fontFamily: 'Poppins-Medium',
    fontSize: 12,
    padding: 5,
  },
  error: {
    color: 'red',
    fontFamily: 'Poppins-Medium',
    fontSize: 10,
  },
  submitButton: {
    width: '85%',
    height: 50,
    backgroundColor: Color.colorDarkorange,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    top: '28%',
  },
  submitButtonText: {
    color: 'white',
    fontFamily: 'Poppins-Medium',
    fontSize: 12,
  },
  inputs: {
    color: 'white',
    fontFamily: 'Poppins-Medium',
    fontSize: 12,
  },
  


  
});

export default Fillup;