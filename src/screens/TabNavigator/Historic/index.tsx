import React, { useContext, useEffect, useLayoutEffect, useState } from 'react';
import { SectionList, Text } from 'react-native';
import { AuthContext } from '@context/auth';
import { Container } from './styles';
import { useFetch } from '@services/useFetch';
import { PurchaseCard } from '@components/PurchaseCard';

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
    }

    function renderItem({ item }: any) {
        return (
            <PurchaseCard
                restaurantName={item.restaurant.name}
                orderStatus={item.status}
                orderedItems={item.requestItems[0].plate.price}
            />
        );
    }

    useEffect(() => {
        loadOrders();
    }, []);

    useEffect(() => {
        if (data) {
            setHistoric(data.content);
        }
    }, [data]);

    useEffect(() => {
        historic.map((item) => {
            const itemFound = historicFormatted.find((section) =>  section.title === item.date);

            if (!itemFound) {
                historicFormatted.push({
                    title: item.date,
                    data: [item],
                });
            } else {
                itemFound.data.push(item);
            }
        });
    }, [historic]);

    useEffect(() => {
        console.log(historicFormatted);
    }, [historicFormatted]);

    return (
        <Container>
            <Text style={{ fontSize: 36 }}>Histórico</Text>
            <PurchaseCard
                restaurantName={'item.restaurant.name'}
                orderStatus={'item.status'}
                orderedItems={'item.requestItems[0].plate.price'}
            />
            <SectionList
                sections={historicFormatted}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => renderItem(item)}
                renderSectionHeader={({ section: {title} }) => (
                    <Text style={{color: 'black'}}>{title}</Text>
                )}
                contentContainerStyle={{ backgroundColor: 'magenta' }}
            />
        </Container>
    );
}
