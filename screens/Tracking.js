import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, Pressable, Image} from 'react-native';
import MapView, { Marker, Polyline } from 'react-native-maps';
import * as Location from 'expo-location';
import { Color } from '../GlobalStyle';
import { useNavigation } from "@react-navigation/native";
import dashboard2 from "./ChooseQuest";

function calculateDistance(lat1, lon1, lat2, lon2) {
  const earthRadiusKm = 6371;

  const dLat = degreesToRadians(lat2 - lat1);
  const dLon = degreesToRadians(lon2 - lon1);

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(degreesToRadians(lat1)) * Math.cos(degreesToRadians(lat2)) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = earthRadiusKm * c;

  return distance;
}

function degreesToRadians(degrees) {
  return degrees * (Math.PI / 180);
}

export default function App() {
  const navigation = useNavigation(); // Using useNavigation hook to get navigation object
  
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [runStarted, setRunStarted] = useState(false);
  const [runDistance, setRunDistance] = useState(0);
  const [runCoordinates, setRunCoordinates] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
          setErrorMsg('Permission to access location was denied');
          return;
        }

        await Location.watchPositionAsync({ accuracy: Location.Accuracy.High, timeInterval: 1000, distanceInterval: 0 }, locationCallback);
      } catch (error) {
        setErrorMsg('Failed to fetch location');
        console.error(error);
      }
    })();
  }, []);

  const locationCallback = (locationData) => {
    setLocation(locationData);
    console.log("Latitude:", locationData.coords.latitude, "Longitude:", locationData.coords.longitude);
  };

  useEffect(() => {
    if (runStarted && location) {
      const { coords } = location;
      setRunCoordinates(prevCoordinates => [...prevCoordinates, { latitude: coords.latitude, longitude: coords.longitude }]);
      
      if (runCoordinates.length > 1) {
        const lastCoordinate = runCoordinates[runCoordinates.length - 1];
        const secondLastCoordinate = runCoordinates[runCoordinates.length - 2];
        const distance = calculateDistance(
          lastCoordinate.latitude,
          lastCoordinate.longitude,
          secondLastCoordinate.latitude,
          secondLastCoordinate.longitude
        );
        setRunDistance(prevDistance => prevDistance + distance);
      }
    }
  }, [location]);

  const startRun = () => {
    setRunStarted(true);
  };

  const stopRun = () => {
    setRunStarted(false);
  };

  const goBack = () => {
    navigation.goBack();
  };

  

  return (
    <View style={styles.container}>
      {location ? (
        <MapView
          style={styles.map}
          initialRegion={{
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
        >
          {runCoordinates.length > 0 && <Polyline coordinates={runCoordinates} strokeWidth={5} strokeColor="blue" />}
          <Marker
            coordinate={{
              latitude: location.coords.latitude,
              longitude: location.coords.longitude,
            }}
            title="Your Location"
          />
        </MapView>
      ) : (
        <View style={styles.messageContainer}>
          <Text style={styles.message}>{errorMsg || 'Waiting for location...'}</Text>
        </View>
      )}
      <View style={styles.buttonsContainer}>
        {!runStarted ? (
          <TouchableOpacity style={styles.button} onPress={startRun}>
            <Text style={styles.buttonText}>Start Run</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity style={styles.button} onPress={stopRun}>
            <Text style={styles.buttonText}>Stop Run</Text>
          </TouchableOpacity>
        )}
        {runStarted && (
          <View style={styles.distanceContainer}>
            <Text style={styles.distanceTexts}>Distance</Text>
            <Text style={styles.distanceText}>{runDistance.toFixed(2)} km</Text>
          </View>
        )}
      </View>
      
      <Pressable style={styles.backButton} onPress={goBack}>
          <Image source={require('../assets/images/Backblack.png')} style={styles.back} />
        </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
  messageContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  message: {
    fontSize: 18,
  },
  buttonsContainer: {
    position: 'absolute',
    bottom: 16,
    left: 16,
    right: 16,
    alignItems: 'center',
  },
  button: {
    backgroundColor: 'white',
    padding: 13,
    borderRadius: 8,
    width: '100%',
    elevation: 8,
    marginBottom: 8,
  },
  buttonText: {
    color: 'black',
    fontSize: 16,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  distanceContainer: {
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 8,
    width: '100%',
    elevation: 8,
  },
  distanceText: {
    color: 'black',
    fontSize: 16,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  distanceTexts: {
    color: 'black',
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 5,
  },
  backButton: {
    position: 'absolute',
    top: 60,
    left: 25,
    width: 30,
    height: 30,
    zIndex: 2,
  },
  back: {
    width: '70%',
    height: '70%',
    resizeMode: 'cover',
  },
});
