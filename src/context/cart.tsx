import { usePost } from '@services/usePost';
import React, {
    createContext,
    ReactNode,
    useContext,
    useEffect,
    useState,
} from 'react';
import { Alert } from 'react-native';
import {
    Easing,
    useAnimatedStyle,
    useSharedValue,
    withTiming,
} from 'react-native-reanimated';
import { AuthContext } from './auth';
interface CartContextData {
    addItem: (item: CartItem) => void;
    removeItem: (item: CartItem) => void;
    deleteFromCart: (item: CartItem) => void;
    cartCleanup: (item: CartItem) => void;
    setNewPosition: (position: number) => void;
    deleteCart: () => void;
    postOrder: () => void;
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

interface RequestItems {
    plate: {
        id: number;
        price: number;
    };
    quantity: number;
    price: number;
    observation: string;
}

interface Order {
    costumer: { id: number };
    restaurant: { id: number };
    date: () => string;
    dateLastUpdated: () => string;
    totalValue: number;
    paymentType: string;
    status: string;
    requestItems: RequestItems[];
    restaurantPromotion: { id: number } | null;
}

interface AddressRequest {
    street: string;
    number: string;
    neighborhood: string;
    city: string;
    zipCode: string;
    state: string;
    nickname: string;
}

interface CostumerRequest {
    id: number;
    firstName: string;
    lastName: string;
    address: AddressRequest;
    photo_url: string;
}
interface OrderResponse {
    id: number;
    costumer: CostumerRequest;
    restaurant: { food_types: string[] };
    date: Date;
    dateLastUpdate: Date;
    totalValue: number;
    paymentType: string;
    status: string;
    requestItems: RequestItems[];
    quantity: number;
    price: number;
    observation: string;
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
        type: '',
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

    const { token, userId } = useContext(AuthContext);

    const requestItems = cartItems?.map((item) => {
        return {
            plate: {
                id: item.id,
                price: item.individualPrice,
            },
            quantity: item.count,
            price: item.individualPrice * item.count,
            observation: '',
        };
    });

    const date = new Date().toISOString;

    const { handlePost } = usePost<Order, OrderResponse>(
        '/request',
        {
            costumer: { id: userId },
            restaurant: { id: restaurant.id },
            date: date,
            dateLastUpdated: date,
            totalValue: totalAmount.price,
            paymentType: 'card',
            status: 'PEDIDO_REALIZADO',
            requestItems: requestItems,
            restaurantPromotion: null,
        },
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    );

    function addItem(item: CartItem) {
        const itemFound = cartItems?.find(
            (cartItem) => cartItem.id === item.id
        );
        const fromOtherRestaurant = cartItems?.find(
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

            } else {
                itemFound.count += item.count;
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
        const itemFound = cartItems?.find(
            (cartItem) => cartItem.id === item.id
        );

        if (itemFound) {
            itemFound.count < 2
                ? cartItems.splice(cartItems.indexOf(itemFound), 1)
                : (itemFound.count -= 1);
            setTotalAmount({
                quantity: totalAmount.quantity - 1,
                price: totalAmount.price - itemFound.individualPrice,
            });
        }
    }

    function deleteFromCart(item: CartItem) {
        const itemFound = cartItems?.find(
            (cartItem) => cartItem.id === item.id
        );

        if (itemFound) {
            cartItems.splice(cartItems.indexOf(itemFound), 1);
            setTotalAmount({
                quantity: totalAmount.quantity - itemFound.count,
                price:
                    totalAmount.price -
                    itemFound.individualPrice * itemFound.count,
            });
        }
    }

    function deleteCart() {
        cartItems.splice(0, cartItems.length);
        setTotalAmount({
            quantity: 0,
            price: 0,
        });
        setRestaurant({ name: '', id: 0, image: '', type: '' });
    }

    function cartCleanup(item: CartItem) {
        cartItems.splice(0, cartItems.length, item);
        setTotalAmount({ quantity: 1, price: item.individualPrice });
        setRestaurant({ name: '', id: 0, image: '', type: '' });
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

    async function postOrder() {
        await handlePost('Erro', 'danger', 'Erro ao realizar pedido');
        deleteCart();
    }

    useEffect(() => {
        console.log(requestItems);
    }, [requestItems]);

    return (
        <CartContext.Provider
            value={{
                addItem,
                removeItem,
                deleteFromCart,
                setNewPosition,
                cartCleanup,
                deleteCart,
                postOrder,
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
