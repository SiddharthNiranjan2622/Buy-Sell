import React from 'react';
import { Button, Image, StyleSheet, Text, View } from 'react-native';
import Constants from 'expo-constants';
import { auth, db } from '../firebase';
import { useEffect } from 'react';
import { useState } from 'react';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { TouchableOpacity, TouchableWithoutFeedback } from 'react-native-gesture-handler';



function Account({ navigation }) {
    const [userUID, setUserUID] = useState()
    const [userData, setUserData] = useState([])

    useEffect(() => {
        getUserData()
    }, [])
    const getUserData = async () => {
        const uid = auth.currentUser.uid
        const docdata = db.collection("users").doc(uid);
        const doc = await docdata.get()
        if (!doc.exists) {
            console.log('No such document!');
        } else {
            // console.log('Document data:', doc.data());
            setUserData(doc.data())
        }
    }

    const logout = () => {
        auth.signOut().then(() => {
            navigation.replace("Loading")
        })
    }


    return (
        <View style={styles.container}>
            <View style={styles.userData}>
                <Image source={{ uri: userData.profile_picture || "https://cencup.com/wp-content/uploads/2019/07/avatar-placeholder.png"}} style={styles.profile_picture} />
                <View style={styles.userDataDetails}>
                    <Text style={styles.name}>{userData.name}</Text>
                    <Text style={styles.email}>{userData.gmail}</Text>
                </View>
            </View>
            <TouchableWithoutFeedback style={styles.section} onPress={()=> navigation.navigate("MyListing")}>
                <MaterialCommunityIcons name="format-list-bulleted" size={24} color="#ffcc00" />
                <Text style={styles.myListings}>My Listings</Text>
            </TouchableWithoutFeedback>

            
            <TouchableOpacity style={styles.logoutSection} onPress={logout}>
            <MaterialCommunityIcons name="format-list-bulleted" size={24} color="#33cc33" />
            <Text style={styles.myListings}>Log Out</Text>
            
            </TouchableOpacity>
            
            </View>
            // <TouchableWithoutFeedback style={styles.section}>
            // <Ionicons name="settings" size={24} color="#0000ff" />
            // <Text style={styles.myListings}>Edit Profile</Text>
            // </TouchableWithoutFeedback>
            
            // <TouchableWithoutFeedback style={styles.section} onPress={()=> navigation.navigate("MyMessages")}>
            //     <MaterialCommunityIcons name="email" size={24} color="#ff0000" />
            //     <Text style={styles.myListings}>My Messages</Text>
            // </TouchableWithoutFeedback>
    );
}


const styles = StyleSheet.create({
    container: {
        paddingTop: Constants.statusBarHeight + 10,
        paddingLeft: 10,
        paddingRight: 10

    },
    profile_picture: {
        height: 90,
        width: 80,
        borderRadius: 40
    },
    userData: {
        flexDirection: 'row',
        padding: 15,
        backgroundColor: '#ffffff',
        borderRadius: 15,
        marginBottom: 30
    },
    name: {
        marginLeft: 10,
        fontSize: 18,
        fontWeight: 'bold'
    },
    email: {
        marginLeft: 10,
        fontWeight: 'bold',
        color: '#666666'
    },
    userDataDetails: {
        flexDirection: 'column',
        alignSelf: 'center'
    },
    section: {
        flexDirection: 'row',
        borderRadius: 15,
        backgroundColor: '#ffffff',
        padding: 15,
        marginBottom: 5

    },
    myListings: {
        alignSelf: 'center',
        marginLeft: 10,
        fontSize: 18,
        fontWeight: 'bold',
        color: "#404040",
    },
    logoutSection: {
        flexDirection: 'row',
        borderRadius: 15,
        backgroundColor: '#ffffff',
        padding: 15,
        marginBottom: 5,
        marginTop: 30
    }

})

export default Account;