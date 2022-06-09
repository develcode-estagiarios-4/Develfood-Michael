import React from 'react';
import {
    Container,
    FoodImage,
    Title,
    Description,
    AddButton,
    Price,
    Footer,
    Wrapper,
} from './styles';

export function FoodCard() {
    return (
        <Container>
            <FoodImage source={require('@assets/icons/tasty.jpg')} />
            <Wrapper>
                <Title>BigTasty</Title>
                <Description>
                    Delicioso sanduíche feito com pão, alface, queijo,
                    tomate, picles, e nosso famoso molho especial
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
