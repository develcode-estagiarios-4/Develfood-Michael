import React, { useContext } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { RestaurantPage } from '@screens/StackNavigator/RestaurantPage';
import { TabScreenRoutes } from './routes';
import { FluctuatingCartButton } from '@components/FluctuatingCartButton';
import { CartContext } from '@context/cart';
import { CheckoutPage } from '@screens/StackNavigator/CheckoutPage';
import { CheckoutSuccess } from '@screens/StackNavigator/CheckoutSuccess';

export function StackScreenRoutes() {
    const { Navigator, Screen } = createStackNavigator();

    const { totalAmount } = useContext(CartContext);

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
                <Screen
                    name="CheckoutSuccess"
                    component={CheckoutSuccess}
                />
            </Navigator>
            {totalAmount.quantity !== 0 && <FluctuatingCartButton />}
        </>
    );
}
