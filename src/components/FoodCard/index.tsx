import React from 'react';
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
    DescriptionWrapper,
    ImageWrapper,
} from './styles';

export function FoodCard() {
    return (
        <Container>
            <ImageWrapper>
                <FoodImage source={require('@assets/icons/tasty.jpg')} />
            </ImageWrapper>

            <Wrapper>
                <Title
                    ellipsizeMode="tail"
                    numberOfLines={1}
                >
                    Camarão com fritas
                </Title>

                <Description
                    ellipsizeMode="tail"
                    numberOfLines={3}
                >
                    Um prato de camarão com fritas é uma ótima opção para pedir
                    quando se está com a família.
                </Description>

                <Footer>
                    <Price>R$ 29,90</Price>
                    <AddButton>
                        <Title>Adicionar</Title>
                    </AddButton>
                </Footer>
            </Wrapper>
        </Container>
    );
}
