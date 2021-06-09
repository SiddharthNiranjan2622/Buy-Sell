import React from 'react';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Listings from '../screens/Listings';
import { MaterialCommunityIcons } from "@expo/vector-icons";
import AddItem from '../screens/AddItem';
import * as Notifications from 'expo-notifications'
import AddItemButton from '../components/AddItemButton';
import ListingNavigation from './ListingNavigation';
import MyListingNavigation from './MyListingNavigation';
import { useEffect } from 'react';
import * as Permissions from 'expo-permissions'
import Constants from 'expo-constants';
import * as firebase from 'firebase'
import { auth, db } from '../firebase';
import navigation from './rootNavigation';

const Tab = createBottomTabNavigator();

const AppNavigation = () => {



    useEffect(() => {
        registerForPushNotificationsAsync()

        Notifications.addNotificationResponseReceivedListener((notification) => {
            navigation.navigate('Account')
        })
    }, [])


    const registerForPushNotificationsAsync = async () => {
        let token;
        if (Constants.isDevice) {
            const { status: existingStatus } = await Notifications.getPermissionsAsync();
            let finalStatus = existingStatus;
            if (existingStatus !== 'granted') {
                const { status } = await Notifications.requestPermissionsAsync();
                finalStatus = status;
            }
            if (finalStatus !== 'granted') {
                alert('Failed to get push token for push notification!');
                return;
            }
            token = (await Notifications.getExpoPushTokenAsync()).data;
            console.log(token);
        } else {
            alert('Must use physical device for Push Notifications');
        }

        if (token) {

            const res = await db.collection("users").doc(auth.currentUser.uid).set({ token }, { merge: true })
        }

        if (Platform.OS === 'android') {
            Notifications.setNotificationChannelAsync('default', {
                name: 'default',
                importance: Notifications.AndroidImportance.MAX,
                vibrationPattern: [0, 250, 250, 250],
                lightColor: '#FF231F7C',
            });
        }

        return token;
    }


    return (
        <Tab.Navigator>
            <Tab.Screen
                name="Listing"
                component={ListingNavigation}
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <MaterialCommunityIcons name="home" color={color} size={size} />
                    )
                }}
            />
            <Tab.Screen
                name="AddItem"
                component={AddItem}
                options={({ navigation }) => ({
                    tabBarButton: () => (
                        <AddItemButton onPress={() => navigation.navigate("AddItem")} />
                    ),

                    tabBarIcon: ({ color, size }) => (
                        <MaterialCommunityIcons
                            name="plus-circle"
                            color={color}
                            size={size}
                        />
                    ),
                })}
            />
            <Tab.Screen
                name="Account"
                component={MyListingNavigation}
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <MaterialCommunityIcons name="account" color={color} size={size} />
                    )
                }}
            />
        </Tab.Navigator>
    )
}
export default AppNavigation;