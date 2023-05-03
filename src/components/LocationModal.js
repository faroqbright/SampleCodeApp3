import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView } from 'react-native';

import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import Modal from "react-native-modal";


import { Colors } from '../utils/Colors';
import Images from '../assets/Images';

const LocationModal = (props) => {
    const [closeModal, setCloseModal] = useState(false)
    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={props.isVisible}
            onRequestClose={props.onRequestClose}

        >
            <View style={styles.mainContainer}>
                <View style={{ alignItems: 'flex-end' }}>

                    <TouchableOpacity onPress={props.onClosePress}>
                        <Image
                            source={Images.crossIcon}
                            style={{ tintColor: Colors.DarkBlue, width: 20, height: 20 }}
                            resizemode='contain'
                        />
                    </TouchableOpacity>
                </View>

                <ScrollView
                    keyboardShouldPersistTaps='handled'
                >
                    <GooglePlacesAutocomplete
                        placeholder='Search Location'
                        onPress={props.onGooglePlacePress}
                        textInputProps={{ backgroundColor: Colors.InputField, marginTop: 20, borderRadius: 10, height: 50, color: 'black' }}
                        query={{
                            key: 'AIzaSyAgSURXXFWP_UP-UQNHsUsw5KxWiuPEzUo',
                            // key: 'AIzaSyDmojQImNP7prk7G8iHHLyZVz1-4b5N4Ws',
                            language: 'en',
                        }}
                        styles={{
                            predefinedPlacesDescription: {
                                color: Colors.black
                            },
                            row: {
                                backgroundColor: Colors.white,
                            },
                            listView: {
                                backgroundColor: Colors.white,
                            },
                            description: {
                                color: Colors.black
                            }
                        }}
                    />
                </ScrollView>
            </View>
        </Modal>
    )
}

export default LocationModal;

const styles = StyleSheet.create({
    mainContainer: {
        padding: 20,
        backgroundColor: Colors.White,
        height: '70%',
        width: '90%',
        borderRadius: 30,
        alignSelf: 'center',
        marginTop: '30%',
        elevation: 4,
    },
    innerContainer: {
        width: '100%',
        height: '100%'
    }
})