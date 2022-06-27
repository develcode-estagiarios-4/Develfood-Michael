import React, { createContext, ReactNode, useEffect, useState } from 'react';
import { Alert, ViewComponent } from 'react-native';
import {
    AnimatedStyleProp,
    AnimateStyle,
    TransformStyleTypes,
    useAnimatedStyle,
    useSharedValue,
    withSpring,
    withTiming,
} from 'react-native-reanimated';
import { AnimatedStyle } from 'react-native-reanimated/lib/types/lib/reanimated2/commonTypes';
import { TransformFunction } from 'yup/lib/types';

interface CartContextData {
    addItem: (item: CartItem) => void;
    removeItem: (item: CartItem) => void;
    deleteFromCart: (item: CartItem) => void;
    cartCleanup: (item: CartItem) => void;
    setNewPosition: (position: number) => void;
    cartAnimation: object;
    cartItems: CartItem[];
    totalAmount: { quantity: number; price: number };
    price: string;
}

interface Order {
    costumer: { id: number };
    restaurant: { id: number };
    date: Date;
    dateLastUpdated: Date;
    totalValue: number;
    paymentType: string;
    status: string;
    requestItems: [
        {
            plate: {
                id: number;
                price: number;
            };
            quantity: number;
            price: number;
            observation: string;
        }
    ];
    restaurantPromotion: null;
}

interface CartProviderProps {
    children: ReactNode;
}

type CartItem = {
    id: number;
    price: number;
    restaurant: string;
    count: number;
};

export const CartContext = createContext({} as CartContextData);

function CartProvider({ children }: CartProviderProps) {
    const [cartItems, setCartItems] = useState<CartItem[]>([]);
    const [totalAmount, setTotalAmount] = useState({ quantity: 0, price: 0 });

    const price = totalAmount.price.toLocaleString('pt-BR', {
        minimumFractionDigits: 2,
        style: 'currency',
        currency: 'BRL',
    });

    function addItem(item: CartItem) {
        const itemFound = cartItems.find((cartItem) => cartItem.id === item.id);
        const fromOtherRestaurant = cartItems.find(
            (cartItem) => cartItem.restaurant !== item.restaurant
        );

        if (!fromOtherRestaurant) {
            if (!itemFound) {
                cartItems.push(item);

                console.log(cartItems);
            } else {
                itemFound.count += item.count;
                itemFound.price = item.price * itemFound.count;

                console.log(cartItems);
            }
            setTotalAmount({
                quantity: totalAmount.quantity + 1,
                price: totalAmount.price + item.price,
            });
        } else
            Alert.alert(
                'Você já tem itens adicionados na sua sacola',
                'Deseja limpar o carrinho e adicionar este item?',
                [
                    {
                        text: 'Cancelar',
                        onPress: () => {
                            Alert.prompt;
                        },
                    },
                    {
                        text: 'Adicionar',
                        onPress: () => {
                            cartCleanup(item);
                        },
                    },
                ]
            );
    }

    function removeItem(item: CartItem) {
        const itemFound = cartItems.find((cartItem) => cartItem.id === item.id);

        if (itemFound) {
            itemFound.count < 2
                ? cartItems.splice(cartItems.indexOf(itemFound), 1)
                : (itemFound.count -= 1);
            setTotalAmount({
                quantity: totalAmount.quantity - 1,
                price: totalAmount.price - item.price,
            });
            console.log(cartItems);
        }
    }

    function deleteFromCart(item: CartItem) {
        const itemFound = cartItems.find((cartItem) => cartItem.id === item.id);

        if (itemFound) {
            cartItems.splice(cartItems.indexOf(itemFound), 1);
            setTotalAmount({
                quantity: totalAmount.quantity - itemFound.count,
                price: totalAmount.price - itemFound.price,
            });
            console.log(cartItems);
        }
    }

    function cartCleanup(item: CartItem) {
        cartItems.splice(0, cartItems.length, item);
        setTotalAmount({ quantity: 1, price: item.price });
        console.log(cartItems);
    }

    const offsetY = useSharedValue(0);

    const cartAnimation = useAnimatedStyle(() => {
        return {
            transform: [{ translateY: offsetY.value }],
        };
    });

    function setNewPosition(position: number) {
        offsetY.value = withTiming(position);
    }

    useEffect(() => {
        console.log(totalAmount);
    }, [totalAmount]);

    useEffect(() => {
        console.log(cartItems.length);
    }, [cartItems]);

    return (
        <CartContext.Provider
            value={{
                addItem,
                removeItem,
                deleteFromCart,
                setNewPosition,
                cartCleanup,
                cartItems,
                totalAmount,
                price,
                cartAnimation,
            }}
        >
            {children}
        </CartContext.Provider>
    );
}

export { CartProvider };
