import React from 'react';
import { createStackNavigator } from "@react-navigation/stack";
import Welcome from '../screens/Welcome';
import Register from '../screens/Register';
import Listings from '../screens/Listings';
import Loading from '../screens/Loading';
import AppNavigation from './AppNavigation';
import ListingNavigation from './ListingNavigation';




const Stack = createStackNavigator();

const AuthNavigation = () => (

    <Stack.Navigator>
        <Stack.Screen
            name="Loading"
            component={Loading}
            options={{ headerShown: false }}

        />
        <Stack.Screen
            name="Welcome"
            component={Welcome}
            options={{ headerShown: false }}
        />
        <Stack.Screen
            name="Register"
            component={Register}
            options={{ headerShown: false }}
        />
        <Stack.Screen
            name="Home"
            component={AppNavigation}
            options={{ headerShown: false }}
        />

    </Stack.Navigator>
)

export default AuthNavigation;