import React, { Component } from 'react';
import { useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { auth } from '../firebase';

function Loading({ navigation }) {

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((authUser) => {
            if(authUser){
                navigation.replace("Home")
            } else{
                navigation.replace("Welcome")
            }
        })
        return unsubscribe
    }, [])
    
 
    return (
        <View style={styles.container}>
            <Text>Loading...</Text>
        </View>

    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
})

export default Loading;