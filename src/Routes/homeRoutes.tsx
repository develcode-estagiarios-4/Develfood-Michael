import React, { useContext } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RestaurantPage } from '@screens/StackNavigator/RestaurantPage';
import { TabScreenRoutes } from './routes';
import { FluctuatingCartButton } from '@components/FluctuatingCartButton';
import { CartContext } from '@context/cart';
import { CheckoutPage } from '@screens/StackNavigator/CheckoutPage';

export function StackScreenRoutes() {
    const { Navigator, Screen } = createNativeStackNavigator();

     const { totalAmount } =
         useContext(CartContext);

    return (
        <>
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
                <Screen 
                    name="Checkout"
                    component={CheckoutPage}
                />
            </Navigator>
            {totalAmount.quantity !== 0 && <FluctuatingCartButton />}
        </>
    );
}
