import React, { useEffect, useState } from 'react';
import { FlatList, Text } from 'react-native';
import { StyleSheet, View } from 'react-native';
import Constants from 'expo-constants';
import { db } from '../firebase';
import MessageColumn from '../components/MessageColumn';


function MyMessages({ navigation }) {
    const [chats, setChats] = useState([])

    useEffect(() => {
        const unsubscribe = db.collection('chats')
            .onSnapshot(snapshot => (
                setChats(snapshot.docs.map(doc => ({
                    id: doc.id,
                    data: doc.data()
                })))
            ))
        return unsubscribe
    }, [])

    return (
        <View style={styles.container}>
            <FlatList
                data={chats}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => (
                    <MessageColumn
                        profileImage={item.data.profilePicture}
                        userMessage={item.data.message}
                        userName={item.data.userName}
                        onPress={() => navigation.navigate("ChatScreen",item)}
                    />
                )}
            />
        </View>

    );
}
// <MessageColumn />

const styles = StyleSheet.create({
    container: {
        marginTop: Constants.statusBarHeight,

    }
})

export default MyMessages;