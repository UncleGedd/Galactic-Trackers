import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, StatusBar, Dimensions } from 'react-native';
import * as Location from 'expo-location';
import MapView from 'react-native-maps';

const userId = '_' + Math.random().toString(36).substr(2, 9)

export default function App() {
  const [location, setLocation] = useState(null);
  const [permission, setPermission] = useState(false);

  const sendLocationData = async () => {
    if (permission && location) {
      try {
        const req = await fetch('http://192.168.0.83:5000/add_data', {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            UUID: userId,
            Lat: location.coords.latitude,
            Lon: location.coords.longitude,
            Alt: location.coords.altitude,
          }),
        });
        const res = await req
        console.log("res", JSON.stringify(res))
      } catch (err) {
        console.log(err)
      }
    }
  }

  useEffect(() => {
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        console.log('permission denied!')
        return;
      }
      setPermission(true);
      updateLocation()
    })();
  }, []);

  const updateLocation = async () => {
    if (permission) {
      let location = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.Lowest
      });
      console.log("*****", location)
      setLocation(location);
      sendLocationData()
    }
  }

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <View style={styles.titleBar}>
        <Text style={styles.title}>Galactic Trackers</Text>
      </View>
      <View style={styles.mapContainer}>
        <MapView
          style={styles.map}
          showsUserLocation={true}
          followsUserLocation={true}
          onUserLocationChange={updateLocation}
          initialRegion={{
            latitude: 28.396837,
            longitude: -80.605659,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
        />
      </View>
      <View style={styles.content}>
        <View style={styles.locationBox}>
          <Text style={styles.locationLabel}>Lat: {location ? parseFloat(location.coords.latitude).toFixed(7) : 'unknown'}  </Text>
          <Text style={styles.locationLabel}>Lon: {location ? parseFloat(location.coords.longitude).toFixed(7) : 'unknown'}</Text>
        </View>
      </View>
    </View>
  );
}

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
    marginTop: 20
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginHorizontal: 20,
  },
  locationContainer: {
    alignItems: 'center',
  },
  locationTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  locationBox: {
    flexDirection: 'row',
  },
  locationLabel: {
    fontSize: 18,
  },
  map: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height * 0.6,
  }
});