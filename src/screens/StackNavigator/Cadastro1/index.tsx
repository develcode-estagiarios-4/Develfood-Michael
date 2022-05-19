import { Header } from '@components/Header'
import React from 'react'
import { Container, StepsDoneImage } from './styles'

export function Cadastro1({ navigation }: any) {
    return (
        <Container>
            <Header source={require('@assets/icons/back-arrow.png')} onPress={() => { navigation.pop() }} />
            <StepsDoneImage source={require('@assets/icons/cadastroConcluido0.png')}/>
        </Container>
    )
}