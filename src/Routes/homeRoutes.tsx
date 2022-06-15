import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RestaurantPage } from '@screens/StackNavigator/RestaurantPage';
import { TabScreenRoutes } from './routes';

export function StackScreenRoutes({ navigation }: any) {
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
                component={TabScreenRoutes}
            />
            <Screen
                name="Restaurant"
                component={RestaurantPage}
            />
        </Navigator>
    );
}
