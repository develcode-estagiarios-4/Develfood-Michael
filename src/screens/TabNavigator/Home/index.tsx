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
import { ActivityIndicator, Alert, Button, Image, Text, View } from 'react-native';
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

interface ContentData {
    id: number;
    name: string;
    photo: string;
}

interface DataProps {
    content?: ContentData[];
}

export function Home({ navigation }: any) {
    
    const [page, setpage] = useState(0);
    const { token } = useContext(AuthContext);

    const { data, loading, error, fetchData } = useFetch<DataProps>(
        `/restaurant?page=${page}&quantity=10`,
        { headers: { Authorization: `Bearer ${token}` } }
    );

    const [restaurants, setRestaurants] = useState([data]);

    const schema = yup.object().shape({
        buscar: yup.string().required('Campo obrigatório'),
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

    async function loadRestaurants() {
        await fetchData()
        console.log(data)
        !!error && Alert.alert(error)
    }

    function handleOnEndReached() { 
        setpage(page + 1)
        console.log(page)
        loadRestaurants()
        setRestaurants(oldData => [...oldData, ...data.content])

    }

    useFocusEffect(
        useCallback(() => {
            loadRestaurants();
        }, [])
    );
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
                        <Controller
                            control={control}
                            render={({ field: { onChange, value } }) => (
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
                            name={'apelido'}
                        />

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
                                        
                                    renderItem={({ item }: any) => (
                                        <>
                                            <Text>id: {item.id}</Text>
                                            <Text>nome: {item.name}</Text>
                                            

                                            {/* {item.photo && (
                                                <Image
                                                    style={{
                                                        width: 25,
                                                        height: 25,
                                                    }}
                                                    source={{
                                                        uri: `data:image/png;base64,${item.photo}`,
                                                    }}
                                                />
                                            )} */}
                                        </>
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
