import React, { useContext, useEffect, useState } from 'react';
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
import { AuthContext } from '@context/auth';
import { useFetch } from '@services/useFetch';

interface ListRestaurantProps {
    name: string;
    category: string;
    rating?: number;
    link: string;
}

interface Response {
    code: string;
    if: number;
}

export function Restaurants({
    name,
    rating,
    category,
    link,
}: ListRestaurantProps) {
    const endpoint = link.slice(33);

    const { token } = useContext(AuthContext);

    const { data, loading, error, fetchData } = useFetch<Response>(endpoint, {
        headers: { Authorization: `Bearer ${token}` },
    });

    const [focused, setFocused] = useState(false);

    async function loadData() {
        await fetchData();
    }

    useEffect(() => {
        !!endpoint && loadData();
    }, [endpoint]);

    return (
        <Container>
            <LikeWrapper>
                <Button onPress={() => setFocused(!focused)}>
                    <Like
                        source={require('@assets/icons/emptyHeart.png')}
                        style={
                            focused
                                ? { tintColor: theme.colors.icon_red }
                                : null
                        }
                    />
                </Button>
            </LikeWrapper>

            <RestaurantImage
                source={
                    data.code
                        ? { uri: data?.code }
                        : require('@assets/icons/defaultRestaurant.png')
                }
            />

            <Content>
                <Title>{name}</Title>

                <Description>
                    <SubTitle>{category}</SubTitle>

                    <AvaliationWrapper>
                        <Star source={require('@assets/icons/star.png')} />
                        <Avaliation>{Math.ceil(Math.random() * 5)}</Avaliation>
                    </AvaliationWrapper>
                </Description>
            </Content>
        </Container>
    );
}
