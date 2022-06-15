import React, { useCallback, useContext, useEffect, useState } from 'react';
import { useFetch } from '@services/useFetch';
import {
    Banner,
    BannerWrapper,
    Categories,
    Container,
    Content,
    RestaurantList,
    Title,
    TitleWrapper,
    View,
} from './styles';
import {
    ActivityIndicator,
    Alert,
    Button,
    Dimensions,
    Image,
    Text,
} from 'react-native';
import { AuthContext } from '../../../context/auth';
import { StackActions, useFocusEffect } from '@react-navigation/native';
import { FocusAwareStatusBar } from '@components/FocusStatusBar';
import { HeaderHome } from '@components/HeaderHome';
import { Restaurants } from '@components/Restaurant';
import { Categoria } from '@components/Categorias';
import { RFPercentage, RFValue } from 'react-native-responsive-fontsize';
import theme from '../../../styles/theme';
import { Input } from '@components/Input';
import { useDebouncedCallback } from 'use-debounce';

interface FoodTypes {
    id: number;
    name: string;
}

interface Restaurant {
    id: number;
    name: string;
    photo_url: string | null;
    food_types: FoodTypes[] | null;
}

interface RestaurantList {
    content: Restaurant[];
    number: number;
    totalPages: number;
    first: boolean;
}

const CardMargins =
    (Dimensions.get('screen').width - RFValue(280)) / RFValue(3.2);

export function Home({ navigation }: any) {
    const [filter, setFilter] = useState({
        input: '',
        page: 0,
    });
    const [restaurants, setRestaurants] = useState<Restaurant[]>([]);

    const { token } = useContext(AuthContext);

    const { data, loading, error, fetchData } = useFetch<RestaurantList>(
        `/restaurant/filter?name=${filter.input}&page=${filter.page}&quantity=10`,
        { headers: { Authorization: `Bearer ${token}` } }
    );

    const debounced = useDebouncedCallback(
        (text) => {
            handleOnChangeText(text);
        },
        1500
    );

    function onSuccess(data: RestaurantList) {
        !!data.content && setRestaurants([...restaurants, ...data.content]);
    }

    async function loadRestaurants() {
        await fetchData(onSuccess);
    }

    async function handleLoadOnEnd() {
        if (data.totalPages !== filter.page) {
            setFilter({ ...filter, page: filter.page + 1 });
        }
    }

    function handleOnEndReached() {
        handleLoadOnEnd();
    }

    function handleOnChangeText(value: string) {
        if (value.length > 1) {
            setRestaurants([]);
            setFilter({ input: value, page: 0 });
        } else if (value.length <= 1) {
            setRestaurants([]);
            setFilter({ input: '', page: 0 });
        }
    }

    useEffect(() => {
        loadRestaurants();
    }, []);

    useEffect(() => {
        loadRestaurants();
    }, [filter]);

    return (
        <>
            <FocusAwareStatusBar
                barStyle={'light-content'}
                backgroundColor={'#C20C18'}
            />
            <Container>
                <RestaurantList
                    data={restaurants}
                    numColumns={2}
                    keyExtractor={(item) => item?.id}
                    columnWrapperStyle={{
                        justifyContent: 'space-between',
                        paddingHorizontal: RFValue(CardMargins),
                        paddingBottom: 15,
                    }}
                    ListHeaderComponent={
                        <>
                            <HeaderHome
                                source={require('@assets/icons/pinMap.png')}
                                title={'rua Arcy da Nobrega 667, Panazollo'}
                            />
                            <BannerWrapper>
                                <Banner
                                    source={require('@assets/icons/banner.png')}
                                />
                                <Banner
                                    source={require('@assets/icons/banner.png')}
                                />
                            </BannerWrapper>

                            <Content>
                                <TitleWrapper>
                                    <Title>Categoria</Title>
                                </TitleWrapper>
                                <Categories>
                                    <Categoria title="Pizza" />
                                    <Categoria title="Brasileira" />
                                    <Categoria title="Doces" />
                                    <Categoria title="Pastelaria" />
                                    <Categoria title="Mercado" />
                                    <Categoria title="Japonês" />
                                </Categories>
                                <View>
                                    <Input
                                        name={'baka'}
                                        source={require('@assets/icons/lupa.png')}
                                        placeholder="Buscar restaurantes"
                                        onChangeText={(text) => {
                                            debounced(text);
                                        }}
                                    />
                                </View>
                            </Content>
                        </>
                    }
                    ListFooterComponent={() => (
                        <View
                            style={{
                                width: '100%',
                                height: RFPercentage(20),
                                justifyContent: 'center',
                            }}
                        >
                            {loading && (
                                <ActivityIndicator
                                    size={50}
                                    color={theme.colors.background_red}
                                />
                            )}
                        </View>
                    )}
                    renderItem={({ item }) => (
                        <Restaurants
                            name={item.name}
                            link={item.photo_url}
                            id={item.id}
                            category={
                                item.food_types.length > 0
                                    ? item.food_types[0].name
                                          .charAt(0)
                                          .toUpperCase() +
                                      item.food_types[0].name
                                          .slice(1)
                                          .toLowerCase()
                                    : 'Sem categoria'
                            }
                            
                        />
                    )}
                    onEndReached={() => {
                        handleOnEndReached();
                    }}
                />
            </Container>
        </>
    );
}
