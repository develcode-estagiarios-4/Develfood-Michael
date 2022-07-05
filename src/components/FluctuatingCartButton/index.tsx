import React, { useContext, useState } from 'react';
import {
    Price,
    Rect,
    Title,
    Icon,
    PriceWrapper,
    Badge,
    BadgeNumber,
} from './styles';
import { CartContext } from '@context/cart';
import { RFValue } from 'react-native-responsive-fontsize';
import { ActivityIndicator, Dimensions, StyleSheet } from 'react-native';
import Animated, { FadeInDown, FadeInUp, FadeOutDown, SlideInDown, SlideOutDown } from 'react-native-reanimated';
import theme from '@styles/theme';
import { useNavigation } from '@react-navigation/native';

const window = Dimensions.get('window');

interface Props {
    checkout?: boolean;
}

export function FluctuatingCartButton({ checkout }: Props) {
    const source = !checkout
        ? require('@assets/icons/basket.png')
        : require('@assets/icons/dollarSign.png');
    const [enabled, setEnabled] = useState(true);
    const navigation = useNavigation();
    const { price, cartAnimation, totalAmount, postOrder } =
        useContext(CartContext);

    function navigateToCheckout() {
        navigation.navigate('Checkout');
    }

    async function post() {
        setEnabled(!enabled);
        await postOrder();
    }

    return (
        <Animated.View
            style={[
                !checkout && cartAnimation,
                styles.container,
                { position: !checkout ? 'absolute' : 'relative' },
            ]}
            entering={SlideInDown}
            exiting={SlideOutDown}
        >
            <Rect
                enabled={enabled}
                onPress={checkout ? post : navigateToCheckout}
            >
                {!checkout && (
                    <Badge>
                        <BadgeNumber>
                            {totalAmount.quantity < 10
                                ? `${totalAmount.quantity}`
                                : '9+'}
                        </BadgeNumber>
                    </Badge>
                )}
                <Icon source={source} />

                <Title>{checkout ? !enabled ? <ActivityIndicator color={theme.colors.white}/> : 'Finalizar pedido' : 'Ver carrinho'}</Title>
                <PriceWrapper>
                    <Price>{price}</Price>
                </PriceWrapper>
            </Rect>
        </Animated.View>
    );
}

const styles = StyleSheet.create({
    container: {
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
