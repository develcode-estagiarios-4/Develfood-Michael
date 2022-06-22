import React, { useContext, useEffect, useState } from 'react';
import {
    ActivityIndicator,
    FlatList,
    StyleSheet,
    Text,
    View,
    Image,
} from 'react-native';
import { Header } from '@components/Header';
import {
    Container,
    SubtitleCategory,
    Title,
    RestaurantWrapper,
    TitleWrapper,
    Separator,
    PlatesWrapper,
    RestaurantImage,
    LoadWrapper,
    ImageWrapper,
} from './styles';
import { Input } from '@components/Input';
import { FoodCard } from '@components/FoodCard';
import { FocusAwareStatusBar } from '@components/FocusStatusBar';
import { RFPercentage, RFValue } from 'react-native-responsive-fontsize';
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
    FadeIn,
    FadeInLeft,
    FadeInRight,
} from 'react-native-reanimated';

interface Food {
    description: string;
    name: string;
    foodType: string;
    id: number;
    photo_url: string;
    price: string;
    restaurantName: string;
}

interface ImageResponse {
    code: string;
    id: number;
}

export function RestaurantPage({ navigation, route }: any) {
    const { id, name, photo_url, food_types } = route.params;
    const { token } = useContext(AuthContext);

    const [foods, setFoods] = useState<Food[]>([]);
    const [filter, setFilter] = useState('');
    const [loading, setLoading] = useState(false);

    const { data, error, fetchData } = useFetch<Food[]>(
        `/plate/search?name=${filter}&restaurantid=${id}`,
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    );

    const {
        data: dataImage,
        error: errorImage,
        loading: loadingImage,
        fetchData: fetchImage,
    } = useFetch<ImageResponse>(`${photo_url}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    const debounced = useDebouncedCallback((text) => {
        handleOnChangeText(text);
    }, 1500);

    const scrollY = useSharedValue(0);
    const opacity = useSharedValue(0);

    const scrollHandler = useAnimatedScrollHandler((event: any) => {
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
            price={item.price}
            link={item.photo_url}
            description={item.description}
            id={item.id}
            restaurant={id}
        />
    );

    useEffect(() => {
        loadFoods();
    }, [filter]);

    useEffect(() => {
        loadRestaurantImage();
    }, []);

    return (
        <>
            <FocusAwareStatusBar
                backgroundColor={'white'}
                barStyle={'dark-content'}
            />
            <Header
                source={require('@assets/icons/back.png')}
                source2={require('@assets/icons/emptyHeart.png')}
                goBack={() => navigation.pop()}
                title={`${name}`}
                style={[styles.header, headerTitle]}
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
                                            source={{
                                                uri: `${dataImage?.code}`,
                                            }}
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
                        loading ? (
                            <LoadWrapper>
                                <ActivityIndicator
                                    size={50}
                                    color={theme.colors.background_red}
                                />
                            </LoadWrapper>
                        ) : (
                            <View style={{ height: 30 }}></View>
                        )
                    }
                    ListEmptyComponent={
                        !loading ? (
                            <EmptyFoodCardList title="Nenhum prato encontrado" />
                        ) : null
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
