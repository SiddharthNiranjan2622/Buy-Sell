import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Dimensions } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';



const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

function CustomButton({ backgroundColor, title, onPress, icon }) {
    return (

        <TouchableOpacity style={[styles.button, backgroundColor = { backgroundColor }]} onPress={onPress}>
            {icon &&
                (<MaterialCommunityIcons name={icon} size={24} color="#33cc33" />)}
            <Text style={[styles.text]} >{title}</Text>

        </TouchableOpacity>

    );
}

const styles = StyleSheet.create({
    container: {
        
        alignSelf: "center",
        marginRight: 10
    },
    button: {
        borderRadius: 25,
        justifyContent: "center",
        alignContent:"center",
        alignSelf:'center',
        alignItems: "flex-end",
        padding: 12,
        width: 88 / 100 * windowWidth,
        marginVertical: 10,
        elevation: 3,
        flexDirection: 'row',
        marginLeft:20

    },
    text: {
        fontSize: 18,
        fontWeight: "bold",
        color: '#ffffff',

    }
})

export default CustomButton;