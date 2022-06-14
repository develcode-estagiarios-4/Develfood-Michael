import React from 'react';
import { ImageSourcePropType, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
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

interface Props {
    foodType?: {
        id: number;
        name: string;
    };
    id?: number;
    source: ImageSourcePropType;
    price: string;
    name: string;
}

export function FoodCard({name, price, source} : Props) {
    return (
        <Container>
            <ImageWrapper>
                <FoodImage source={source} />
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
                        height: '50%',
                    }}
                >
                    <Description
                        ellipsizeMode="tail"
                        numberOfLines={3}
                    >
                        Um prato de camarão com fritas é uma ótima opção para
                        pedir quando se está com a família.
                    </Description>
                </View>
                <View
                    style={{
                        width: '100%',
                        height: '30%',
                    }}
                >
                    <Footer>
                        <Price>R$ {price.toString().replace('.',',')}</Price>
                        <AddButton>
                            <Title>Adicionar</Title>
                        </AddButton>
                    </Footer>
                </View>
            </Wrapper>
        </Container>
    );
}
