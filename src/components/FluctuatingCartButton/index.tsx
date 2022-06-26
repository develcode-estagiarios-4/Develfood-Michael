import React, { useContext } from 'react';
import {
    Container,
    Price,
    Rect,
    Title,
    Icon,
    PriceWrapper,
    Badge,
    BadgeWrapper,
    BadgeNumber,
} from './styles';
import basket from '../../assets/icons/basket.png';
import { CartContext } from '@context/cart';
import { RFValue } from 'react-native-responsive-fontsize';
import { Dimensions, StyleSheet } from 'react-native';
import Animated, { FadeIn, FadeInDown, FadeInUp, FadeOutDown } from 'react-native-reanimated';

const window = Dimensions.get('window');

export function FluctuatingCartButton() {

    const { price, cartAnimation, totalAmount } = useContext(CartContext);

    return (
        <Animated.View
            style={[cartAnimation, styles.container]}
            entering={FadeInUp}
            exiting={FadeOutDown}
        >
            <Rect>
                <Badge>
                    <BadgeNumber>{totalAmount.quantity < 10 ? totalAmount.quantity : '9+'}</BadgeNumber>
                </Badge>
                <Icon source={basket} />

                <Title>Ver carrinho</Title>
                <PriceWrapper>
                    <Price>{price}</Price>
                </PriceWrapper>
            </Rect>
        </Animated.View>
    );
}

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        width: window.width - RFValue(20),
        zIndex: 1,
        margin: RFValue(10),
        bottom: RFValue(8)
    },
});
