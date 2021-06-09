import React from 'react';
import { Image, ScrollView, StyleSheet, Text, View } from 'react-native';
import { Dimensions } from 'react-native';
import Constants from 'expo-constants';
import { color } from 'react-native-reanimated';
import CustomButton from '../components/CustomButton';
import InputField from '../components/InputField';
import { useState } from 'react';
import { auth, db } from '../firebase';
import { useEffect } from 'react';
import * as firebase from 'firebase'




const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
function ListingDetails({ route }) {
    const item = route.params

    const [messageBody, setMessageBody] = useState('')
    const [checkSameUser, setCheckSameUser] = useState()
    const [userProfileData, setuserProfileData] = useState()

    useEffect(() => {
        checkIfSameUser()

    }, [])

    const checkIfSameUser = async () => {
        if (item.userUid === auth.currentUser.uid) {
            return null
        } else {
            const uid = auth.currentUser.uid
            const docdata = db.collection("users").doc(uid);
            const doc = await docdata.get()
            setuserProfileData(doc.data())
            return setCheckSameUser(true)
        }
    }
    const submitnotification = async () => {



        const message = {
            to: item.token,
            sound: 'default',
            title: 'New Message from ' + item.userName,
            body: messageBody,
            data: { someData: 'goes here' },
        };

        db.collection('chats').add({
            userName: userProfileData.name,
            userGmail: userProfileData.gmail,
            profilePicture: userProfileData.profile_picture,
            userUid: firebase.auth().currentUser.uid,
            message:messageBody,
            targateUserUid:item.userUid,
            creation: firebase.firestore.FieldValue.serverTimestamp(),


        })

        await fetch('https://exp.host/--/api/v2/push/send', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Accept-encoding': 'gzip, deflate',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(message),
        });

    }


    return (
        <ScrollView>
            <View style={styles.container}>
                <Image style={styles.image} source={{ uri: item.downloadURL }} />
                <View style={styles.itemDetails}>
                    <Text style={styles.itemName}>{item.titleName}</Text>
                    <Text style={styles.itemPrice}>${item.price}</Text>
                </View>
                <View style={styles.userDetials}>
                    <Image style={styles.userProfilePic} source={{ uri: item.profilePicture || "https://cencup.com/wp-content/uploads/2019/07/avatar-placeholder.png" }} />
                    <Text style={styles.userName}>{item.userName}</Text>
                </View>
                {checkSameUser &&
                    <View>
                        <InputField placeholder="Is this available?" onChangeText={text => setMessageBody(text)} />
                        <CustomButton title="Send Message" backgroundColor="#ffcc00" onPress={submitnotification} />
                    </View>
                }

                <View style={styles.description}>
                    <Text style={styles.descriptionTitle}>Description</Text>
                    <Text style={styles.actualText}>{item.description}</Text>
                </View>


            </View>
        </ScrollView>

    );
}

const styles = StyleSheet.create({
    container: {
        marginTop: Constants.statusBarHeight,

    },
    image: {
        height: windowHeight * 50 / 100,
        width: '100%',
    },
    itemDetails: {
        padding: 20
    },
    itemName: {
        fontSize: 25,
        fontWeight: 'bold'
    },
    itemPrice: {
        fontSize: 19,
        fontWeight: 'bold',
        color: '#737373',
    },
    userDetials: {
        flexDirection: "row",
        padding: 20
    },
    userProfilePic: {
        height: 50,
        width: 50,
        borderRadius: 40
    },
    userName: {
        alignSelf: 'center',
        fontSize: 20,
        marginLeft: 10,
        fontWeight: 'bold'
    },
    description: {
        padding: 20
    },
    descriptionTitle: {
        fontSize: 22,
        fontWeight: 'bold'
    },
    actualText: {
        fontSize: 18
    }


})

export default ListingDetails;