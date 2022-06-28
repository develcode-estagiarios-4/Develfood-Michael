import { FoodCard } from '@components/FoodCard';
import React, { useContext, useEffect, useLayoutEffect } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { CartItem } from '@context/cart';
import { Header } from '@components/Header';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { CartContext } from '@context/cart';
import theme from '@styles/theme';
import Animated, { Layout } from 'react-native-reanimated';
import { Container } from './styles';
import { ScrollView } from 'react-native-gesture-handler';

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

    function renderList(cartItems) {
        cartItems.map(item => {
             <FoodCard
                 name={item.foodTitle}
                 individualPrice={item.individualPrice}
                 link={item.foodImage}
                 description={item.foodDescription}
                 id={item.id}
                 restaurant={item.restaurant}
             />;
        })
    }

    useFocusEffect(() => {
        setNewPosition(0);
    });

    return (
        <Container>
            <Header
                onPress={() => navigation.goBack()}
                source={closeScreen}
                title="Compras"
                color={theme.colors.header}
            />

            <ScrollView
                contentContainerStyle={{
                    height: '100%',
                    width: '100%',
                }}
            >
                {cartItems?.map((item) => {
                    return (
                        <FoodCard
                            name={item.foodTitle}
                            individualPrice={item.individualPrice}
                            link={item.foodImage}
                            description={item.foodDescription}
                            id={item.id}
                            restaurant={item.restaurant}
                            key={item.id}
                            swipeable
                        />
                    );
                })}
            </ScrollView>
        </Container>
    );
}

const styles = StyleSheet.create({
    flatlist: {},
});
