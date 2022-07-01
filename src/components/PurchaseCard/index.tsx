import { useFetch } from '@services/useFetch';
import React, { useContext, useEffect } from 'react';
import theme from '@styles/theme';
import {
    Container,
    Title,
    RestaurantImage,
    ImageWrapper,
    InfoWrapper,
    Subtitle,
    OrderNumber,
    CheckMark,
    SubtitleWrapper,
} from './styles';
import { AuthContext } from '@context/auth';
import { View } from 'react-native';

interface Props {
    restaurantImage: string;
    restaurantName: string;
    orderStatus: string;
    orderId: number;
    orderedItems: string[];
}

interface Response {
    id: number;
    code: string;
}

export function PurchaseCard({
    orderId,
    restaurantImage,
    orderStatus,
    orderedItems,
    restaurantName,
}: Props) {
    const { token } = useContext(AuthContext);

    const { data, fetchData } = useFetch<Response>(restaurantImage, {
        headers: { Authorization: `Bearer ${token}` },
    });

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <Container>
            <ImageWrapper>
                <RestaurantImage
                    source={
                        data?.code ? { uri: data.code } : theme.images.default
                    }
                />
            </ImageWrapper>
            <InfoWrapper>
                <Title>{restaurantName}</Title>
                <SubtitleWrapper>
                    <CheckMark
                        source={require('@assets/icons/greenCheck.png')}
                    />
                    <Subtitle>
                        {orderStatus === 'PEDIDO_REALIZADO'
                            ? 'Pedido finalizado'
                            : orderStatus}
                    </Subtitle>
                    <View style={{flexDirection: 'row'}}>
                            <Subtitle>N </Subtitle>
                        <OrderNumber>{orderId}</OrderNumber>
                    </View>
                </SubtitleWrapper>

                <Subtitle numberOfLines={2}>{orderedItems}</Subtitle>
            </InfoWrapper>
        </Container>
    );
}
