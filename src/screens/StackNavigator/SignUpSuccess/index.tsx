import { Header } from '@components/Header';
import { Input } from '@components/Input';
import React, { useEffect, useState } from 'react';
import { Container, OkButton, StepsDoneImage, Subtitle, Title, Wrapper } from './styles';
import * as yup from 'yup';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Button } from '@components/Button';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { Keyboard, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export function SignUpSuccess() {

    const navigation = useNavigation();

    function handleConclude() {
        navigation.navigate('Login' as never);
    }

    return (
        <TouchableWithoutFeedback
            style={{ flex: 1 }}
            containerStyle={{ flex: 1 }}
            onPress={Keyboard.dismiss}
        >
            <Header
                source={require('@assets/icons/back-arrow.png')}
                onPress={() => {
                    navigation.goBack();
                }}
            />
            <Container>
                <StepsDoneImage
                    source={require('@assets/icons/CadastroFinalizado.png')}
                />
                <Wrapper>
                    <Title>Cadastro finalizado!</Title>
                    <Subtitle>
                        Parabéns! Agora você pode aproveitar nossas ofertas e
                        serviços e economizar com super cupons Develfood.
                    </Subtitle>
                </Wrapper>
                <OkButton
                    title="Concluir"
                    onPress={handleConclude}
                />
            </Container>
        </TouchableWithoutFeedback>
    );
}