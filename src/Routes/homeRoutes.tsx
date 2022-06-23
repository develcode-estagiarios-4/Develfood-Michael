import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RestaurantPage } from '@screens/StackNavigator/RestaurantPage';
import { TabScreenRoutes } from './routes';
import { CartProvider } from '../context/cart';

export function StackScreenRoutes({ navigation }: any) {
    const { Navigator, Screen } = createNativeStackNavigator();
    return (
        <CartProvider>
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
        </CartProvider>
    );
}
