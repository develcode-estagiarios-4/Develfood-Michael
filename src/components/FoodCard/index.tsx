import { useFetch } from '@services/useFetch';
import React, { useContext, useEffect, useState } from 'react';
import {
    Dimensions,
    ImageSourcePropType,
    StyleSheet,
    Text,
    useWindowDimensions,
    View,
} from 'react-native';
import { AuthContext } from '@context/auth';
import {
    Counter,
    Title,
    Description,
    AddButton,
    Price,
    Footer,
    Wrapper,
    CounterWrapper,
    NumberWrapper,
    ImageWrapper,
    TrashIcon,
    PlusMinusWrapper,
    PlusButton,
    MinusButton,
} from './styles';
import { RFValue, RFPercentage } from 'react-native-responsive-fontsize';
import theme from '@styles/theme';
import Animated, { FadeInLeft, FadeInRight } from 'react-native-reanimated';
import { CartContext } from '@context/cart';

interface Props {
    foodType?: {
        id: number;
        name: string;
    };
    id: number;
    link: string;
    price: string;
    name: string;
    description: string;
    restaurant: number;
}

interface Response {
    id: number;
    code: string;
}

export function FoodCard({
    name,
    price,
    link,
    description,
    id,
    restaurant,
}: Props) {
    const { token } = useContext(AuthContext);
    const { addItem, removeItem, cartItems, totalAmount } =
        useContext(CartContext);

    const { fontScale } = useWindowDimensions();
    const endpoint = link.slice(33);
    const itemCount = cartItems.find((item) => item?.id === id)?.count;
    const [handleInterval, setHandleInterval] = useState(false);

    const { data, loading, fetchData } = useFetch<Response>(endpoint, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    async function loadImage() {
        await fetchData();
    }

    function priceFormatter() {
        const priceWZeros = parseFloat(price).toFixed(2);
        const priceFormatted = priceWZeros.toString().replace('.', ',');
        return priceFormatted;
    }

    function addToCart() {
        addItem({ id: id, price: price, restaurant: restaurant, count: 1 });
    }

    function removeFromCart() {
        removeItem({ id: id, price: price, restaurant: restaurant, count: 1 });
    }

    useEffect(() => {
        !!endpoint && loadImage();
    }, [endpoint]);

    return (
        <Animated.View
            style={styles.container}
            entering={FadeInRight}
        >
            <ImageWrapper>
                {!loading && (
                    <Animated.Image
                        source={
                            data ? { uri: data?.code } : theme.images.default
                        }
                        style={styles.image}
                        entering={FadeInLeft}
                    />
                )}
                <Animated.View style={styles.imageBackView}></Animated.View>
            </ImageWrapper>

            <Wrapper>
                <View
                    style={{
                        width: '100%',
                        height: '25%',
                    }}
                >
                    <Title
                        ellipsizeMode="tail"
                        numberOfLines={1}
                    >
                        {name}
                    </Title>
                </View>
                <View
                    style={{
                        width: '100%',
                        height: '53%',
                    }}
                >
                    <Description
                        ellipsizeMode="tail"
                        numberOfLines={3}
                        style={{ fontSize: 11 / fontScale }}
                    >
                        {description}
                    </Description>
                </View>

                <Footer>
                    <Price>R$ {priceFormatter()}</Price>

                    {itemCount ? (
                        <CounterWrapper>
                            <AddButton onPress={removeFromCart}>
                                {itemCount === 1 ? (
                                    <TrashIcon
                                        source={require('@assets/icons/trash.png')}
                                    />
                                ) : (
                                    <PlusMinusWrapper>
                                        <MinusButton>-</MinusButton>
                                    </PlusMinusWrapper>
                                )}
                            </AddButton>

                            <NumberWrapper>
                                <Counter>{itemCount}</Counter>
                            </NumberWrapper>
                            <AddButton onPress={addToCart}>
                                <PlusMinusWrapper>
                                    <PlusButton>+</PlusButton>
                                </PlusMinusWrapper>
                            </AddButton>
                        </CounterWrapper>
                    ) : (
                        <CounterWrapper>
                            <AddButton onPress={addToCart}>
                                <Title>Adicionar</Title>
                            </AddButton>
                        </CounterWrapper>
                    )}
                </Footer>
            </Wrapper>
        </Animated.View>
    );
}

const window = Dimensions.get('window');

const styles = StyleSheet.create({
    container: {
        width: window.width - RFValue(30),
        height: window.height * 0.15,
        flexDirection: 'row',
        backgroundColor: theme.colors.background,
        borderRadius: 15,
        alignItems: 'center',
        marginBottom: RFValue(12),
        alignSelf: 'center',
        elevation: 6,
    },
    image: {
        width: RFValue(85),
        height: RFValue(85),
        borderRadius: 15,
        zIndex: 1,
    },
    imageBackView: {
        width: RFValue(85),
        height: RFValue(85),
        borderRadius: 15,
        backgroundColor: '#DDD',
        position: 'absolute',
    },
});
