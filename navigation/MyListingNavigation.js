import React from 'react';
import { createStackNavigator } from "@react-navigation/stack";
import MyListing from '../screens/MyListing';
import MyListingEdit from '../screens/MyListingEdit';
import Account from '../screens/Account';
import MyMessages from '../screens/MyMessages';
import ChatScreen from '../screens/ChatScreen';

const Stack = createStackNavigator();

const MyListingNavigation = () => {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen
                name="Account"
                component={Account}
            />
            <Stack.Screen
                name="MyListing"
                component={MyListing}
            />
            <Stack.Screen
                name="MyListingEdit"
                component={MyListingEdit}
            />
            <Stack.Screen
                name="MyMessages"
                component={MyMessages}
            />
            <Stack.Screen
                name="ChatScreen"
                component={ChatScreen}
            />
            
        </Stack.Navigator>
    )
}
export default MyListingNavigation;