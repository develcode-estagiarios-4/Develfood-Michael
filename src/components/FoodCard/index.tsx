import { useFetch } from '@services/useFetch';
import React, { useContext, useEffect } from 'react';
import {
    Dimensions,
    ImageSourcePropType,
    StyleSheet,
    View,
} from 'react-native';
import { AuthContext } from '@context/auth';
import {
    Container,
    FoodImage,
    Title,
    Description,
    AddButton,
    Price,
    Footer,
    Wrapper,
    ImageWrapper,
} from './styles';
import { RFValue, RFPercentage } from 'react-native-responsive-fontsize';
import theme from '@styles/theme';
import Animated, {
    FadeInLeft,
    FadeInRight,
} from 'react-native-reanimated';

interface Props {
    foodType?: {
        id: number;
        name: string;
    };
    id?: number;
    link: string;
    price: string;
    name: string;
    description: string;
}

interface Response {
    id: number;
    code: string;
}

export function FoodCard({ name, price, link, description }: Props) {
    const { token } = useContext(AuthContext);

    const endpoint = link.slice(33);

    const { data, loading, error, fetchData } = useFetch<Response>(endpoint, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    async function loadImage() {
        await fetchData();
    }

    function priceFormatter() {
        const priceWZeros = parseFloat(price).toFixed(2);
        const priceFormatted = priceWZeros.toString().replace('.', ',');
        return priceFormatted;
    }

    useEffect(() => {
        !!endpoint && loadImage();
    }, [endpoint]);

    return (
        <Animated.View
            style={styles.container}
            entering={FadeInRight}
        >
            <ImageWrapper>
                {!loading && (
                    <Animated.Image
                        source={
                            !!data
                                ? { uri: data?.code }
                                : require('@assets/icons/defaultRestaurant.png')
                        }
                        style={styles.image}
                        entering={FadeInLeft}
                    />
                )}
                <Animated.View style={styles.imageBackView}></Animated.View>
            </ImageWrapper>

            <Wrapper>
                <View
                    style={{
                        width: '100%',
                        height: '25%',
                    }}
                >
                    <Title
                        ellipsizeMode="tail"
                        numberOfLines={1}
                    >
                        {name}
                    </Title>
                </View>
                <View
                    style={{
                        width: '100%',
                        height: '53%',
                    }}
                >
                    <Description
                        ellipsizeMode="tail"
                        numberOfLines={3}
                    >
                        {description}
                    </Description>
                </View>
                <View
                    style={{
                        width: '100%',
                        height: '35%',
                    }}
                >
                    <Footer>
                        <Price>R$ {priceFormatter()}</Price>
                        <AddButton>
                            <Title>Adicionar</Title>
                        </AddButton>
                    </Footer>
                </View>
            </Wrapper>
        </Animated.View>
    );
}

const window = Dimensions.get('window');

const styles = StyleSheet.create({
    container: {
        width: window.width - RFValue(30),
        height: window.height * 0.15,
        flexDirection: 'row',
        backgroundColor: theme.colors.background,
        borderRadius: 15,
        alignItems: 'center',
        marginBottom: RFValue(12),
        alignSelf: 'center',
        elevation: 6,
    },
    image: {
        width: RFValue(85),
        height: RFValue(85),
        borderRadius: 15,
        zIndex: 1,
    },
    imageBackView: {
        width: RFValue(85),
        height: RFValue(85),
        borderRadius: 15,
        backgroundColor: '#DDD',
        position: 'absolute',
    },
});
