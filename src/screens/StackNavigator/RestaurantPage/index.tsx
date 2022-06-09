import React from 'react';
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

export function RestaurantPage({ navigation, route }: any) {
    const { id, name, photo } = route.params;

    return (
        <>
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

                <View style={{marginBottom: 10}}>
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
