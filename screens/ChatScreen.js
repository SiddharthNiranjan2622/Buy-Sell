import React, { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import InputField from '../components/InputField';
import { Dimensions } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native';
import { ScrollView } from 'react-native';
import Constants from 'expo-constants';
import { Text } from 'react-native';
import { db } from '../firebase';
import * as firebase from 'firebase'



const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

function ChatScreen({ navigation, route }) {
    const [message, setMessage] = useState()
    const item = route.params

    // useEffect(() => {
    //     getUserMessage()
    // }, [])

    // const getUserMessage = () => {

    //     db.collection("chats").where("targateUserUid", "=", firebase.auth().currentUser.uid.toString())
    //         .orderBy('creation', 'desc')
    //         .onSnapshot((snapshot) => {
    //             console.log(snapshot.docs.map((doc) => ({
    //                 id:doc.id,
    //                 data:doc.data()
    //             })))
    //         })
    // }



    return (
        <View style={styles.container}>
            <ScrollView>
                <View style={styles.recievedMessage}>
                    <Text>{item.data.message}</Text>
                </View>
                <View>
                    {

                    }
                </View>
            </ScrollView>
            <View style={styles.chatBox}>
                <InputField onChangeText={text => setMessage(text)} />
                <TouchableOpacity style={styles.sendButton} >
                    <MaterialCommunityIcons name="send" size={30} color="#ffcc00" />
                </TouchableOpacity>
            </View>
        </View>

    );
}

const styles = StyleSheet.create({
    container: {
        paddingTop: Constants.statusBarHeight,
        height: '100%',
        backgroundColor: 'white'
    },
    chatBox: {
        flexDirection: 'row'
    },
    sendButton: {
        alignSelf: 'center'
    },
    recievedMessage: {
        padding: 15,
        backgroundColor: "#ECECEC",
        alignSelf: "flex-end",
        borderRadius: 20,
        marginRight: 15,
        marginBottom: 20,
        maxWidth: "80%",
        position: "relative"
    }
})

export default ChatScreen;