import React, { useContext, useEffect, useLayoutEffect, useState } from 'react';
import { ActivityIndicator, StyleSheet, View, Image } from 'react-native';
import { Header } from '@components/Header';
import {
    SubtitleCategory,
    Title,
    RestaurantWrapper,
    TitleWrapper,
    Separator,
    PlatesWrapper,
    ImageWrapper,
} from './styles';
import { Input } from '@components/Input';
import { FoodCard } from '@components/FoodCard';
import { FocusAwareStatusBar } from '@components/FocusStatusBar';
import { RFValue } from 'react-native-responsive-fontsize';
import { useFetch } from '@services/useFetch';
import { AuthContext } from '../../../context/auth';
import theme from '../../../styles/theme';
import { EmptyFoodCardList } from '@components/EmptyFoodCardList';
import { useDebouncedCallback } from 'use-debounce';
import Animated, {
    useAnimatedScrollHandler,
    useSharedValue,
    useAnimatedStyle,
    interpolate,
    Extrapolate,
    withTiming,
    FadeInRight,
} from 'react-native-reanimated';
import { useFocusEffect } from '@react-navigation/native';
import { CartContext } from '@context/cart';

interface Food {
    description: string;
    name: string;
    foodType: string;
    id: number;
    photo_url: string;
    price: number;
    restaurantName: string;
}

interface ImageResponse {
    code: string;
    id: number;
}

export function RestaurantPage({ navigation, route }: any) {
    const { id, name, photo_url, food_types } = route.params;
    const { token } = useContext(AuthContext);
    const { setNewPosition } = useContext(CartContext);
    const logoRest = theme.images.default;
    const [foods, setFoods] = useState<Food[]>([]);
    const [filter, setFilter] = useState('');
    const [loading, setLoading] = useState(false);

    const { fetchData } = useFetch<Food[]>(
        `/plate/search?name=${filter}&restaurantid=${id}`,
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    );

    const {
        data: dataImage,
        loading: loadingImage,
        fetchData: fetchImage,
    } = useFetch<ImageResponse>(photo_url, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    const debounced = useDebouncedCallback((text) => {
        handleOnChangeText(text);
    }, 1500);

    const scrollY = useSharedValue(0);
    const opacity = useSharedValue(0);

    const scrollHandler = useAnimatedScrollHandler((event) => {
        scrollY.value = event.contentOffset.y;
        if (scrollY.value >= 45) {
            opacity.value = withTiming(1, { duration: 500 });
        } else if (scrollY.value <= 35) {
            opacity.value = withTiming(0, { duration: 500 });
        }
    });

    const headerSeparatorStyle = useAnimatedStyle(() => {
        return {
            opacity: interpolate(
                scrollY.value,
                [5, 50],
                [0, 1],
                Extrapolate.CLAMP
            ),
        };
    });

    const headerTitle = useAnimatedStyle(() => {
        return {
            opacity: opacity.value,
        };
    });

    function onSuccess(data: Food[]) {
        !!data && setFoods([...foods, ...data]);
    }

    async function loadFoods() {
        setLoading(true);
        await fetchData(onSuccess);
        setLoading(false);
    }

    async function loadRestaurantImage() {
        await fetchImage();
    }

    function handleOnChangeText(value: string) {
        setLoading(true);
        if (value.length > 1) {
            setFoods([]);
            setFilter(value);
        } else {
            setFoods([]);
            setFilter('');
        }
        setLoading(false);
    }

    const renderItem = ({ item }: { item: Food }) => (
        <FoodCard
            name={item.name}
            individualPrice={item.price}
            link={item.photo_url}
            description={item.description}
            id={item.id}
            restaurantID={id}
            restaurantName={name}
            restaurantPhoto={photo_url}
            restaurantType={food_types}
        />
    );

    useEffect(() => {
        loadFoods();
    }, [filter]);

    useLayoutEffect(() => {
        loadFoods();
        loadRestaurantImage();
    }, []);

    useFocusEffect(() => {
        setNewPosition(RFValue(0));
    });

    return (
        <>
            <FocusAwareStatusBar
                backgroundColor={'white'}
                barStyle={'dark-content'}
            />
            <Header
                source={require('@assets/icons/back.png')}
                source2={require('@assets/icons/emptyHeart.png')}
                onPress={() => navigation.pop()}
                title={`${name}`}
                style={[styles.header, headerTitle]}
                color={theme.colors.headerSecondary}
            />
            <View style={{ backgroundColor: 'white', flex: 1 }}>
                <Animated.View
                    style={[styles.separator, headerSeparatorStyle]}
                />
                <Animated.FlatList
                    onScroll={scrollHandler}
                    scrollEventThrottle={16}
                    data={foods}
                    keyExtractor={(item) => item?.id.toString()}
                    contentContainerStyle={{
                        backgroundColor: theme.colors.background,
                        paddingHorizontal: RFValue(16),
                    }}
                    ListHeaderComponent={
                        <>
                            <RestaurantWrapper>
                                <TitleWrapper>
                                    <Title>{name}</Title>
                                    <SubtitleCategory>
                                        {food_types.charAt(0).toUpperCase() +
                                            food_types.slice(1).toLowerCase()}
                                    </SubtitleCategory>
                                </TitleWrapper>

                                <ImageWrapper>
                                    {!loadingImage && (
                                        <Animated.Image
                                            style={styles.imageUp}
                                            entering={FadeInRight}
                                            source={
                                                dataImage?.code
                                                    ? { uri: dataImage?.code }
                                                    : logoRest
                                            }
                                        />
                                    )}
                                    <Image
                                        style={styles.imageDown}
                                        source={theme.images.default}
                                    />
                                </ImageWrapper>
                            </RestaurantWrapper>
                            <Separator />
                            <PlatesWrapper>
                                <Title>Pratos</Title>
                            </PlatesWrapper>

                            <View style={{ marginBottom: RFValue(15) }}>
                                <Input
                                    source={require('@assets/icons/lupa.png')}
                                    placeholder={`Buscar em ${name}`}
                                    onChangeText={(text) => debounced(text)}
                                />
                            </View>
                        </>
                    }
                    renderItem={renderItem}
                    ListFooterComponent={
                        <View style={{ height: RFValue(60) }}></View>
                    }
                    ListEmptyComponent={
                        !loading ? (
                            <EmptyFoodCardList title="Nenhum prato encontrado" />
                        ) : (
                            <ActivityIndicator
                                style={{ marginTop: RFValue(120) }}
                                color={theme.colors.primary}
                                size={'large'}
                            />
                        )
                    }
                />
            </View>
        </>
    );
}

const styles = StyleSheet.create({
    separator: {
        width: '100%',
        height: 1,
        backgroundColor: theme.colors.divider,
    },
    header: {
        fontSize: theme.sizes.medium,
        color: theme.colors.text_dark,
        fontFamily: theme.fonts.primaryReg,
        opacity: 0,
    },
    imageUp: {
        width: RFValue(70),
        height: RFValue(70),
        borderRadius: 50,
    },
    imageDown: {
        width: RFValue(70),
        height: RFValue(70),
        borderRadius: 50,
        backgroundColor: '#DDD',
        position: 'absolute',
        zIndex: -1,
    },
});
