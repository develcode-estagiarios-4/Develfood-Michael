import { useFetch } from '@services/useFetch';
import React, { useContext, useEffect } from 'react';
import { ImageSourcePropType, View } from 'react-native';
import { AuthContext } from '@context/auth';
import {
    Container,
    FoodImage,
    Title,
    Description,
    AddButton,
    Price,
    Footer,
    Wrapper,
    ImageWrapper,
} from './styles';

interface Props {
    foodType?: {
        id: number;
        name: string;
    };
    id?: number;
    link: any;
    price: string;
    name: string;
}

export function FoodCard({ name, price, link }: Props) {

    const {token} = useContext(AuthContext);

    const endpoint = link.slice(33);

    const { data, loading, error, fetchData } = useFetch(endpoint, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    async function loadImage() {
        
        await fetchData();
       
    }


    useEffect(() => {
        !!endpoint && loadImage();
    }, [endpoint]);

    return (
        <Container>
            <ImageWrapper>
                <FoodImage source={{ uri: data?.code }} />
            </ImageWrapper>

            <Wrapper>
                <View
                    style={{
                        width: '100%',
                        height: '25%',
                    }}
                >
                    <Title
                        ellipsizeMode="tail"
                        numberOfLines={1}
                    >
                        {name}
                    </Title>
                </View>
                <View
                    style={{
                        width: '100%',
                        height: '50%',
                    }}
                >
                    <Description
                        ellipsizeMode="tail"
                        numberOfLines={3}
                    >
                        Um prato de camarão com fritas é uma ótima opção para
                        pedir quando se está com a família.
                    </Description>
                </View>
                <View
                    style={{
                        width: '100%',
                        height: '30%',
                    }}
                >
                    <Footer>
                        <Price>R$ {price.toString().replace('.', ',')}</Price>
                        <AddButton>
                            <Title>Adicionar</Title>
                        </AddButton>
                    </Footer>
                </View>
            </Wrapper>
        </Container>
    );
}
