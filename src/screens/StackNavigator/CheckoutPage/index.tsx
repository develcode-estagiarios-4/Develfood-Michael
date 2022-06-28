import { FoodCard } from '@components/FoodCard';
import React, { useContext, useEffect, useLayoutEffect } from 'react';
import { FlatList, ScrollView, StyleSheet, Text, View } from 'react-native';
import { CartItem } from '@context/cart';
import { Header } from '@components/Header';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { CartContext } from '@context/cart';
import theme from '@styles/theme';
import Animated, { Layout, SlideOutRight } from 'react-native-reanimated';
import { Container, MapWrapper, OrderList } from './styles';
import { EmptyFoodCardList } from '@components/EmptyFoodCardList';

export function CheckoutPage({ route }: any) {
    const { price, totalAmount, cartItems, setNewPosition, deleteFromCart } =
        useContext(CartContext);
    const closeScreen = require('@assets/icons/x.png');
    const navigation = useNavigation();

    const renderItem = cartItems.length > 0 ? (
        <OrderList layout={Layout.delay(100)} exiting={SlideOutRight}>
            {cartItems?.map((item) => {
                return (
                   
                        <View
                            key={item.id}
                            style={{ marginLeft: -20 }}
                        >
                            <FoodCard
                                name={item.foodTitle}
                                individualPrice={item.individualPrice}
                                link={item.foodImage}
                                description={item.foodDescription}
                                id={item.id}
                                restaurant={item.restaurant}
                                swipeable
                            />
                        </View> 
                );
            })}
        </OrderList>
    ) : null;

    useFocusEffect(() => {
        setNewPosition(0);
    });

    return (
        <>
            <Header
                onPress={() => navigation.goBack()}
                source={closeScreen}
                title="Compras"
                color={theme.colors.header}
            />

            <ScrollView
                contentContainerStyle={{
                    height: 1000,
                }}
            >
                <MapWrapper></MapWrapper>
                {renderItem}
            </ScrollView>
        </>
    );
}

const styles = StyleSheet.create({
    flatlist: {},
});
