import React from 'react'
import { Text } from 'react-native'
import { Header } from '@components/Header'
import { Container } from './styles'

export function RestaurantPage({ navigation, route }: any) {
    
    const {id, name, photo} = route.params

    return (
        <Container>
            <Header
                source={require('@assets/icons/back.png')}
                source2={require('@assets/icons/emptyHeart.png')}
                onPress={() => navigation.pop()}
            />
            <Text>RestaurantPage</Text>
            <Text>
                Restaurante: {name} ID: {id} photo: {photo}
            </Text>
        </Container>
    );
}