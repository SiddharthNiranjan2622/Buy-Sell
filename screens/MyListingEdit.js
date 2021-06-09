import React from 'react';
import { Image, KeyboardAvoidingView, StyleSheet, Text, View } from 'react-native';
import Constants from 'expo-constants';
import { useEffect } from 'react';
import * as ImagePicker from 'expo-image-picker';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { useState } from 'react';
import { MaterialCommunityIcons } from '@expo/vector-icons'
import InputField from '../components/InputField';
import { Dimensions } from 'react-native';
import CustomButton from '../components/CustomButton';
import { auth, db, storage } from '../firebase';
import * as firebase from 'firebase'
import { useLayoutEffect } from 'react';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;


function MyListingEdit({route}) {
    const item = route.params.data
    const itemId = route.params.id
    const [itemPost, setItemPost] = useState(item)

    const [imageUri, setImageUri] = useState(item.downloadURL)
    const [titleName, setTitleName] = useState(item.titleName)
    const [price, setPrice] = useState(item.price)
    const [description, setDescription] = useState(item.description)
    const [profileImage, setProfileImage] = useState()
    const [userProfileData, setuserProfileData] = useState()

    const getUserProfileData = async () => {
        const uid = auth.currentUser.uid
        const docdata = db.collection("users").doc(uid);
        const doc = await docdata.get()
        if (!doc.exists) {
            console.log('No such document!');
        } else {
            // console.log('Document data:', doc.data());
            setuserProfileData(doc.data())
            console.log(userProfileData)
            console.log(item)
            // const docProfilePic = doc.data().profile_picture
            // console.log(profileImage)

            //  const doc = doc.data()
            //  const userProfile = doc.profile_picture
            //  setProfileImage(userProfile)
            //  console.log(userProfile)
        }
    }

    

    const requestPermission = async () => {
        const { granted } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (!granted) alert("You need to enable permission to access the photos")
    }
    // useLayoutEffect(() => {
    //     getUserProfileData()
    // }, [CustomButton])

    useEffect(() => {
        requestPermission();

    }, [])

    const selectImage = async () => {
        try {
            const result = await ImagePicker.launchImageLibraryAsync()
            if (!result.cancelled)
                setImageUri(result.uri)

        } catch (error) {
            console.log(error)
        }
    }


    const uploadPublic_one = async () => {
        const response = await fetch(imageUri);
        const blob = await response.blob();

        const task = storage.ref(`users/${firebase.auth().currentUser.uid}/${Math.random().toString(36)}`).put(blob)

        const taskProgress = snapshot => {
            console.log(`transferred: ${snapshot.bytesTransferred}`)
        }

        const taskCompleted = () => {
            task.snapshot.ref.getDownloadURL().then((snapshot) => {
                uploadPublic_two(snapshot)
                console.log(snapshot)
            })
        }
        const taskError = snapshot => {
            console.log(snapshot)
        }

        task.on("state_changed", taskProgress, taskError, taskCompleted)

    }

    const uploadPublic_two = (downloadURL) => {
        db.collection('publicItem').doc(itemId)
            .update({
                userName:item.userName ,
                userGmail:item.userGmail,
                profilePicture:item.profilePicture,
                userUid: firebase.auth().currentUser.uid,
                downloadURL: downloadURL,
                titleName,
                price,
                description,
                creation: firebase.firestore.FieldValue.serverTimestamp(),
                token:item.token



            }).then(() => {
                console.log("success")
            })

    }
    const checkItem = () => {
        console.log(item,itemPost)
    }

// (<MaterialCommunityIcons name="camera" size={40} />

    return (
        <KeyboardAvoidingView style={styles.container}>
            <View>
                <TouchableWithoutFeedback onPress={selectImage}>
                    <View style={styles.imageContainer}>
                        {!imageUri && (<Image source={{uri:item.downloadURL}} style={styles.image} /> )}
                        {imageUri && <Image source={{ uri: imageUri }}  style={styles.image} />}
                    </View>
                </TouchableWithoutFeedback>
                <View style={styles.input}>
                    <InputField placeholder="Title" icon="rename-box" value={titleName} onChangeText={text => setTitleName(text)} />
                    <InputField placeholder="$ Price" icon="currency-usd-circle-outline" value={price}  onChangeText={text => setPrice(text)} keyboardType="numeric" />
                    <InputField placeholder="description" icon="pencil" value={description} onChangeText={text => setDescription(text)}  />
                    <CustomButton title="Update" backgroundColor="#ffcc00" onPress={uploadPublic_one}   />
                    </View>
                    
                    </View>
                    </KeyboardAvoidingView>
                    
                    );
                }
                // <CustomButton title="checkItem" backgroundColor="#ffcc00" onPress={checkItem}   />

const styles = StyleSheet.create({
    container: {
        paddingTop: Constants.statusBarHeight + 10,
        alignItems: "center",
        justifyContent: 'center',
        marginBottom: 100,
        paddingLeft: 10

    },
    imageContainer: {
        backgroundColor: "#ffffff",
        borderRadius: 15,
        justifyContent: "center",
        alignItems: 'center',
        height: 30 / 100 * windowHeight,
        width: 50 / 100 * windowWidth,
        overflow: 'hidden',
        alignSelf: 'center'
    },
    image: {
        height: 200,
        width: 200,
    },
    input: {
        marginTop: 10,
        marginRight: 20
    }
})

export default MyListingEdit;