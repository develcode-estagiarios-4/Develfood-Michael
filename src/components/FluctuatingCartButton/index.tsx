import React, { useContext } from 'react';
import { Container, Price, Rect, Title, Icon, PriceWrapper } from './styles';
import basket from '../../assets/icons/basket.png';
import { CartContext } from '@context/cart';
import { RFValue } from 'react-native-responsive-fontsize';

export function FluctuatingCartButton() {
    const {position, price} = useContext(CartContext);
    
    return (
        <Container style={{ bottom: RFValue(position) }}>
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
