import React from 'react';
import { FlatList, StyleSheet, TouchableWithoutFeedback, View } from 'react-native';
import Constants from 'expo-constants';
import { useState } from 'react';
import { useEffect } from 'react';
import { db } from '../firebase';
import * as firebase from 'firebase'
import Card from '../components/Card';


function MyListing({ navigation }) {
    const [itemPost, setItemPost] = useState([])

    useEffect(() => {
        getUserItem()
    }, [])

    const getUserItem = () =>
        db.collection("publicItem").where("userUid", "==", firebase.auth().currentUser.uid.toString())
            .orderBy('creation', 'desc')
            .onSnapshot((snapshot) => {
                setItemPost(snapshot.docs.map((doc) => ({
                    id: doc.id,
                    data: doc.data()
                })))
            })

    return (
        <View style={styles.container}>
            <FlatList
                data={itemPost}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => (
                    <Card
                        imageUrl={item.data.downloadURL}
                        price={item.data.price}
                        title={item.data.titleName}
                        onPress={() => navigation.navigate("MyListingEdit", item)}
                    />
                )}
            />
        </View>


    );
}

const styles = StyleSheet.create({
    container: {
        paddingTop: Constants.statusBarHeight,

    }
})

export default MyListing;