import React from 'react';
import { Image } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { Container, Title } from './styles';
import Animated, { FadeInDown } from 'react-native-reanimated';

interface Props {
    checkout?: boolean;
    restaurantPage?: boolean;
    homePage?: boolean;
}

export function EmptyFoodCardList({
    checkout,
    restaurantPage,
    homePage,
}: Props) {

    const source = checkout
        ? require('@assets/icons/noItemsCheckout.png')
        : require('@assets/icons/notFound.png');

    const title =
        (checkout && 'Seu carrinho está vazio') ||
        (restaurantPage && 'Nenhum prato encontrado') ||
        (homePage && 'Nenhum restaurante encontrado');

    return (
        <Container>
            <Animated.Image
                entering={FadeInDown}
                source={source}
                style={{
                    width: '100%',
                    height: RFValue(210),
                }}
            />
            <Title>{title}</Title>
        </Container>
    );
}
