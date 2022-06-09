import React, { useState } from 'react';
import { ImageProps } from 'react-native';
import theme from '@styles/theme';
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
    Like,
    Button,
    LikeWrapper,
} from './styles';

interface ListRestaurantProps {
    name: string;
    source: ImageProps['source'];
}

export function Restaurants({ name, source }: ListRestaurantProps) {

     const [focused, setFocused] = useState(false);

    return (
        <Container>
            <LikeWrapper>
                <Button onPress={() => setFocused(!focused)}>
                    <Like source={require('@assets/icons/emptyHeart.png')} style={focused ? {tintColor: theme.colors.icon_red} : null}/>
                </Button>
            </LikeWrapper>

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
