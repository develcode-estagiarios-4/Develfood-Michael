import { useFetch } from '@services/useFetch';
import React, { useContext, useEffect, useLayoutEffect, useState } from 'react';
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
    SwipeableButton,
    SwipeableText,
    BiggerTrash,
    SwipeWrapper,
} from './styles';
import { RFValue, RFPercentage } from 'react-native-responsive-fontsize';
import theme from '@styles/theme';
import Animated, {
    FadeInLeft,
    FadeInRight,
    FadeOut,
    Layout,
    SlideOutRight,
} from 'react-native-reanimated';
import { CartContext } from '@context/cart';
import Swipeable from 'react-native-gesture-handler/Swipeable';
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
    restaurantName?: string;
    restaurantType?: string[];
    restaurantPhoto?: string;
    restaurantID: number;
    swipeable?: boolean;
    setListHeight?: () => void;
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
    restaurantID,
    restaurantName,
    restaurantType,
    restaurantPhoto,
    swipeable,
    setListHeight,
}: Props) {
    const { token } = useContext(AuthContext);
    const { addItem, removeItem, cartItems, deleteFromCart } =
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
        addItem({
            id: id,
            individualPrice: individualPrice,
            count: 1,
            foodTitle: name,
            foodDescription: description,
            foodImage: link,
            restaurantID: restaurantID,
            restaurantName: restaurantName,
            restaurantType: restaurantType,
            restaurantImage: restaurantPhoto,
        });
    }

    function removeFromCart() {
        removeItem({ id: id, count: 1 });
    }

    function deleteEverything() {
        deleteFromCart({
            id: id,
            count: 1,
        });
    }

    const renderLeftPanel = () => {
        return (
            <SwipeableButton onPress={deleteEverything}>
                <SwipeWrapper>
                    <BiggerTrash source={require('@assets/icons/trash.png')} />
                    <SwipeableText>Remover</SwipeableText>
                </SwipeWrapper>
            </SwipeableButton>
        );
    };

    useEffect(() => {
        !!endpoint && loadImage();
    }, [endpoint]);

    return swipeable ? (
        <Animated.View
            entering={FadeInRight}
            exiting={SlideOutRight}
            layout={Layout.delay(50).withCallback(setListHeight()!)}
        >
            <Swipeable
                renderLeftActions={renderLeftPanel}
                friction={0.6}
                leftThreshold={70}
                useNativeAnimations
            >
                <View
                    style={[
                        styles.container,
                        {
                            width: window.width * 0.86,
                        },
                    ]}
                >
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
        width: undefined,
        height: window.height * 0.15,
        flexDirection: 'row',
        backgroundColor: theme.colors.background,
        borderRadius: 15,
        alignItems: 'center',
        marginBottom: RFValue(12),
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
