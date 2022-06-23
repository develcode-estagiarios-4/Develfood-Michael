import React, { useContext } from 'react'
import { CartContext } from '@context/cart';

export function AddOrRemoveButton() {

    const { addItem, removeItem, cartItems, totalItemsAmount } =
        useContext(CartContext);

    return (
        <Container>
            <AddButton onPress={() => addItem(id)}>
        </Container>
    )
}