import React, {
    useCallback,
    useContext,
    useEffect,
    useLayoutEffect,
    useState,
} from 'react';
import { SectionList, StyleSheet, Text } from 'react-native';
import { AuthContext } from '@context/auth';
import {
    Container,
    ItemSeparator,
    SectionHeader,
    SectionHeaderText,
} from './styles';
import { useFetch } from '@services/useFetch';
import { PurchaseCard } from '@components/PurchaseCard';
import { useFocusEffect } from '@react-navigation/native';
import theme from '@styles/theme';

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

interface PlateDTO {
    id: number;
    name: string;
    description: string;
    price: number;
    foodType: FoodType;
    restaurantName: string;
    photo_url: string;
}

interface RequestItems {
    id: number;
    plateDTO: PlateDTO;
    quantity: number;
    price: number;
    observation: string;
}

interface Order {
    id: number;
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
    totalPages: number;
}

interface SectionListData {
    title: string;
    data: Order[];
}

export function Historic({ navigation }: any) {
    const { userId, token } = useContext(AuthContext);
    const [historicSections, setHistoricSections] = useState<SectionListData[]>(
        []
    );

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
        const orderedItems = item.requestItems.map(
            (requestItem: RequestItems) => {
                const lastItem = item.requestItems.length - 1;
                return item.requestItems.indexOf(requestItem) === lastItem
                    ? `${requestItem.quantity} ${requestItem.plateDTO.name}`
                    : `${requestItem.quantity} ${requestItem.plateDTO.name} + `;
            }
        );

        return item ? (
            <PurchaseCard
                restaurantName={item.restaurant.name}
                orderStatus={item.status}
                orderId={item.id}
                orderedItems={orderedItems}
            />
        ) : null;
    }

    function renderSectionHeader({ title }: { title: string }) {
        return (
            <SectionHeader>
                <SectionHeaderText>{title}</SectionHeaderText>
            </SectionHeader>
        );
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
                renderSectionHeader={({ section: { title } }) =>
                    renderSectionHeader({ title })
                }
                contentContainerStyle={styles.contentContainer}
                ItemSeparatorComponent={() => <ItemSeparator />}
            />
        </Container>
    );
}

const styles = StyleSheet.create({
    contentContainer: {
        backgroundColor: theme.colors.background_red,
        paddingHorizontal: 20,
    },
});
