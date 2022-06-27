import { FoodCard } from '@components/FoodCard';
import React, { useContext, useEffect, useLayoutEffect } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { CartItem } from '@context/cart';
import { Header } from '@components/Header';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { CartContext } from '@context/cart';
import theme from '@styles/theme';
import { RFValue } from 'react-native-responsive-fontsize';

export function CheckoutPage({ route }: any) {
    const { price, totalAmount, cartItems, setNewPosition } =
        useContext(CartContext);
    const closeScreen = require('@assets/icons/x.png');
    const navigation = useNavigation();

    const renderItem = ({ item }: { item: CartItem }) => (
        <FoodCard
            name={item.foodTitle}
            individualPrice={item.individualPrice}
            link={item.foodImage}
            description={item.foodDescription}
            id={item.id}
            restaurant={item.restaurant}
        />
    );

    useFocusEffect(() => {
        setNewPosition(0);
        console.log(cartItems[0].foodImage);
    });

    return (
        <>
            <Header
                onPress={() => navigation.goBack()}
                source={closeScreen}
                title="Compras"
                color={theme.colors.header}
            />

            <FlatList
                data={cartItems}
                renderItem={renderItem}
                ListHeaderComponent={() => (
                    <>
                        <Text>PÁGINA DE CHECKOUT</Text>
                        <Text>
                            {price} {totalAmount.quantity}
                        </Text>
                    </>
                )}
                ListFooterComponent={() => (
                    <View style={{ height: RFValue(100) }} />
                )}
            />
        </>
    );
}

const styles = StyleSheet.create({
    flatlist: {},
});
