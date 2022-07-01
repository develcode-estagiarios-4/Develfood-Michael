import { Button } from '@components/Button';
import { Header } from '@components/Header';
import { useNavigation } from '@react-navigation/native';
import React from 'react';
import theme from '@styles/theme';
import { Container, Image, Subtitle, Title } from './styles';

export function CheckoutSuccess() {
    const navigation = useNavigation();
    
    return (
        <>
        <Header color={theme.colors.header} source={theme.images.x} title='Checkout'/>
            <Container>
                <Title>Pedido realizado!</Title>
                <Image source={require('@assets/icons/checkoutSuccess.png')} />
                <Subtitle>
                    Agradecemos a preferência! Em breve você receberá
                    atualizações sobre o status do seu pedido.
                </Subtitle>
                <Button
                    title="Ver o pedido"
                    onPress={() => navigation.navigate('Orders')}
                />
            </Container>
        </>
    );
}
