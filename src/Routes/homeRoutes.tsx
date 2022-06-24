import React, { useContext } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RestaurantPage } from '@screens/StackNavigator/RestaurantPage';
import { TabScreenRoutes } from './routes';
import { FluctuatingCartButton } from '@components/FluctuatingCartButton';
import { CartContext } from '@context/cart';

export function StackScreenRoutes({ navigation }: any) {
    const { Navigator, Screen } = createNativeStackNavigator();

     const { totalAmount, price } =
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
            </Navigator>
            {totalAmount.price !== 0 && <FluctuatingCartButton price={price} />}
        </>
    );
}
