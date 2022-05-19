import { Header } from '@components/Header'
import React from 'react'
import { Container } from './styles'

export function Cadastro1({ navigation }: any) {
    return (
        <Container>
            <Header source={require('@assets/icons/back-arrow.png')} onPress={() => {navigation.pop()}}/>
        </Container>
    )
}