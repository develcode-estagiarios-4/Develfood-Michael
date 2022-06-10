import React, { useContext, useEffect } from 'react';
import { Text, View } from 'react-native';
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

    const {token} = useContext(AuthContext);

    const { data, loading, error, fetchData } = useFetch<FoodList>(
        `/plate/restaurant/${id}?page=0&quantity=10`,
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    );

    useEffect(() => {
        fetchData();
    }, [])

    useEffect(() => {
        !!data &&
            console.log(data?.content);
        //console.log(data?.content[0]?.foodType)
     }, [data])

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
            />
            <Container>
                <RestaurantWrapper>
                    <TitleWrapper>
                        <Title>{name}</Title>
                        <SubtitleCategory>Fast Food</SubtitleCategory>
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

                <FoodCard />
            </Container>
        </>
    );
}
