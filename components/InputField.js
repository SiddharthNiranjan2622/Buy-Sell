import React from 'react';
import { StyleSheet, TextInput, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import Constants from 'expo-constants';
import { Dimensions } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';


const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

function InputField({ placeholder, icon, secureTextEntry,onChangeText,keyboardType,numberOfLines,value }) {
    return (
        <View style={styles.container} >
            {icon && (
                <MaterialCommunityIcons name={icon} size={25} color='#e6b800' style={{  marginRight: 1 }} />
            )}
            <TextInput style={styles.textInput} value={value} placeholder={placeholder} secureTextEntry={secureTextEntry} onChangeText={text =>onChangeText(text)} keyboardType={keyboardType} numberOfLines={numberOfLines} />

        </View>

    );
}

const styles = StyleSheet.create({
    container: {
        borderRadius: 25,
        flexDirection: "row",
        padding: 5,
        justifyContent: 'center',
        alignItems: 'center'
    },
    textInput: {
        paddingLeft: 10,
        width: 87 / 100 * windowWidth,
        borderRadius: 15,
        height: 50,
        borderColor: '#FFFFFF',
        backgroundColor: '#FFFFFF',
        fontSize: 18,
        elevation: 3,
    }
})
export default InputField;