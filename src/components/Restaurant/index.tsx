import React from 'react';
import { ImageProps } from 'react-native';
import { useTheme } from 'styled-components';
import { number } from 'yup';
import {
    Container,
    RestaurantImage,
    Content,
    Title,
    Description,
    SubTitle,
    Avaliation,
    Star,
    AvaliationWrapper,
} from './styles';

interface ListRestaurantProps {
    name: string;
    source: ImageProps['source'];
}

export function Restaurants({ name, source }: ListRestaurantProps) {
    const theme = useTheme();
    return (
        <Container>
            <RestaurantImage source={source} />

            <Content>
                <Title>{name}</Title>

                <Description>
                    <SubTitle>Pizza</SubTitle>

                    <AvaliationWrapper>
                        <Star source={require('@assets/icons/star.png')} />
                        <Avaliation>{Math.ceil(Math.random() * 5)}</Avaliation>
                    </AvaliationWrapper>
                </Description>
            </Content>
        </Container>
    );
}
