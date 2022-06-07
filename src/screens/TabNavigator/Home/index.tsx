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
    const [page, setPage] = useState(0);
    const [input, setInput] = useState('');
    const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
    const [searchedRestaurants, setSearchedRestaurants] = useState<
        Restaurant[]
    >([]);

    const { token } = useContext(AuthContext);

    const { data, loading, error, fetchData } = useFetch<RestaurantList>(
        `/restaurant/filter?name=${input}&page=${page}&quantity=10`,
        { headers: { Authorization: `Bearer ${token}` } }
    );

    function onSuccess(data: RestaurantList) {
        !!data.content && setRestaurants([...restaurants, ...data.content]);
        //console.log('pagina: ', data.number, 'primeira página: ', data.first);
    }

    function onSearchSuccess(data: RestaurantList) {
        !!data.content && setSearchedRestaurants(data.content);
        
    }

    async function loadRestaurants() {
        await fetchData(onSuccess);
    }

    async function handleLoadOnEnd() {
        if (data.totalPages !== page) {
            await fetchData(onSuccess);
            setPage(page + 1);
            //console.log('carregou pagina', page);
        }
    }

    function handleOnEndReached() {
        handleLoadOnEnd();
    }

    useEffect(() => {
        setSearchedRestaurants([]);
        input && fetchData(onSearchSuccess);
    }, [input]);

    useFocusEffect(
        useCallback(() => {
            loadRestaurants();
            console.log('carregou pela primeira vez');
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
                    data={searchedRestaurants}
                    numColumns={2}
                    keyExtractor={(item: any) => item?.id}
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
                                        onChangeText={(event) => {
                                            setInput(event);
                                            //console.log(event.nativeEvent.text);
                                        }}
                                        value={input}
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
                    renderItem={({ item }: any) => (
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
                    )}
                    onEndReached={() => {
                        handleOnEndReached();
                    }}
                />
            </Container>
        </>
    );
}
