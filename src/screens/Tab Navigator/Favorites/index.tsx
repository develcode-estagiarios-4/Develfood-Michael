import React from 'react'
import { Button, Text, View } from 'react-native'
import { Container } from './styles'

export function Favorites({ navigation }: any) {
    return (
        <Container>
            <Text style={{ fontSize: 36 }}>Favoritos</Text>
        </Container>
    )
}