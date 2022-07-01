import React from 'react';
import { Text } from 'react-native';
import { Container, Title } from './styles';

interface Props {
    restaurantImage?: string;
    restaurantName: string;
    orderStatus: string;
    orderId: number;
    orderedItems: any;
}

export function PurchaseCard({
    orderId,
    restaurantImage,
    orderStatus,
    orderedItems,
    restaurantName,
}: Props) {
    return (
        <Container>
            <Title>{restaurantName}</Title>
            <Title>{orderStatus}</Title>
            <Title>{orderId}</Title>
            <Title>{orderedItems}</Title>
        </Container>
    );
}
