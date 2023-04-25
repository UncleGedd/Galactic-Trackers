import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, PermissionsAndroid, StatusBar } from 'react-native';
import Geolocation from '@react-native-community/geolocation'

export default function App() {
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [error, setError] = useState(null);

  const requestLocationPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'Geolocation Permission',
          message: 'Can we access your location?',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      console.log('granted', granted);
      if (granted === 'granted') {
        console.log('You can use Geolocation');
        return true;
      } else {
        console.log('You cannot use Geolocation');
        return false;
      }
    } catch (err) {
      console.log(err)
      return false;
    }
  };

  useEffect(() => {
    const result = requestLocationPermission();
    result.then(res => {
      console.log('res is:', res);
      if (res) {
        Geolocation.getCurrentPosition(
          position => {
            console.log(position);
            setLatitude(position.coords.latitude);
            setLongitude(position.coords.longitude);
            setError(null);
          },
          error => {
            console.log(error.code, error.message);
            setError(error.message);
          },
          { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 },
        );
      }
    })
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      <View style={styles.titleBar}>
        <Text style={styles.title}>Galactic Trackers</Text>
      </View>
      <View style={styles.content}>
        <Text style={styles.locationTitle}>My Location</Text>
        <View style={styles.locationBox}>
          <Text style={styles.locationLabel}>Latitude:</Text>
          <Text style={styles.locationValue}>{latitude}</Text>
        </View>
        <View style={styles.locationBox}>
          <Text style={styles.locationLabel}>Longitude:</Text>
          <Text style={styles.locationValue}>{longitude}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#007AFF',
    alignItems: 'center',
  },
  titleBar: {
    height: 60,
    backgroundColor: '#0057C2',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'stretch',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textAlign: 'center',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'stretch',
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginHorizontal: 20,
  },
  locationContainer: {
    marginTop: 50,
    alignItems: 'center',
  },
  locationTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  locationBox: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  locationLabel: {
    fontSize: 18,
    fontWeight: 'bold',
    marginRight: 10,
  },
  locationValue: {
    fontSize: 18,
  },
});
