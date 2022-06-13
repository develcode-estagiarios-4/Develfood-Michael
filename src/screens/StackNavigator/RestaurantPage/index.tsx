import React, { useContext, useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, Text, View } from 'react-native';
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
} from './styles';
import { Input } from '@components/Input';
import { FoodCard } from '@components/FoodCard';
import { FocusAwareStatusBar } from '@components/FocusStatusBar';
import { RFPercentage, RFValue } from 'react-native-responsive-fontsize';
import { useFetch } from '@services/useFetch';
import { AuthContext } from '@context/auth';
import theme from '@styles/theme';
import { EmptyFoodCardList } from '@components/EmptyFoodCardList';
import { useDebouncedCallback } from 'use-debounce';
import Animated, {
    useAnimatedScrollHandler,
    useSharedValue,
    useAnimatedStyle,
    interpolate,
    Extrapolate,
} from 'react-native-reanimated';

interface Food {
    description: string;
    foodType: {
        id: number;
        name: string;
    };
    id: number;
    photo_url: string;
    price: string;
    restaurantName: string;
}

interface FoodList {
    content: Food[];
    totalPages: number;
}

export function RestaurantPage({ navigation, route }: any) {
    const { id, name, photo } = route.params;
    const { token } = useContext(AuthContext);

    const [foods, setFoods] = useState<Food[]>([]);
    const [filter, setFilter] = useState('hamburguer');

    //plate/search?name=ham&restaurantid=1

    const { data, loading, error, fetchData } = useFetch<FoodList>(
        `/plate/search?name=${filter}&restaurantid=${id}`,
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    );

    const debounced = useDebouncedCallback((text) => {
        handleOnChangeText(text);
    }, 1500);

    const scrollY = useSharedValue(0);

    const scrollHandler = useAnimatedScrollHandler((event: any) => {
        scrollY.value = event.contentOffset.y;
    });

     const headerSeparatorStyle = useAnimatedStyle(() => {
         return {
             opacity: interpolate(
                 scrollY.value,
                 [5, 30],
                 [0, 1],
                 Extrapolate.CLAMP
             ),
         };
     });

    function onSuccess(data: FoodList) {
        !!data.content && setFoods([...foods, ...data.content]);
    }

    async function loadRestaurants() {
        await fetchData(onSuccess);
    }

    function handleOnChangeText(value: string) {
        if (value.length > 1) {
            setFoods([]);
            setFilter(value);
        } else if (value.length <= 1) {
            setFoods([]);
            setFilter('');
        }
    }

    useEffect(() => {
        loadRestaurants();
    }, [filter]);

    useEffect(() => {
        console.log(error);
    }, [error]);

    // useEffect(() => {
    //     !!data.content && console.log(data.content[0].foodType);
    // }, [data]);

    return (
        <View style={{ backgroundColor: 'white' }}>
            <FocusAwareStatusBar
                backgroundColor={'white'}
                barStyle={'dark-content'}
            />
            <Header
                source={require('@assets/icons/back.png')}
                source2={require('@assets/icons/emptyHeart.png')}
                goBack={() => navigation.pop()}
                title={`${name}`}
            />
            <Animated.View
                style={[
                    {
                        width: '100%',
                        height: 2,
                        backgroundColor: theme.colors.divider,
                    },
                    headerSeparatorStyle,
                ]}
            />
            <Animated.FlatList
                onScroll={scrollHandler}
                scrollEventThrottle={16}
                //style={{ backgroundColor: 'white' }}
                data={foods}
                keyExtractor={(item) => item?.id}
                contentContainerStyle={{
                    backgroundColor: theme.colors.background,
                    paddingHorizontal: RFValue(15),
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
                ListHeaderComponent={
                    <>
                        <RestaurantWrapper>
                            <TitleWrapper>
                                <Title>{name}</Title>
                                <SubtitleCategory>Fast Food</SubtitleCategory>
                            </TitleWrapper>

                            <RestaurantImage
                                source={
                                    photo
                                        ? {
                                              uri: `${photo}`,
                                          }
                                        : require('@assets/icons/defaultRestaurant.png')
                                }
                            />
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
                renderItem={({ item }) => (
                    <FoodCard
                        name={item.description}
                        price={`R$ ${item.price}`}
                        photo_url={
                            item.photo_url
                                ? item.photo_url
                                : require('@assets/icons/defaultRestaurant.png')
                        }
                    />
                )}
                ListFooterComponent={
                    <LoadWrapper>
                        {!!loading && (
                            <ActivityIndicator
                                size={50}
                                color={theme.colors.background_red}
                            />
                        )}
                    </LoadWrapper>
                }
                ListEmptyComponent={
                    !loading ? (
                        <>
                            <EmptyFoodCardList title="Nenhum prato encontrado" />
                            <EmptyFoodCardList title="Nenhum prato encontrado" />
                            <EmptyFoodCardList title="Nenhum prato encontrado" />
                        </>
                    ) : null
                }
            />
        </View>
    );
}
