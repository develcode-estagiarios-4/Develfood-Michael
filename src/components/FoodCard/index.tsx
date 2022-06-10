import React from 'react';
import { View } from 'react-native';
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
    description: string;
    foodType: {};
    id: number;
    photo_url: string;
    price: string;
    name: string;
}

export function FoodCard({name} : Props) {
    return (
        <Container>
            <ImageWrapper>
                <FoodImage source={require('@assets/icons/tasty.jpg')} />
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
                        <Price>R$ 29,90</Price>
                        <AddButton>
                            <Title>Adicionar</Title>
                        </AddButton>
                    </Footer>
                </View>
            </Wrapper>
        </Container>
    );
}
