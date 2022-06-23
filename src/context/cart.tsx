import { useNavigation } from '@react-navigation/native';
import { usePost } from '@services/usePost';
import React, {
    createContext,
    ReactNode,
    useContext,
    useEffect,
    useState,
} from 'react';
import { Alert, Text } from 'react-native';
import { string } from 'yup';
import { AuthContext } from './auth';

interface CartContextData {
    addItem: (item: CartItem) => void;
    removeItem: (item: CartItem) => void;
    itemQuantityTracker: (item: CartItem) => number;
    cartItems: CartItem[];
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
    const { token } = useContext(AuthContext);

    const [order, setOrder] = useState<Order>({} as Order);
    const [cartItems, setCartItems] = useState<CartItem[]>([]);

    function addItem(item: CartItem) {
        const itemFound = cartItems.find((cartItem) => cartItem.id === item.id);
        const fromOtherRestaurant = cartItems.find(
            (cartItem) => cartItem.restaurant !== item.restaurant
        );

        if (!fromOtherRestaurant)
            if (!itemFound) {
                cartItems.push(item);
                console.log(cartItems);
            } else {
                itemFound.count += item.count;
                itemFound.price = item.price * itemFound.count;
                console.log(cartItems);
            }
        else
            Alert.alert(
                'Restaurantes diferentes',
                'Você não pode adicionar itens de restaurantes diferentes'
            );
    }

    function removeItem(item: CartItem) {
        const itemFound = cartItems.find((cartItem) => cartItem.id === item.id);

        if (itemFound) {
            itemFound.count < 2
                ? cartItems.splice(cartItems.indexOf(itemFound), 1)
                : (itemFound.count -= 1);

            console.log(cartItems);
        }
    }

    function itemQuantityTracker(item: CartItem) {
        const itemFound = cartItems.find((cartItem) => cartItem.id === item.id);

        if (itemFound) {
            return itemFound.count;
        } else return 0;
    }
    

    return (
        <CartContext.Provider
            value={{ addItem, removeItem, itemQuantityTracker, cartItems }}
        >
            {children}
        </CartContext.Provider>
    );
}

export { CartProvider };
