import React from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import Constants from 'expo-constants';
import { Dimensions } from 'react-native';
import InputField from '../components/InputField';
import CustomButton from '../components/CustomButton';
import { auth, db } from '../firebase';
import { useState } from 'react';



const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

function Register({navigation}) {
    const [name, setName] = useState()
    const [email, setEmail] = useState()
    const [password, setPassword] = useState()

    const registerUser = () =>{
        auth.createUserWithEmailAndPassword(email,password)
        .then( 
            auth => {
                db.collection('users').doc(auth.user.uid)
                    .set({
                        gmail:email,
                        name:name,
                        profile_picture:""
                    })
            }
        ).catch((error =>alert(error.message)))
        navigation.replace("Home")
    }


    return (
        <View style={styles.container}>
            <View style={styles.afterContainer}>

                <Text style={styles.register}> Register</Text>
                <Text style={styles.fillTheDetails}>Please Fill the details to Continue</Text>
                <InputField placeholder="Name" icon="account" onChangeText={text => setName(text)} />
                <InputField placeholder="Email" icon="email" onChangeText={text => setEmail(text)} />
                <InputField placeholder="Password" icon="lock" secureTextEntry={true} onChangeText={text => setPassword(text)   } />
                <CustomButton title="Register" backgroundColor="#ffcc00" onPress={registerUser}  />
            </View>
            <View style={styles.singInText}>
                <Text style={styles.actualText} >
                    Already have an account?  <Text style={styles.signIn} onPress={()=>navigation.goBack()} >Sign in</Text>
                </Text>
            </View>
        </View>

    );
}

const styles = StyleSheet.create({
    container: {
        paddingTop: Constants.statusBarHeight,
        backgroundColor: "#F5F5F5",
        flex: 1
    },
    afterContainer: {
        marginTop: 18 / 100 * windowHeight,
        marginBottom: 15
    },
    register: {
        fontSize: 35,
        alignSelf: 'flex-start',
        marginLeft: 30,
        fontWeight: 'bold',
        marginBottom: 7

    },
    fillTheDetails: {
        fontSize: 16,
        alignSelf: 'flex-start',
        marginLeft: 40,
        fontWeight: "bold",
        color: "#8c8c8c",
        marginBottom: 30
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
    singInText: {
        alignItems: 'baseline',
        alignSelf: 'center',
        marginBottom: 1 / 100 * windowHeight,
    },
})

export default Register;