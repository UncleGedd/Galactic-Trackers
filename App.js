import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, StatusBar } from 'react-native';
// import Geolocation from '@react-native-community/geolocation'
import * as Location from 'expo-location';


export default function App() {
  const [location, setLocation] = useState(null);
  const [error, setError] = useState(null);

  const LOCATION_TASK_NAME = 'background-location-task';

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      console.log("*****", location)
      setLocation(location);
    })();
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
          <Text style={styles.locationLabel}>Lat:</Text>
          <Text style={styles.locationValue}>{location ? location.coords.latitude : 'unknown'}</Text>
        </View>
        <View style={styles.locationBox}>
          <Text style={styles.locationLabel}>Lon:</Text>
          <Text style={styles.locationValue}>{location ? location.coords.longitude : 'unknown'}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  titleBar: {
    height: 60,
    marginTop: 25,
    backgroundColor: '#2D8692',
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
    backgroundColor: '#FFFFFF',
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
