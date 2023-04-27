import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, Keyboard, TouchableWithoutFeedback } from 'react-native';
import DropDownPicker from "react-native-dropdown-picker";

import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { styles } from './styles.js'

export function Settings() {
    const navigation = useNavigation();
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [items, setItems] = useState([
        { label: 'SpaceX', value: 'SpaceX' },
        { label: 'ULA', value: 'ULA' },
        { label: 'Blue Origin', value: 'Blue Origin' },
        { label: 'NASA', value: 'NASA' },
        { label: 'Other', value: 'Other' },
    ]);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [dropdownValue, setDropdownValue] = useState(null);
    const [error, setError] = useState(false)

    const handleFirstNameChange = (value) => {
        setFirstName(value);
    };

    const handleLastNameChange = (value) => {
        setLastName(value);
    };

    const handleCompanyNameChange = (value) => {
        setDropdownValue(value);
    };

    const handlePhoneNumberChange = (value) => {
        setPhoneNumber(value);
    };

    const handlePress = () => {
        if (firstName, lastName, phoneNumber, dropdownValue) {
            setError(false)
            navigation.navigate('Home', {
                firstName,
                lastName,
                phoneNumber,
                companyName: dropdownValue
            });
        } else {
            setError(true)
        }
    };

    const removeKeyboard = () => {
        Keyboard.dismiss()
    }

    return (
        <TouchableWithoutFeedback onPress={removeKeyboard}>
            <View style={styles.container}>
                <View style={styles.titleBar}>
                    <Text style={styles.title}>User Information</Text>
                    <TouchableOpacity onPress={() => navigation.navigate('Home')}>
                        <Ionicons style={styles.settingsIcon} name="map" size={32} color="white" />
                    </TouchableOpacity>
                </View>
                <View style={styles.formContainer}>
                    <Text style={styles.label}>First Name:</Text>
                    <TextInput
                        style={styles.input}
                        value={firstName}
                        onChangeText={handleFirstNameChange}
                        placeholder="Enter your first name"
                    />
                    <Text style={styles.label}>Last Name:</Text>
                    <TextInput
                        style={styles.input}
                        value={lastName}
                        onChangeText={handleLastNameChange}
                        placeholder="Enter your last name"
                    />
                    <Text style={styles.label}>Company Name:</Text>
                    <DropDownPicker
                        open={dropdownOpen}
                        style={styles.input}
                        items={items}
                        value={dropdownValue}
                        setOpen={setDropdownOpen}
                        setValue={setDropdownValue}
                        setItems={setItems}
                    />
                    {
                        dropdownValue === 'Other' ? (
                            <View>
                                <Text style={styles.lightLabel}>Enter Company Name:</Text>
                                <TextInput
                                    style={styles.input}
                                    value={lastName}
                                    onChangeText={handleCompanyNameChange}
                                    placeholder="Enter company name"
                                />
                            </View>
                        ) : null
                    }
                    <Text style={styles.label}>Phone Number:</Text>
                    <TextInput
                        style={styles.input}
                        value={phoneNumber}
                        onChangeText={handlePhoneNumberChange}
                        placeholder="Enter your phone number"
                        keyboardType="phone-pad"
                    />
                    <TouchableOpacity style={styles.button} onPress={handlePress}>
                        <Text style={styles.buttonText}>Save</Text>
                    </TouchableOpacity>
                    {
                        error ? <Text style={styles.errorText}>Must fill out entire form!</Text> : null
                    }
                </View>
            </View>
        </TouchableWithoutFeedback>
    );
}
