import React, {
    useCallback,
    useContext,
    useEffect,
    useLayoutEffect,
    useState,
} from 'react';
import {
    ActivityIndicator,
    Alert,
    Animated,
    SectionList,
    StyleSheet,
    Text,
    View,
} from 'react-native';
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
import {
    useFocusEffect,
    useIsFocused,
    useScrollToTop,
} from '@react-navigation/native';
import theme from '@styles/theme';
import { Header } from '@components/Header';
import { EmptyFoodCardList } from '@components/EmptyFoodCardList';
import { RFValue } from 'react-native-responsive-fontsize';
import moment from 'moment';
import 'moment/locale/pt-br';

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

export function Historic() {
    const { userId, token } = useContext(AuthContext);
    const [historicSections, setHistoricSections] = useState<SectionListData[]>(
        []
    );
    const [page, setPage] = useState(0);
    const [order, setOrder] = useState<Order[]>([]);
    const [isRefreshing, setIsRefreshing] = useState(false);
    const [loading, setLoading] = useState(false);

    const { data, fetchData } = useFetch<Historic>(
        `/request/costumer?id=${userId}&page=${page}&quantity=20`,
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
        setLoading(true);
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
        <View style={{ marginTop: 20 }}>
            <Title>Histórico</Title>
        </View>
    );

    function renderSectionHeader({ title }: { title: string }) {
        return (
            <>
                <SectionHeader>
                    <SectionHeaderText>
                        {moment(title).format('llll').slice(0, -9)}
                    </SectionHeaderText>
                </SectionHeader>
            </>
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
           
                if (orderFound) {
                    const statusDiff = orderFound.status !== order.status;
                    const index = sectionFound.data.indexOf(orderFound);
                    statusDiff && sectionFound.data.splice(index, 1, order);
                } else sectionFound.data.push(order);
            } else {
                historicFormatted.push({
                    title: order.date,
                    data: [order],
                });
            }
        });

        historicFormatted.forEach((section) =>
            section.data.sort((a, b) => b.id - a.id)
        );
        setHistoricSections(historicFormatted);
        setLoading(false);
    }

    function refresh() {
        setOrder([]);
        setPage(0);
        loadOrders();
    }

    function handleLoadOnEnd() {
        if (data?.totalPages !== page + 1) {
            setPage(page + 1);
        }
    }

    const onRefresh = () => {
        setIsRefreshing(true);
        refresh();
    };

    const ref = React.useRef(null);

    useScrollToTop(ref);

    useLayoutEffect(() => {
        loadOrders();
    }, [page]);

    useFocusEffect(
        useCallback(() => {
            loadOrders();
            return () => {
                setLoading(true);
                setOrder([]);
                setHistoricSections([]);
                setPage(0);
            };
        }, [])
    );

    useEffect(() => {
        data?.content && sectionDataFormatter(order);
    }, [data]);

    return (
        <>
            <Header
                title="Meus pedidos"
                color={theme.colors.header}
                style={{ zIndex: 1 }}
            />
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
                    ListEmptyComponent={() =>
                        !loading ? <EmptyFoodCardList checkout /> : null
                    }
                    refreshing={isRefreshing}
                    onRefresh={() => onRefresh()}
                    ref={ref}
                    SectionSeparatorComponent={() => (
                        <ItemSeparator style={{ height: RFValue(15) }} />
                    )}
                    ListFooterComponent={() => (
                        <View style={{ height: RFValue(50) }}>
                            {loading && (
                                <ActivityIndicator
                                    style={{ alignSelf: 'center' }}
                                    color={theme.colors.primary}
                                />
                            )}
                        </View>
                    )}
                />
            </Container>
        </>
    );
}

const styles = StyleSheet.create({
    contentContainer: {
        backgroundColor: theme.colors.background,
        paddingHorizontal: 20,
    },
});
