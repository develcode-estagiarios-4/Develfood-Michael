import React from 'react';
import { Container, Price, Rect, Title, Icon, PriceWrapper } from './styles';

interface Props {
    price: string;
}
import basket from '../../assets/icons/basket.png';

export function FluctuatingCartButton({ price }: Props) {
    return (
        <Container>
            <Rect>
                <Icon source={basket} />
                <Title>Ver carrinho</Title>
                <PriceWrapper>
                    <Price>{price}</Price>
                </PriceWrapper>
            </Rect>
        </Container>
    );
}
