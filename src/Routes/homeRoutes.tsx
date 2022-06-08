import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RestaurantPage } from '@screens/StackNavigator/RestaurantPage';
import { Home } from '@screens/TabNavigator/Home';

export function HomeRoutes({navigation}: any) {
    const { Navigator, Screen } = createNativeStackNavigator();
    return (
        <Navigator
            initialRouteName="Home"
            screenOptions={{
                headerShown: false,
            }}
        >
            <Screen
                name="Home"
                component={Home}
            />
            <Screen
                name="Restaurant"
                component={RestaurantPage}
            />
        </Navigator>
    );
}
