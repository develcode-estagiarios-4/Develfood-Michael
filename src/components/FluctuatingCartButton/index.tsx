import React, { useContext } from 'react';
import { Container, Price, Rect, Title, Icon, PriceWrapper } from './styles';

interface Props {
    price: string;
}
import basket from '../../assets/icons/basket.png';
import { CartContext } from '@context/cart';

export function FluctuatingCartButton({ price }: Props) {
    const {position} = useContext(CartContext);
    
    return (
        <Container style={{ bottom: position }}>
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
