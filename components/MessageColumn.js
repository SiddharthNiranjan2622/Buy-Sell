import React from 'react';
import { TouchableWithoutFeedback } from 'react-native';
import { Image } from 'react-native';
import { Text } from 'react-native';
import { StyleSheet, View } from 'react-native';

function MessageColumn({ profileImage, userName, userMessage,onPress }) {
    return (
        <TouchableWithoutFeedback onPress={onPress}>
            <View style={styles.container}>
                <View style={styles.messageColumn}>
                    <Image source={{ uri: profileImage || "https://cencup.com/wp-content/uploads/2019/07/avatar-placeholder.png" }} style={styles.profileImage} />
                    <View style={styles.userDetials}>
                        <Text style={styles.userName}>{userName}</Text>
                        <Text style={styles.userMessage}>{userMessage}</Text>
                    </View>
                </View>
            </View>
        </TouchableWithoutFeedback>

    );
}

const styles = StyleSheet.create({
    container: {
        paddingLeft: 10,
        paddingRight: 10
    },
    messageColumn: {
        flexDirection: 'row'
    },
    profileImage: {
        height: 50,
        width: 50,
        borderRadius: 40
    },
    userDetials: {
        flexDirection: 'column',
        alignSelf: 'center',
        marginLeft: 10,
    },
    userName: {
        fontSize: 18,
        fontWeight: 'bold'
    },
    userMessage: {
        fontWeight: 'bold',
        color: '#666666'

    }
})

export default MessageColumn;