import React, { useContext } from 'react';
import {
    Price,
    Rect,
    Title,
    Icon,
    PriceWrapper,
    Badge,
    BadgeNumber,
} from './styles';
import basket from '../../assets/icons/basket.png';
import { CartContext } from '@context/cart';
import { RFValue } from 'react-native-responsive-fontsize';
import { Dimensions, StyleSheet } from 'react-native';
import Animated, { FadeInUp, FadeOutDown } from 'react-native-reanimated';
import theme from '@styles/theme';
import { useNavigation } from '@react-navigation/native';

const window = Dimensions.get('window');

export function FluctuatingCartButton() {

    const navigation = useNavigation();
    const { price, cartAnimation, totalAmount, cartItems } = useContext(CartContext);

    function navigateToCheckout() {
        navigation.navigate('Checkout');
    }

    return (
        <Animated.View
            style={[cartAnimation, styles.container]}
            entering={FadeInUp}
            exiting={FadeOutDown}
        >
            <Rect onPress={navigateToCheckout}>
                <Badge>
                    <BadgeNumber>
                        {totalAmount.quantity < 10
                            ? `${totalAmount.quantity}`
                            : '9+'}
                    </BadgeNumber>
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
        width: window.width,
        height: RFValue(65),
        zIndex: 1,
        bottom: 0,
        backgroundColor: theme.colors.background,
        justifyContent: 'center',
        paddingHorizontal: RFValue(10),
        elevation: 3,
    },
});
