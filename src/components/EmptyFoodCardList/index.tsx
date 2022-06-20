import React from 'react';
import { Image } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { Container, Title } from './styles';
import Animated, { FadeInDown  } from 'react-native-reanimated';

interface Props {
    title: string;
}

export function EmptyFoodCardList({title} : Props) {
    return (
        <Container>
            <Animated.Image
                entering={FadeInDown}
                source={require('@assets/icons/notFound.png')}
                style={{
                    width: '100%',
                    height: RFValue(210),
                }}
            />
            <Title>{title}</Title>
        </Container>
    );
}
