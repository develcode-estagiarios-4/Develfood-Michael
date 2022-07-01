import React, {
    useCallback,
    useContext,
    useEffect,
    useLayoutEffect,
    useState,
} from 'react';
import { SectionList, Text } from 'react-native';
import { AuthContext } from '@context/auth';
import { Container } from './styles';
import { useFetch } from '@services/useFetch';
import { PurchaseCard } from '@components/PurchaseCard';
import { useFocusEffect } from '@react-navigation/native';

interface FoodType {
    id: number;
    name: string;
}

interface Restaurant {
    id: number;
    name: string;
    photo_url: string;
    food_types: FoodType[];
}

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
    id: string;
    costumer: any;
    restaurant: Restaurant;
    date: string;
    dateLastUpdated: string;
    totalValue: number;
    paymentType: string;
    status: string;
    requestItems: RequestItems[];
}

interface Historic {
    content: Order[];
}

interface SectionListData {
    title: string;
    data: Order[];
}

export function Historic({ navigation }: any) {
    const { userId, token } = useContext(AuthContext);
    const [historic, setHistoric] = useState<Order[]>([]);
    const [historicSections, setHistoricSections] = useState<SectionListData[]>(
        []
    );

    let historicFormatted: SectionListData[] = [];

    const { data, fetchData } = useFetch<Historic>(
        `/request/costumer?id=${userId}&page=0&quantity=10`,
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    );

    async function loadOrders() {
        await fetchData();
        data && console.log('useeffect fetch data');
    }

    function renderItem({ item }: { item: Order }) {
        return item ? (
            <PurchaseCard
                restaurantName={item.restaurant.name}
                orderStatus={item.status}
                orderedItems={'item.requestItems[0].plate.price'}
            />
        ) : null;
    }

    function sectionDataFormatter(data: Order[]) {
        const historicFormatted: SectionListData[] = [];
        data.forEach((order: Order) => {
            const sectionFound = historicFormatted.find(
                (historicSection: SectionListData) =>
                    historicSection.title === order.date
            );
            if (sectionFound) {
                sectionFound.data.push(order);
                console.log('sectionFound');
            } else {
                historicFormatted.push({
                    title: order.date,
                    data: [order],
                });
                console.log('sectionNotFound');
            }
        });
        setHistoricSections(historicFormatted);
    }

    useFocusEffect(
        useCallback(() => {
            loadOrders();
        }, [])
    );

    useEffect(() => {
        data?.content && sectionDataFormatter(data.content);
    }, [data]);

    return (
        <Container>
            <Text style={{ fontSize: 36 }}>Histórico</Text>

            <SectionList
                sections={historicSections}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => renderItem({ item })}
                renderSectionHeader={({ section: { title } }) => (
                    <Text style={{ color: 'black' }}>{title}</Text>
                )}
                contentContainerStyle={{ backgroundColor: 'magenta' }}
            />
        </Container>
    );
}
