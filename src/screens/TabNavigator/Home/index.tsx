import React, { useCallback, useContext, useEffect, useState } from 'react';
import { useFetch } from '@services/useFetch';
import {
    Banner,
    BannerWrapper,
    Container,
    Content,
    List,
    RestaurantList,
    ScrollView,
    Title,
    TitleWrapper,
} from './styles';
import {
    ActivityIndicator,
    Alert,
    Button,
    Image,
    Text,
    View,
} from 'react-native';
import { usePost } from '@services/usePost';
import { useDelete } from '@services/useDelete';
import { usePut } from '@services/usePut';
import { Header } from '@components/Header';
import { AuthContext } from '../../../context/auth';
import { StackActions, useFocusEffect } from '@react-navigation/native';
import { FocusAwareStatusBar } from '@components/FocusStatusBar';
import { HeaderHome } from '@components/HeaderHome';
import { Input } from '@components/Input';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Restaurants } from '@components/Restaurant';

interface Restaurant {
    id: number;
    name: string;
    photo: string;
}

interface RestaurantList {
    content?: Restaurant[];
}

export function Home({ navigation }: any) {
    const [page, setpage] = useState(0);
    const { token } = useContext(AuthContext);

    const { data, loading, error, fetchData } = useFetch<RestaurantList>(
        `/restaurant?page=${page}&quantity=10`,
        { headers: { Authorization: `Bearer ${token}` } }
    );

    const [restaurants, setRestaurants] = useState([data]);

    function onSuccess(data: any) {
        !!data.content && setRestaurants([...restaurants, ...data.content]);
    }

    console.log(page);
    async function loadRestaurants() {
        await fetchData(onSuccess);
        setpage(page + 1);
        //console.log(restaurants)
    }

    async function handleOnEndReached() {
        console.log(page);
        await loadRestaurants();
    }

    useEffect(() => {
        loadRestaurants();
    }, []);
    //console.log(dataList);

    return (
        <>
            <FocusAwareStatusBar
                barStyle={'light-content'}
                backgroundColor={'#C20C18'}
            />
            <HeaderHome
                source={require('@assets/icons/pinMap.png')}
                title={'rua Arcy da Nobrega 667, Panazollo'}
            />
            <Container>
                <>
                    <BannerWrapper>
                        <Banner source={require('@assets/icons/banner.png')} />
                        <Banner source={require('@assets/icons/banner.png')} />
                    </BannerWrapper>
                    <TitleWrapper>
                        <Title>Categoria</Title>
                    </TitleWrapper>
                    <Content>
                        {/* <Controller
                            //control={control}
                            render={({ field: { onChange, value } }) => (
                                <Input
                                    //control={control}
                                    source={require('@assets/icons/lupa.png')}
                                    placeholder="Buscar restaurantes"
                                    onChangeText={() => {
                                        onChange;
                                    }}
                                    value={value}
                                />
                            )}
                            name={'apelido'}
                        /> */}

                        <Text>API's</Text>
                        {loading ? (
                            <ActivityIndicator
                                style={{ flex: 1 }}
                                size={'large'}
                            />
                        ) : (
                            <View>
                                <RestaurantList
                                    data={restaurants}
                                    numColumns={2}
                                    keyExtractor={(item) => item.id}
                                    renderItem={({ item }: any) => (
                                        <Restaurants name={item.name} />
                                    )}
                                    onEndReached={() => {
                                        handleOnEndReached();
                                    }}
                                    style={{
                                        flex: 1,
                                        borderWidth: 2,
                                        marginTop: 10,
                                    }}
                                />
                            </View>
                        )}
                    </Content>

                    {/* <List
                            data={data}
                            keyExtractor={(item) => item}
                            onEndReached={}
                            onEndReachedThreshold={}
                        /> */}
                </>
            </Container>
        </>
    );
}
