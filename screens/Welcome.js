import React from 'react';
import { Button, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Dimensions } from 'react-native';
import Constants from 'expo-constants';
import CustomButton from '../components/CustomButton';
import InputField from '../components/InputField';
import * as Google from 'expo-google-app-auth';
import * as GoogleSignIn from 'expo-google-sign-in';
import * as firebase from 'firebase'
import { auth, db } from '../firebase';
import { useState } from 'react';
import { useEffect } from 'react';
import { useLayoutEffect } from 'react';



const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

function Welcome({ navigation }) {
    const [email, setEmail] = useState()
    const [password, setPassword] = useState()

    useLayoutEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((authUser) => {
            if (authUser) {
                navigation.replace('Loading')
            }
        })
        return unsubscribe
    }, [])

    const signInWithGoogleAsync = async () => {
        try {
            const result = await Google.logInAsync({
                behavior: 'web',
                androidClientId: "1032331770633-qrddo7eibt9e7us9mgnijr99ii84m6hd.apps.googleusercontent.com",
                scopes: ['profile', 'email'],
            });

            if (result.type === 'success') {
                onSignIn(result)
                navigation.replace('Home')
                return result.accessToken;
            } else {
                return { cancelled: true };
            }
        } catch (e) {
            return { error: true };
        }
    }

    const onSignIn = googleUser => {
        console.log('Google Auth Response', googleUser);
        // We need to register an Observer on Firebase Auth to make sure auth is initialized.
        var unsubscribe = auth.onAuthStateChanged((firebaseUser) => {
            unsubscribe();
            // Check if we are already signed-in Firebase with the correct user.
            if (!isUserEqual(googleUser, firebaseUser)) {
                // Build Firebase credential with the Google ID token.
                var credential = firebase.auth.GoogleAuthProvider.credential(
                    googleUser.idToken,
                    googleUser.accessToken
                );

                // Sign in with credential from the Google user.
                firebase.auth().signInWithCredential(credential).then((result) => {

                    console.log(result);
                    db.collection('users').doc(result.user.uid)
                        .set({
                            gmail: result.user.email,
                            name: result.user.displayName,
                            profile_picture: result.user.photoURL
                        })
                }).catch((error) => {
                    // Handle Errors here.
                    var errorCode = error.code;
                    var errorMessage = error.message;
                    // The email of the user's account used.
                    var email = error.email;
                    // The firebase.auth.AuthCredential type that was used.
                    var credential = error.credential;
                    // ...
                });
            } else {
                console.log('User already signed-in Firebase.');
            }
        });
    }

    const isUserEqual = (googleUser, firebaseUser) => {
        if (firebaseUser) {
            var providerData = firebaseUser.providerData;
            for (var i = 0; i < providerData.length; i++) {
                if (providerData[i].providerId === firebase.auth.GoogleAuthProvider.PROVIDER_ID &&
                    providerData[i].uid === googleUser.getBasicProfile().getId()) {
                    // We don't need to reauth the Firebase connection.
                    return true;
                }
            }
        }
        return false;
    }

    const login = () => {
        auth.signInWithEmailAndPassword(email, password).catch(error => alert(error))
    }

    return (
        <View style={styles.container}>
            <View style={styles.textinput}>
                <Text style={styles.login}> Login</Text>
                <Text style={styles.signInToContinue}>Please Sign in to Continue</Text>
                <InputField placeholder="Email" icon="email" onChangeText={text => setEmail(text)} />
                <InputField placeholder="Password" icon="lock" secureTextEntry={true} onChangeText={text => setPassword(text)} />
                <CustomButton title="Login" backgroundColor="#ffcc00" onPress={login} />
                <Text style={{ fontSize: 25, color: "#666666" }}>Or</Text>
                <CustomButton icon="google" title=" Sign Up With Google" backgroundColor="#d9d9d9" onPress={() => signInWithGoogleAsync()} />
            </View>
            <View style={styles.singInText}>
                <Text style={styles.actualText}  >
                    Don't have an account?  <Text style={styles.signIn} onPress={() => navigation.navigate("Register")} >Sign up</Text>
                </Text>
            </View>
        </View>



    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: Constants.statusBarHeight,
        backgroundColor: "#F5F5F5"

    },
    textinput: {
        flex: 2,
        marginTop: 21 / 100 * windowHeight,
        alignContent: 'center',
        alignItems: 'center',

    },
    singInText: {
        alignItems: 'baseline',
        alignSelf: 'center',
        marginBottom: 2 / 100 * windowHeight,
    },
    actualText: {
        fontSize: 15,
        color: "#737373"
    },
    signIn: {
        color: "#ffcc00",
        fontWeight: 'bold',
        fontSize: 16
    },
    login: {
        fontSize: 35,
        alignSelf: 'flex-start',
        marginLeft: 30,
        fontWeight: 'bold',
        marginBottom: 7

    },
    signInToContinue: {
        fontSize: 16,
        alignSelf: 'flex-start',
        marginLeft: 40,
        fontWeight: "bold",
        color: "#8c8c8c",
        marginBottom: 30
    }

})

export default Welcome;