import React from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import Constants from 'expo-constants';
import { db } from '../firebase';
import * as firebase from 'firebase'
import { useEffect } from 'react';
import { useState } from 'react';
import Card from '../components/Card';


function Listings({ navigation }) {
    const [itemPost, setItemPost] = useState([])

    useEffect(() => {
        getPublicItem()
    }, [])
    const getPublicItem = () =>
        db.collection("publicItem")
            .orderBy('creation', 'desc')
            .onSnapshot((snapshot) => {
                setItemPost(snapshot.docs.map((doc) => doc.data()))
            })

    return (
        <View style={styles.container}>
            <FlatList
                data={itemPost}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => (
                    <Card
                        imageUrl={item.downloadURL}
                        price={item.price}
                        title={item.titleName}
                        onPress={() => navigation.navigate("ListingDetails",item)}
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

export default Listings;