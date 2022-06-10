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
} from './styles';
import { Input } from '@components/Input';
import { FoodCard } from '@components/FoodCard';
import { FocusAwareStatusBar } from '@components/FocusStatusBar';
import { RFValue } from 'react-native-responsive-fontsize';
import { useFetch } from '@services/useFetch';
import { AuthContext } from '@context/auth';

interface Food {
    description: string;
    foodType: {};
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
    const { data, loading, error, fetchData } = useFetch<FoodList>(
        `/plate/restaurant/${id}?page=0&quantity=10`,
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    );

    const [foods, setFoods] = useState<Food[]>([]);

    function onSuccess(data: FoodList) {
        !!data.content && setFoods([...foods, ...data.content]);
    }

    async function loadRestaurants() {
        await fetchData(onSuccess);
    }

    useEffect(() => {
        loadRestaurants();
    }, []);

    useEffect(() => {
        !!data && console.log(data?.content);
        //console.log(data?.content[0]?.foodType)
    }, [data]);

    return (
        <>
            <FocusAwareStatusBar
                backgroundColor={'white'}
                barStyle={'dark-content'}
            />
            <Container>
                <FlatList
                    data={foods}
                    keyExtractor={(item) => item?.id}
                    ListHeaderComponent={
                        <>
                            <Header
                                source={require('@assets/icons/back.png')}
                                source2={require('@assets/icons/emptyHeart.png')}
                                goBack={() => navigation.pop()}
                            />
                            <RestaurantWrapper>
                                <TitleWrapper>
                                    <Title>{name}</Title>
                                    <SubtitleCategory>
                                        Fast Food
                                    </SubtitleCategory>
                                </TitleWrapper>

                                <View
                                    style={{
                                        backgroundColor: 'green',
                                        width: 60,
                                        height: 60,
                                        borderRadius: 50,
                                    }}
                                ></View>
                            </RestaurantWrapper>
                            <Separator />
                            <PlatesWrapper>
                                <Title>Pratos</Title>
                            </PlatesWrapper>

                            <View style={{ marginBottom: RFValue(15) }}>
                                <Input
                                    source={require('@assets/icons/lupa.png')}
                                    placeholder={`Buscar em ${name}`}
                                />
                            </View>
                        </>
                    }
                    renderItem={({ item }) => (
                        <FoodCard name={item.description} />
                    )}
                    ListFooterComponent={loading ? <ActivityIndicator /> : null}
                />
            </Container>
        </>
    );
}
