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
import { ActivityIndicator, Alert, Button, Dimensions, Image, Text } from 'react-native';
import { AuthContext } from '../../../context/auth';
import { StackActions, useFocusEffect } from '@react-navigation/native';
import { FocusAwareStatusBar } from '@components/FocusStatusBar';
import { HeaderHome } from '@components/HeaderHome';
import { Input } from '@components/Input';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Restaurants } from '@components/Restaurant';
import { Categoria } from '@components/Categorias';
import { RFPercentage, RFValue } from 'react-native-responsive-fontsize';
import theme from '../../../styles/theme';

interface Restaurant {
    id: number;
    name: string;
    photo: string;
}

interface RestaurantList {
    content?: Restaurant[];
    number: number;
    totalPages: number;
    first: boolean;
}
    
const CardMargins =
    (Dimensions.get('screen').width - RFValue(280)) / RFValue(3.2);

export function Home({ navigation }: any) {
    const schema = yup.object().shape({
        pesquisar: yup.string().required('Campo obrigatório'),
    });

    const {
        control,
        handleSubmit,
        getValues,
        formState: { errors },
        setValue,
        reset,
        clearErrors,
    } = useForm({
        resolver: yupResolver(schema),
    });

    const [page, setPage] = useState(0);
    const { token } = useContext(AuthContext);

    const { data, loading, error, fetchData } = useFetch<RestaurantList>(
        `/restaurant?page=${page}&quantity=10`,
        { headers: { Authorization: `Bearer ${token}` } }
    );

    const [restaurants, setRestaurants] = useState([]);

    function onSuccess(data: any) {
        !!data.content &&
            setRestaurants([...restaurants, ...data.content] as never);
        console.log(data.number, data.first);
    }

    async function loadRestaurants() {
        await fetchData(onSuccess);
        setPage(1);
    }

    async function handleLoadOnEnd() {
        if (data.totalPages !== page) {
            await fetchData(onSuccess);
            setPage(page + 1);
            console.log('menor');
        }
    }

    function handleOnEndReached() {
        handleLoadOnEnd();
    }

    useFocusEffect(
        useCallback(() => {
            //setRestaurants([]);
            loadRestaurants();
            console.log('chamou useEffect');
        }, [])
    );

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
                    keyExtractor={(item) => item.id}
                    columnWrapperStyle={{
                        justifyContent: 'space-between',
                        paddingHorizontal: RFValue(CardMargins),
                        paddingBottom: 15,
                        backgroundColor: 'red',
                    }}
                    ListHeaderComponent={() => (
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
                                    <Controller
                                        control={control}
                                        render={({
                                            field: { onChange, value },
                                        }) => (
                                            <Input
                                                control={control}
                                                source={require('@assets/icons/lupa.png')}
                                                placeholder="Buscar restaurantes"
                                                onChangeText={() => {
                                                    onChange;
                                                }}
                                                value={value}
                                            />
                                        )}
                                        name={'pesquisar'}
                                    />
                                </View>
                            </Content>
                        </>
                    )}
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
                    renderItem={({ item }: any) => (
                        //<RestaurantWrapper>
                        <Restaurants
                            name={item.name}
                            source={
                                item.photo
                                    ? {
                                          uri: `${item.photo}`,
                                      }
                                    : require('@assets/icons/defaultRestaurant.png')
                            }
                        />
                        //</RestaurantWrapper>
                    )}
                    onEndReached={() => {
                        handleOnEndReached();
                    }}
                />
            </Container>
        </>
    );
}
