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
    MinusWrapper,
    PlusWrapper,
    PlusButton,
    MinusButton,
    ContainerBelow,
} from './styles';
import { RFValue, RFPercentage } from 'react-native-responsive-fontsize';
import theme from '@styles/theme';
import Animated, { FadeInLeft, FadeInRight, FadeOut, Layout, SlideOutRight } from 'react-native-reanimated';
import { CartContext } from '@context/cart';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import { RectButton } from 'react-native-gesture-handler';

interface Props {
    foodType?: {
        id: number;
        name: string;
    };
    id: number;
    link: string;
    individualPrice: number;
    name: string;
    description: string;
    restaurant: number;
    swipeable?: boolean;
}

interface Response {
    id: number;
    code: string;
}

export function FoodCard({
    name,
    individualPrice,
    link,
    description,
    id,
    restaurant,
    swipeable
}: Props) {
    const { token } = useContext(AuthContext);
    const { addItem, removeItem, cartItems, totalAmount } =
        useContext(CartContext);

    const { fontScale } = useWindowDimensions();
    const endpoint = link.slice(33);
    const itemCount = cartItems.find((item) => item?.id === id)?.count;
    const priceFormatted = individualPrice.toLocaleString('pt-BR', {
        maximumFractionDigits: 2,
        style: 'currency',
        currency: 'BRL',
    });

    const { data, loading, fetchData } = useFetch<Response>(endpoint, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    async function loadImage() {
        await fetchData();
    }

    function addToCart() {
        addItem({ id: id, individualPrice: individualPrice, restaurant: restaurant, count: 1, foodTitle: name, foodDescription: description, foodImage: link });
    }

    function removeFromCart() {
        removeItem({ id: id, restaurant: restaurant, count: 1 });
    }

    function renderLeftSide() {
        return (
            <ContainerBelow>
                <RectButton onPress={removeFromCart}>
                    <Text>Excluir</Text>
                </RectButton>
            </ContainerBelow>
        );
    }

    useEffect(() => {
        !!endpoint && loadImage();
    }, [endpoint]);

    return swipeable ? (
        <Animated.View
            entering={FadeInRight}
            exiting={SlideOutRight}
            layout={Layout.delay(50)}
        >
            <Swipeable
                renderLeftActions={renderLeftSide}
                friction={0.5}
            >
                <View style={styles.container}>
                    <ImageWrapper>
                        {!loading && (
                            <Animated.Image
                                source={
                                    data
                                        ? { uri: data?.code }
                                        : theme.images.default
                                }
                                style={styles.image}
                                entering={FadeInLeft}
                            />
                        )}
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
                            <Price>{priceFormatted}</Price>

                            {itemCount ? (
                                <CounterWrapper>
                                    <AddButton onPress={removeFromCart}>
                                        {itemCount === 1 ? (
                                            <TrashIcon
                                                source={require('@assets/icons/trash.png')}
                                            />
                                        ) : (
                                            <MinusWrapper>
                                                <MinusButton>-</MinusButton>
                                            </MinusWrapper>
                                        )}
                                    </AddButton>

                                    <NumberWrapper>
                                        <Counter>{itemCount}</Counter>
                                    </NumberWrapper>
                                    <AddButton onPress={addToCart}>
                                        <PlusWrapper>
                                            <PlusButton>+</PlusButton>
                                        </PlusWrapper>
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
                </View>
            </Swipeable>
        </Animated.View>
    ) : (
        <Animated.View
            style={styles.container}
            entering={FadeInRight}
            exiting={FadeOut}
            layout={Layout.delay(50)}
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
                    <Price>{priceFormatted}</Price>

                    {itemCount ? (
                        <CounterWrapper>
                            <AddButton onPress={removeFromCart}>
                                {itemCount === 1 ? (
                                    <TrashIcon
                                        source={require('@assets/icons/trash.png')}
                                    />
                                ) : (
                                    <MinusWrapper>
                                        <MinusButton>-</MinusButton>
                                    </MinusWrapper>
                                )}
                            </AddButton>

                            <NumberWrapper>
                                <Counter>{itemCount}</Counter>
                            </NumberWrapper>
                            <AddButton onPress={addToCart}>
                                <PlusWrapper>
                                    <PlusButton>+</PlusButton>
                                </PlusWrapper>
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
