import React, { useState, useEffect } from 'react';
import { Text, View, StatusBar, TouchableOpacity } from 'react-native';
import * as Location from 'expo-location';
import MapView from 'react-native-maps';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { styles } from './styles.js'

const userId = '_' + Math.random().toString(36).substr(2, 9)

export function Home({ route }) {
    const navigation = useNavigation();


    const [location, setLocation] = useState(null);
    const [permission, setPermission] = useState(false);

    const firstName = route.params ? route.params.firstName : ''
    const lastName = route.params ? route.params.lastName : ''
    const phoneNumber = route.params ? route.params.phoneNumber : ''
    const companyName = route.params ? route.params.companyName : ''

    const sendLocationData = async () => {
        if (permission && location) {
            try {
                const req = await fetch('http://ec2-3-80-228-237.compute-1.amazonaws.com:5000/add_data', {
                    method: 'POST',
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + process.env.API_KEY
                    },
                    body: JSON.stringify({
                        UUID: userId,
                        Lat: location ? location.coords.latitude : '',
                        Lon: location ? location.coords.longitude : '',
                        Alt: location ? location.coords.altitude : '',
                        FirstName: firstName,
                        LastName: lastName,
                        CompanyName: companyName,
                        PhoneNumber: phoneNumber,
                    }),
                });
                const res = await req
                console.log('Request sent, status:', res.status)
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
            });
            console.log('Location updated!', 'Lat:', location.coords.latitude, 'Lon:', location.coords.longitude)
            setLocation(location);
            sendLocationData()
        }
    }
    return (
        <View style={styles.container}>
            <StatusBar barStyle="dark-content" />
            <View style={styles.titleBar}>
                <Text style={styles.title}>Galactic Trackers</Text>
                <TouchableOpacity onPress={() => navigation.navigate('Settings', {
                    firstName,
                    lastName,
                    phoneNumber,
                    companyName
                })}>
                    <Ionicons style={styles.settingsIcon} name="person-circle-outline" size={32} color="white" />
                </TouchableOpacity>
            </View>
            <View>
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
    )
}