import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { Dimensions } from 'react-native';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';


const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
function Card({ imageUrl, title, price,onPress }) {
    return (
        <TouchableWithoutFeedback style={styles.container} onPress={onPress}  >
            <View style={styles.container}>
                <View style={styles.card}>
                    <Image style={styles.image} source={{ uri: imageUrl }} />
                </View>
                <View style={styles.detailsContainer}>
                    <Text style={styles.title} numberOfLines={2}>{title}</Text>
                    <Text style={styles.authorName}>${price}</Text>
                </View>
            </View>

        </TouchableWithoutFeedback>

    );
}

const styles = StyleSheet.create({
    container: {
        borderRadius: 15,
        overflow: 'hidden',
        elevation: 1,
    },
    card: {
        borderRadius: 20,
        
    },
    image: {
        height: 45 / 100 * windowHeight,
        width: '100%',
        minHeight: 250,
        overflow: 'hidden',
        borderRadius: 15,
    },
    title: {
        fontSize: 30,
        fontWeight: 'bold',
        maxWidth: '100%'
    },
    detailsContainer: {
        padding: 10,
        marginLeft: 10
    },
    authorName: {
        marginLeft: 3,
        fontWeight: "bold",
        color: '#808080'
    }
})

export default Card;