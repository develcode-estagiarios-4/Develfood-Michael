import React, {
    useCallback,
    useContext,
    useEffect,
    useLayoutEffect,
    useState,
} from 'react';
import { Alert, SectionList, StyleSheet, Text, View } from 'react-native';
import { AuthContext } from '@context/auth';
import {
    Container,
    ItemSeparator,
    SectionHeader,
    SectionHeaderText,
    Title,
} from './styles';
import { useFetch } from '@services/useFetch';
import { PurchaseCard } from '@components/PurchaseCard';
import { useFocusEffect, useScrollToTop } from '@react-navigation/native';
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
    const [page, setPage] = useState(0);
    const [order, setOrder] = useState<Order[]>([]);
    const [isRefreshing, setIsRefreshing] = useState(false);

    const { data, fetchData } = useFetch<Historic>(
        `/request/costumer?id=${userId}&page=${page}&quantity=10`,
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    );

    function onSuccess(data: Historic) {
        setOrder([...order, ...data.content]);
        setIsRefreshing(false);
    }

    async function loadOrders() {
        console.log('FETCHING DATA...', page);
        await fetchData(onSuccess);
    }

    function renderItem({ item }: { item: Order }) {
        const orderedItems = item.requestItems.map(
            (requestItem: RequestItems) => {
                const lastItem = item.requestItems.length - 1;
                return item.requestItems.indexOf(requestItem) === lastItem
                    ? `${requestItem.quantity > 1 ? requestItem.quantity : ''}${
                          requestItem.quantity > 1 ? ' ' : ''
                      }${requestItem.plateDTO.name}`
                    : `${requestItem.quantity > 1 ? requestItem.quantity : ''}${
                          requestItem.quantity > 1 ? ' ' : ''
                      }${requestItem.plateDTO.name} + `;
            }
        );

        return item ? (
            <PurchaseCard
                restaurantName={item.restaurant.name}
                orderStatus={item.status}
                orderId={item.id}
                orderedItems={orderedItems}
                restaurantImage={item.restaurant.photo_url}
            />
        ) : null;
    }

    const listheadeComponent = (
        <View style={{ marginBottom: -12, marginTop: 16 }}>
            <Title>Histórico</Title>
        </View>
    );

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
                const orderFound = sectionFound.data.find(
                    (item) => item.id === order.id
                );
                !orderFound && sectionFound.data.push(order); //IMPORTANTE, so vai colocar o pedido dentro do sectiondata se nao ja conter o mesmo pedido
            } else {
                historicFormatted.push({
                    title: order.date,
                    data: [order],
                });
                console.log(
                    'sectionNotFound, pushing new section into sectionlist'
                );
            }
        });
        setHistoricSections(historicFormatted);
    }

    function clearAll() {
        if (page !== 0) {
            setOrder([]);
            setHistoricSections([]);
            setPage(0);
        } else {
            setTimeout(() => {
                setIsRefreshing(false);
            }, 500);
        }
    }

    function handleLoadOnEnd() {
        if (data?.totalPages !== page + 1) {
            setPage(page + 1);
        }
    }

    const onRefresh = () => {
        clearAll();
        setIsRefreshing(true);
    };

    const ref = React.useRef(null);
    useScrollToTop(ref);

    useEffect(() => {
        loadOrders();
    }, [page]);

    useFocusEffect(
        useCallback(() => {
            setOrder([]);
            setHistoricSections([]);
            setTimeout(() => {
                setPage(0);
                loadOrders();
            }, 1000);
        }, [])
    );

    useEffect(() => {
        data?.content && sectionDataFormatter(order);
        data?.content && console.log('DATA FETCHED', page);
    }, [data]);

    return (
        <Container>
            <SectionList
                sections={historicSections}
                keyExtractor={(item) => String(item.id)}
                ListHeaderComponent={() => listheadeComponent}
                renderItem={({ item }) => renderItem({ item })}
                renderSectionHeader={({ section: { title } }) =>
                    renderSectionHeader({ title })
                }
                onEndReached={handleLoadOnEnd}
                contentContainerStyle={styles.contentContainer}
                ItemSeparatorComponent={() => <ItemSeparator />}
                refreshing={isRefreshing}
                onRefresh={() => onRefresh()}
                ref={ref}
            />
        </Container>
    );
}

const styles = StyleSheet.create({
    contentContainer: {
        backgroundColor: theme.colors.background,
        paddingHorizontal: 20,
    },
});
