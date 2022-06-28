import React, { createContext, ReactNode, useEffect, useState } from 'react';
import { Alert } from 'react-native';
import {
    Easing,
    useAnimatedStyle,
    useSharedValue,
    withTiming,
} from 'react-native-reanimated';
interface CartContextData {
    addItem: (item: CartItem) => void;
    removeItem: (item: CartItem) => void;
    deleteFromCart: (item: CartItem) => void;
    cartCleanup: (item: CartItem) => void;
    setNewPosition: (position: number) => void;
    deleteCart: () => void;
    cartAnimation: object;
    cartItems: CartItem[];
    totalAmount: { quantity: number; price: number };
    price: string;
    restaurant: Restaurant;
}

type Restaurant = {
    name: string;
    id: number;
    image: string;
    type: string;
};

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

export type CartItem = {
    id: number;
    restaurantID: number;
    count: number;
    individualPrice: number;
    foodTitle: string;
    foodDescription: string;
    foodImage: string;
    restaurantName: string;
    restaurantImage: string;
    restaurantType: string;
};

type TotalAmount = {
    quantity: number;
    price: number;
};

export const CartContext = createContext({} as CartContextData);

function CartProvider({ children }: CartProviderProps) {
    const [cartItems, setCartItems] = useState<CartItem[]>([]);
    const [restaurant, setRestaurant] = useState({
        name: '',
        id: 0,
        image: '',
        type: [],
    });
    const [totalAmount, setTotalAmount] = useState<TotalAmount>({
        quantity: 0,
        price: 0,
    });

    const price = totalAmount.price.toLocaleString('pt-BR', {
        minimumFractionDigits: 2,
        style: 'currency',
        currency: 'BRL',
    });

    function addItem(item: CartItem) {
        const itemFound = cartItems.find((cartItem) => cartItem.id === item.id);
        const fromOtherRestaurant = cartItems.find(
            (cartItem) => cartItem.restaurantID !== item.restaurantID
        );

        if (!fromOtherRestaurant) {
            if (!itemFound) {
                cartItems.push(item);
                setRestaurant({
                    name: item.restaurantName,
                    id: item.restaurantID,
                    image: item.restaurantImage,
                    type: item.restaurantType,
                });

                //console.log(cartItems);
            } else {
                itemFound.count += item.count;
                //console.log(cartItems);
            }
            setTotalAmount({
                quantity: totalAmount.quantity + 1,
                price: totalAmount.price + item.individualPrice,
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
                price: totalAmount.price - itemFound.individualPrice,
            });
            //console.log(cartItems);
        }
    }

    function deleteFromCart(item: CartItem) {
        const itemFound = cartItems.find((cartItem) => cartItem.id === item.id);

        if (itemFound) {
            cartItems.splice(cartItems.indexOf(itemFound), 1);
            setTotalAmount({
                quantity: totalAmount.quantity - itemFound.count,
                price:
                    totalAmount.price -
                    itemFound.individualPrice * itemFound.count,
            });
            //console.log(cartItems);
        }
    }

    function deleteCart() {
        cartItems.splice(0, cartItems.length);
        setTotalAmount({
            quantity: 0,
            price: 0,
        });
    }

    function cartCleanup(item: CartItem) {
        cartItems.splice(0, cartItems.length, item);
        setTotalAmount({ quantity: 1, price: item.individualPrice });
    }

    const offsetY = useSharedValue(0);

    const cartAnimation = useAnimatedStyle(() => {
        return {
            transform: [{ translateY: offsetY.value }],
        };
    });

    function setNewPosition(position: number) {
        offsetY.value = withTiming(position, {
            duration: 450,
            easing: Easing.bezierFn(0.3, 0.35, 0.03, 0.75),
        });
    }

    useEffect(() => {
        console.log(totalAmount);
    }, [totalAmount]);

    return (
        <CartContext.Provider
            value={{
                addItem,
                removeItem,
                deleteFromCart,
                setNewPosition,
                cartCleanup,
                deleteCart,
                cartItems,
                totalAmount,
                price,
                cartAnimation,
                restaurant,
            }}
        >
            {children}
        </CartContext.Provider>
    );
}

export { CartProvider };
