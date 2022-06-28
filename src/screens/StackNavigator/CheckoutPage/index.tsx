import { FoodCard } from '@components/FoodCard';
import React, { useContext, useEffect, useLayoutEffect } from 'react';
import {
    Dimensions,
    FlatList,
    ScrollView,
    StyleSheet,
    Text,
    View,
} from 'react-native';
import { CartItem } from '@context/cart';
import { Header } from '@components/Header';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { CartContext } from '@context/cart';
import theme from '@styles/theme';
import Animated, { Layout, SlideOutRight } from 'react-native-reanimated';
import {
    Container,
    MapWrapper,
    OrderList,
    MyItemsWrapper,
    Title,
    RestaurantWrapper,
    SubtitleCategory,
    Separator,
    Image,
    MapImage,
    MapInfoWrapper,
    LittleTitle,
} from './styles';
import { useFetch } from '@services/useFetch';
import { AuthContext } from '@context/auth';

interface ImageResponse {
    code: string;
    id: number;
}

export function CheckoutPage({ route }: any) {
    const {
        price,
        totalAmount,
        cartItems,
        setNewPosition,
        deleteFromCart,
        restaurant,
    } = useContext(CartContext);
    const { token } = useContext(AuthContext);
    const closeScreen = require('@assets/icons/x.png');
    const navigation = useNavigation();
    const category =
        restaurant.type.charAt(0) + restaurant.type.slice(1).toLowerCase();

    const {
        data: dataImage,
        loading: loadingImage,
        fetchData: fetchImage,
    } = useFetch<ImageResponse>(restaurant.image, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    const renderItem =
        cartItems.length > 0
            ? cartItems?.map((item) => {
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

    useFocusEffect(() => {
        setNewPosition(0);
    });

    useEffect(() => {
        fetchImage();
    }, [])

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
                    <MapImage source={require('@assets/icons/defaultRestaurant.png')}/>
                    <MapInfoWrapper>
                        <LittleTitle>Rua Arcy da Nobrega, 667</LittleTitle>
                        <LittleTitle>Rua Arcy da Nobrega, 667</LittleTitle>
                        <LittleTitle>Rua Arcy da Nobrega, 667</LittleTitle>
                    </MapInfoWrapper>
                </MapWrapper>
                <Separator />
                <RestaurantWrapper>
                    <View style={{ backgroundColor: 'green', flex: 1 }}>
                        <Title>{restaurant.name}</Title>
                        <SubtitleCategory>{category}</SubtitleCategory>
                    </View>
                    <Image
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
                        contentContainerStyle={{
                            height: 900,
                            backgroundColor: theme.colors.gray,
                        }}
                    >
                        {renderItem}
                    </ScrollView>
                </OrderList>
            </Container>
        </>
    );
}
