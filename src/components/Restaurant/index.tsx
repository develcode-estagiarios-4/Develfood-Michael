import React, { useContext, useEffect, useState } from 'react';
import { ImageProps, TouchableOpacityProps } from 'react-native';
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

interface RestaurantProps extends TouchableOpacityProps{
    name: string;
    category: string;
    rating?: number;
    link: string;
    id: number;
}

interface Response {
    id: number;
    code: string;
}

export function Restaurants({ name, id, category, link, ...rest }: RestaurantProps) {
    const endpoint = link.slice(33);

    const { token } = useContext(AuthContext);

    const { data, loading, error, fetchData } = useFetch<Response>(endpoint, {
        headers: { Authorization: `Bearer ${token}` },
    });

    const {
        data: dataRating,
        loading: loadingRating,
        error: errorRating,
        fetchData: fetchRating,
    } = useFetch<number>(`/restaurantEvaluation/${id}/grade`, {
        headers: { Authorization: `Bearer ${token}` },
    });

    const [focused, setFocused] = useState(false);

    async function loadData() {
        await fetchData();
    }

    useEffect(() => {
        !!endpoint && loadData();
    }, [endpoint]);

    useEffect(() => {
        !!id && fetchRating();
    }, [id]);

    useEffect(() => {
        !!dataRating && console.log(dataRating);
    }, [dataRating]);

    function rating() {
        if (dataRating?.toString() === '[object Object]') {
            return '-';
        } else {
            return dataRating?.toString();
        }
    }

    return (
        <Container {...rest}>
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
                    data?.code
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
                        <Avaliation>{rating()}</Avaliation>
                    </AvaliationWrapper>
                </Description>
            </Content>
        </Container>
    );
}
