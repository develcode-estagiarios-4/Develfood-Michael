import React from 'react';
import { Container, Price, Rect, Title, Icon } from './styles';

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
                <Price>{price}</Price>
            </Rect>
        </Container>
    );
}
