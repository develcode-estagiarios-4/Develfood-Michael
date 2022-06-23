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
    deleteFromCart: (item: CartItem) => void;
    cartItems: CartItem[];
    totalAmount: { quantity: number; price: number };
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
    const [totalAmount, setTotalAmount] = useState({ quantity: 0, price: 0 });

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
            setTotalAmount({
                quantity: totalAmount.quantity - 1,
                price: totalAmount.price - item.price,
            });
            console.log(cartItems);
        }
    }

    function deleteFromCart(item: CartItem) {
        const itemFound = cartItems.find((cartItem) => cartItem.id === item.id);

        itemFound && cartItems.splice(cartItems.indexOf(itemFound), 1);
        console.log(cartItems);
    }

    useEffect(() => {
        console.log('total: ', totalAmount);
    }, [totalAmount]);

    return (
        <CartContext.Provider
            value={{
                addItem,
                removeItem,
                deleteFromCart,
                cartItems,
                totalAmount,
            }}
        >
            {children}
        </CartContext.Provider>
    );
}

export { CartProvider };
