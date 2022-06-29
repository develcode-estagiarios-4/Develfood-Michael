import { FoodCard } from '@components/FoodCard';
import React, { useContext, useEffect } from 'react';
import { Image, ScrollView, View } from 'react-native';
import { CartItem } from '@context/cart';
import { Header } from '@components/Header';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { CartContext } from '@context/cart';
import theme from '@styles/theme';
import {
    Container,
    MapWrapper,
    OrderList,
    MyItemsWrapper,
    Title,
    RestaurantWrapper,
    SubtitleCategory,
    Separator,
    ImageRest,
    MapImage,
    MapInfoWrapper,
    LittleTitle,
    LittleSubtitle,
    EvenLittleTitle,
} from './styles';
import { useFetch } from '@services/useFetch';
import { AuthContext } from '@context/auth';
import { RFValue } from 'react-native-responsive-fontsize';
import { FluctuatingCartButton } from '@components/FluctuatingCartButton';

interface ImageResponse {
    code: string;
    id: number;
}

export function CheckoutPage() {
    const { totalAmount, cartItems, setNewPosition, restaurant } =
        useContext(CartContext);
    const { token } = useContext(AuthContext);
    const closeScreen = require('@assets/icons/x.png');
    const navigation = useNavigation();
    const category =
        restaurant.type.charAt(0) + restaurant.type.slice(1).toLowerCase();

    const { data: dataImage, fetchData: fetchImage } = useFetch<ImageResponse>(
        restaurant.image,
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    );

    const renderItem =
        cartItems.length > 0
            ? cartItems.map(({ item }: { item: CartItem }) => {
                  return (
                      <FoodCard
                          name={item.foodTitle}
                          individualPrice={item.individualPrice}
                          link={item.foodImage}
                          description={item.foodDescription}
                          id={item.id}
                          restaurantID={item.restaurantID}
                          swipeable
                          key={item.id}
                      />
                  );
              })
            : null;

    async function loadImage() {
        await fetchImage();
    }

    useFocusEffect(() => {
        setNewPosition(80);
    });

    useEffect(() => {
        loadImage();
    }, []);

    return (
        <>
            <Header
                onPress={() => navigation.goBack()}
                source={closeScreen}
                title="Compras"
                color={theme.colors.header}
            />
            <Container>
                <MapWrapper>
                    <View
                        style={{
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}
                    >
                        <MapImage
                            source={require('@assets/icons/googlemaps.png')}
                        />
                        <Image
                            source={require('@assets/icons/pin.png')}
                            style={{
                                position: 'absolute',
                                width: 25,
                                height: 40,
                                resizeMode: 'contain',
                            }}
                        />
                    </View>

                    <MapInfoWrapper>
                        <LittleSubtitle>Entregar em:</LittleSubtitle>
                        <LittleTitle>Rua Arcy da Nobrega, 667</LittleTitle>
                        <EvenLittleTitle>Panazollo - Apto: 107</EvenLittleTitle>
                    </MapInfoWrapper>
                    <Image
                        source={require('@assets/icons/rightIndicator.png')}
                        style={{
                            width: 26,
                            height: 25,
                            resizeMode: 'contain',
                        }}
                    />
                </MapWrapper>
                <Separator />
                <RestaurantWrapper>
                    <View style={{ flex: 1 }}>
                        <Title>{restaurant.name}</Title>
                        <SubtitleCategory>{category}</SubtitleCategory>
                    </View>
                    <ImageRest
                        source={
                            dataImage?.code
                                ? { uri: dataImage?.code }
                                : require('@assets/icons/defaultRestaurant.png')
                        }
                    />
                </RestaurantWrapper>
                <OrderList>
                    <MyItemsWrapper>
                        <Title>Meus Itens</Title>
                    </MyItemsWrapper>
                    <ScrollView
                        fadingEdgeLength={150}
                        contentContainerStyle={{
                            marginLeft: RFValue(16),
                        }}
                    >
                        {renderItem}
                    </ScrollView>
                </OrderList>
            </Container>
            {totalAmount.quantity > 0 && <FluctuatingCartButton checkout />}
        </>
    );
}