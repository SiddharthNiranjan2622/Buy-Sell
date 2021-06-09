import React from 'react';
import { StyleSheet, View } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native-gesture-handler';


function AddItemButton({onPress}) {
    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={onPress}>
                <MaterialCommunityIcons
                    name="plus-circle"
                    color="#ffffff"
                    size={40}
                />
            </TouchableOpacity>

        </View>

    );
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: "#ffcc00",
        height: 45,
        width: 45,
        borderRadius: 50,
        marginTop: 2,
        borderColor: "#ffffff"

    }
})

export default AddItemButton;