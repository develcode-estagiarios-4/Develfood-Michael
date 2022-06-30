import React from 'react'
import { Text } from 'react-native';
import { Container, Title } from './styles';

interface Props {
    restaurantImage?: string;
    restaurantName: string;
    orderStatus: string;
    orderedItems: any;
}

export function PurchaseCard({restaurantImage, orderStatus, orderedItems, restaurantName}: Props) {
    return (
        <Container>
            <Title>{restaurantName}</Title>
            <Title>{orderStatus}</Title>
            <Title>{orderedItems}</Title>
        </Container>
    );
}