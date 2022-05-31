import React from 'react';
import { useTheme } from 'styled-components';
import {
    Container,
    RestaurantImage,
    Content,
    Title,
    Description,
    SubTitle,
    Avaliation,
} from './styles';

interface ListRestaurantProps {
    name: string;
}

export function Restaurants({ name }: ListRestaurantProps) {
    const theme = useTheme();
    return (
        <Container>
            <RestaurantImage source={require('@assets/icons/x.png')} />

            <Content>
                <Title>{name}</Title>

                <Description>
                    <SubTitle>Pizza</SubTitle>

                    <Avaliation>5</Avaliation>
                </Description>
            </Content>
        </Container>
    );
}
