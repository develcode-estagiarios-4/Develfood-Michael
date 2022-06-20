import React, { useContext, useEffect, useState } from 'react';
import { ImageProps, StyleSheet, TouchableOpacityProps } from 'react-native';
import theme from '../../styles/theme';
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
import { AuthContext } from '../../context/auth';
import { useFetch } from '@services/useFetch';
import { RFValue } from 'react-native-responsive-fontsize';
import Animated, { FadeIn } from 'react-native-reanimated';

interface RestaurantProps {
    name: string;
    category: string;
    rating?: number;
    link: string;
    id: number;
    onPress: () => void;
}

interface Response {
    id: number;
    code: string;
}

export function Restaurants({
    name,
    id,
    category,
    link,
    onPress,
}: RestaurantProps) {
    const logoRest = theme.images.default;
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

    function rating() {
        if (dataRating?.toString() === undefined) {
            return '-';
        } else {
            return dataRating?.toString();
        }
    }

    return (
        <Container onPress={onPress}>
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

            {!loading && (
                <Animated.Image
                    entering={FadeIn.delay(100).duration(700)}
                    style={styles.restImage}
                    source={data?.code ? { uri: data?.code } : logoRest}
                />
            )}

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

const styles = StyleSheet.create({
    restImage: {
        width: '100%',
        height: undefined,
        aspectRatio: 1,
        borderRadius: RFValue(15),
        resizeMode: 'cover',
    },
});
