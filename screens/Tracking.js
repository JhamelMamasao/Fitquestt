import React, { useState, useEffect} from 'react';
import { View, StyleSheet, Text, TouchableOpacity, Pressable, Image, Modal } from 'react-native';
import MapView, { Marker, Polyline } from 'react-native-maps';
import * as Location from 'expo-location';
import axios from 'axios'; // Import Axios for making HTTP requests
import { Color } from '../GlobalStyle';
import { useNavigation, useRoute } from "@react-navigation/native";

// Function to calculate distance between two coordinates using the Haversine formula
function calculateDistance(lat1, lon1, lat2, lon2) {
  const R = 6371; // Radius of the Earth in kilometers
  const dLat = deg2rad(lat2 - lat1);
  const dLon = deg2rad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c; // Distance in kilometers
  return distance;
}

// Helper function to convert degrees to radians
function deg2rad(deg) {
  return deg * (Math.PI / 180);
}

function Tracking() {
  const navigation = useNavigation();
  const route = useRoute();
  const { targetDistance } = route.params;

  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [runStarted, setRunStarted] = useState(false);
  const [runDistance, setRunDistance] = useState(0);
  const [runCoordinates, setRunCoordinates] = useState([]);
  const [showCongratsModal, setShowCongratsModal] = useState(false); 
  const [showStopRunModal, setShowStopRunModal] = useState(false);
  const [taskDistance, setTaskDistance] = useState(targetDistance);

  useEffect(() => {
    const getLocationPermissionAndWatchPosition = async () => {
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
    };
  
    getLocationPermissionAndWatchPosition();
  }, []);
  
  const locationCallback = (locationData) => {
    setLocation(locationData);
  
    if (runStarted) {
      const { coords } = locationData;
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
  
        // Check if the user reached the target distance
        if (runDistance >= taskDistance) {
          setShowCongratsModal(true); // Show the congratulations modal
          setRunStarted(false); // Stop the run
          // Update the API with latitude, longitude, and quest
          updateAPIWithLocation(coords.latitude, coords.longitude, "string");
        }
      }
    }
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

        // Check if the user reached the target distance
        if (runDistance >= route.params.targetDistance) {
          setShowCongratsModal(true); // Show the congratulations modal
          setRunStarted(false); // Stop the run
          // Update the API with latitude, longitude, and quest
          updateAPIWithLocation(coords.latitude, coords.longitude, "string");
        }
      }
    }
  }, [location]);

  const startRun = () => {
    setRunStarted(true);
  };

  const stopRun = () => {
    setRunStarted(false);
  };
  const handleStopRunPress = () => {
    setShowStopRunModal(true);
  };
  
  // Function to handle the confirmation to stop the run
  const handleConfirmStopRun = () => {
    setShowStopRunModal(false);
    stopRun(); // Call your function to stop the run
  };
  
  // Function to handle cancellation of stopping the run
  const handleCancelStopRun = () => {
    setShowStopRunModal(false);
  };

  const goBackToDashboard = () => {
    setShowCongratsModal(false); // Hide the modal
    navigation.navigate('Dashboard'); // Navigate back to the dashboard
  };

  // Function to update API with latitude, longitude, and quest
  const updateAPIWithLocation = async (latitude, longitude, quest) => {
    try {
      const response = await axios.post('https://fitquest-8it9.onrender.com/api/location/create', {
        latitude: latitude,
        longitude: longitude,
        quest: quest
      });
      console.log("API Response:", response.data);
    } catch (error) {
      console.error("Error updating API:", error);
      if (error.response) {
        // The request was made and the server responded with a status code
        console.error("Response data:", error.response.data);
        console.error("Response status:", error.response.status);
      } else if (error.request) {
        // The request was made but no response was received
        console.error("No response received:", error.request);
      } else {
        // Something happened in setting up the request that triggered an error
        console.error("Error setting up request:", error.message);
      }
    }
  };

  return (
    <View style={styles.container}>
      {location ? (
        <MapView
          style={styles.map}
          initialRegion={{
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
            latitudeDelta: 0.001,
            longitudeDelta: 0.001,
          }}
        >
          {runCoordinates.length > 0 && <Polyline coordinates={runCoordinates} strokeWidth={5} strokeColor="orange" />}
          <Marker
            coordinate={{
              latitude: location.coords.latitude,
              longitude: location.coords.longitude,
            }}
            title="Your Location"
            image={require('../assets/images/runnericon.png')} 
            styles={{ width: 10, height: 10 }}// Specify the path to your runner icon
          />
        </MapView>
      ) : (
        <View style={styles.messageContainer}>
          <Text style={styles.message}>{errorMsg || 'Waiting for location...'}</Text>
        </View>
      )}

      {/* Congratulations Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={showCongratsModal}
        onRequestClose={() => {
          setShowCongratsModal(false);
        }}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.congratsText}>TASK COMPLETE!</Text>
            <Image source={require('../assets/images/check.png')} style={styles.check}></Image>
            <View style={styles.textContainer}>
              <Text style={styles.Texthello}>100 FitCoin</Text>
              <Image source={require('../assets/images/3dicons.png')} style={styles.picture}></Image>
            </View>
            <View style={styles.textContainer}>
              <Text style={styles.Texthello}>Achievement Unlocked</Text>
              <Image source={require('../assets/images/reward.png')} style={styles.pictures}></Image>
            </View>
            <TouchableOpacity style={styles.closeButton} onPress={goBackToDashboard}>
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <Modal
      animationType="slide"
      transparent={true}
      visible={showStopRunModal}
      onRequestClose={() => {
        setShowStopRunModal(false);
      }}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Image source={require('../assets/images/x.png')} style={styles.x}></Image>
          <Text style={styles.modalText}>Are you sure you want to stop the run?</Text>
          <View style={styles.modalButtonsContainer}>
            <Pressable style={styles.modalButton} onPress={handleConfirmStopRun}>
              <Text style={styles.modalButtonText}>Yes</Text>
            </Pressable>
            <Pressable style={styles.modalButton} onPress={handleCancelStopRun}>
              <Text style={styles.modalButtonText}>No</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>

      {/* Buttons */}
      <View style={styles.buttonsContainer}>
        {!runStarted ? (
          <TouchableOpacity style={styles.button} onPress={startRun}>
            <Text style={styles.buttonText}>Start</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity style={styles.button} onPress={handleStopRunPress}>
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
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    width: "90%",
    height: "50%",
    borderRadius: 10,
    elevation: 5,
    alignItems: 'center',
  },
  congratsText: {
    fontSize: 25,
    fontFamily: 'Poppins-Medium',
    fontWeight: 'bold',
    color: Color.colorDarkorange,
    marginTop: 20,
    marginBottom: 10,
  },
  closeButton: {
    backgroundColor: Color.colorDarkorange,
    width: "90%",
    height: "12%",
    borderRadius: 5,
    elevation: 5,
  },
  closeButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 15,
    fontFamily: 'Poppins-Medium',
    textAlign: 'center',
    justifyContent: 'center',
    top: 10,
  },
  check: {
    width: 90,
    height: 90,
    marginBottom: 20,
  },
  textContainer: {
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  picture: {
    width: 50,
    height: 50,
    left: 60,
  },
  pictures: {
    width: 50,
    height: 50,
    left: 24,
  },
  Texthello: {
    fontSize: 15,
    fontFamily: 'Poppins-Medium',
    justifyContent: 'center',
    marginTop: 10,
  },
  modalContents: {
    backgroundColor: 'white',
    width: "90%",
    height: "50%",
    borderRadius: 10,
    elevation: 5,
    alignItems: 'center',
  },
  x: {
    width: '35%',
    height: '30%',
    marginBottom: 10,
    top: 35,
  },
  modalText: {
    fontSize: 15,
    fontFamily: 'Poppins-Medium',
    color: 'black',
    marginBottom: 20,
    top: 30,
  },
  modalButtonsContainer: {
    top: 30,
    flexDirection: 'column',
  },
  modalButton: {
    backgroundColor: Color.colorDarkorange,
    padding: 20,
    borderRadius: 8,
    width: 300,
    elevation: 5,
    marginBottom: 10,
  },
  modalButtonText: {
    color: 'white',
    fontSize: 15,
    textAlign: 'center',
    fontFamily: 'Poppins-Medium',
  },
});

export default Tracking;
