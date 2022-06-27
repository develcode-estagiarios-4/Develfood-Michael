import React, {
    useContext,
    useEffect,
    useRef,
    useState,
} from 'react';
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
    Animated,
    Dimensions,
    NativeScrollEvent,
    NativeSyntheticEvent,
    StatusBar,
} from 'react-native';
import { AuthContext } from '../../../context/auth';
import { HeaderHome } from '@components/HeaderHome';
import { Restaurants } from '@components/Restaurant';
import { Categoria } from '@components/Categorias';
import { RFPercentage, RFValue } from 'react-native-responsive-fontsize';
import theme from '../../../styles/theme';
import { Input } from '@components/Input';
import { useDebouncedCallback } from 'use-debounce';
import { EmptyFoodCardList } from '@components/EmptyFoodCardList';
import { useFocusEffect, useScrollToTop } from '@react-navigation/native';
import { CartContext } from '@context/cart';

interface FoodTypes {
    id: number;
    name: string;
}

type Restaurant = {
    id: number;
    name: string;
    photo_url: string;
    food_types: FoodTypes[];
};

type RestaurantList = {
    content: Restaurant[];
    totalPages: number;
    totalElements: number;
};

const CardMargins =
    (Dimensions.get('screen').width - RFValue(280)) / RFValue(3.2);

const headerHeight = RFValue(50);

export function Home({ navigation }: any) {
    const { setNewPosition } = useContext(CartContext);

    const [filter, setFilter] = useState({
        input: '',
        page: 0,
    });
    const [restaurants, setRestaurants] = useState<Restaurant[]>([]);

    const { token } = useContext(AuthContext);

    const { data, loading, fetchData } = useFetch<RestaurantList>(
        `/restaurant/filter?name=${filter.input}&page=${filter.page}&quantity=10`,
        { headers: { Authorization: `Bearer ${token}` } }
    );

    const debounced = useDebouncedCallback((text) => {
        handleOnChangeText(text);
    }, 1500);

    function onSuccess(data: RestaurantList) {
        !!data.content && restaurants.push(...data.content);
    }

    async function loadRestaurants() {
        await fetchData(onSuccess);
    }

    function handleOnEndReached() {
        if (data?.totalPages !== filter.page) {
            setFilter({ ...filter, page: filter.page + 1 });
        }
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

    const renderItem = ({ item }: { item: Restaurant }) => (
        <Restaurants
            onPress={() => {
                navigation.navigate('Restaurant', {
                    id: item.id,
                    name: item.name,
                    photo_url: item.photo_url,
                    food_types:
                        item.food_types.length > 0
                            ? item.food_types[0].name
                            : 'Sem categoria',
                });
            }}
            name={item.name}
            link={item.photo_url}
            id={item.id}
            category={
                item.food_types.length > 0
                    ? item.food_types[0].name.charAt(0).toUpperCase() +
                      item.food_types[0].name.slice(1).toLowerCase()
                    : 'Sem categoria'
            }
        />
    );

    const listFooterComponent = () => (
        <View
            style={{
                width: '100%',
                height: RFPercentage(10),
                justifyContent: 'center',
            }}
        >
            {loading && (
                <ActivityIndicator
                    size={40}
                    color={theme.colors.background_red}
                />
            )}
        </View>
    );

    const listEmptyComponent = () => {
        if (!loading) {
            return <EmptyFoodCardList title="Nenhum restaurante encontrado" />;
        } else return null;
    };

    const ref = React.useRef(null);
    useScrollToTop(ref);

    const scrollY = useRef(new Animated.Value(0));

    const scrollHandler = Animated.event(
        [
            {
                nativeEvent: {
                    contentOffset: { y: scrollY.current },
                },
            },
        ],
        { useNativeDriver: true }
    );

    const scrollYClamped = Animated.diffClamp(scrollY.current, 0, headerHeight);

    const translateY = scrollYClamped.interpolate({
        inputRange: [0, headerHeight],
        outputRange: [0, -headerHeight],
    });

    const translateYNumber = useRef();

    translateY.addListener(({ value }) => {
        translateYNumber.current = value;
    });

    function getCloser(value: any, checkOne: number, checkTwo: number) {
        if (Math.abs(value - checkOne) < Math.abs(value - checkTwo))
            return checkOne;
        else return checkTwo;
    }

    const handleSnap = ({
        nativeEvent,
    }: NativeSyntheticEvent<NativeScrollEvent>) => {
        const offsetY = nativeEvent.contentOffset.y;
        if (
            !(
                translateYNumber.current === 0 ||
                translateYNumber.current === -headerHeight
            )
        ) {
            if (ref.current) {
                ref.current.scrollToOffset({
                    offset:
                        getCloser(
                            translateYNumber.current,
                            -headerHeight,
                            0
                        ) === -headerHeight
                            ? offsetY + headerHeight
                            : offsetY - headerHeight,
                });
            }
        }
    };

    useEffect(() => {
        loadRestaurants();
    }, [filter]);

    useFocusEffect(() => {
        setNewPosition(RFValue(-50));
    });

    return (
        <>
            <StatusBar
                barStyle={'light-content'}
                backgroundColor={'#C20C18'}
            />
            <HeaderHome
                source={require('@assets/icons/map.png')}
                title={'Rua Arcy da Nobrega 667, Panazollo'}
                {...{ headerHeight }}
                style={{ transform: [{ translateY }] }}
            />
            <Container>
                <Animated.FlatList
                    onScroll={scrollHandler}
                    onMomentumScrollEnd={handleSnap}
                    scrollEventThrottle={16}
                    ref={ref}
                    data={restaurants}
                    numColumns={2}
                    keyExtractor={(item) => item.id.toString()}
                    style={{ flex: 1 }}
                    columnWrapperStyle={{
                        justifyContent: 'space-between',
                        paddingHorizontal: RFValue(CardMargins),
                        paddingBottom: 15,
                    }}
                    ListHeaderComponent={
                        <>
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
                    ListFooterComponent={listFooterComponent}
                    renderItem={renderItem}
                    ListEmptyComponent={listEmptyComponent}
                    onEndReached={() => {
                        handleOnEndReached();
                    }}
                />
            </Container>
        </>
    );
}
