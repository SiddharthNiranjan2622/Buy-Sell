import React from 'react';
import { createStackNavigator } from "@react-navigation/stack";
import Listings from '../screens/Listings';
import ListingDetails from '../screens/ListingDetails';


const Stack = createStackNavigator();

const ListingNavigation = () => {

    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen
                name="Listing"
                component={Listings}
            />
            <Stack.Screen
                name="ListingDetails"
                component={ListingDetails}
            />
        </Stack.Navigator>
    )
}
export default ListingNavigation;