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

export function SignInSuccess({ navigation }: any) {
    const [hidePassword, setHidePassword] = useState(false);
    const [hideConfirmPassword, setHideConfirmPassword] = useState(false);
    const [enableConfirmPassword, setEnableConfirmPassword] = useState(false);

    const schema = yup.object().shape({
        email: yup
            .string()
            .email('Por favor, insira um email válido')
            .required('O email é obrigatório'),
        password: yup.string().required('A senha é obrigatória'),
        confirmPassword: yup
            .string()
            .oneOf([yup.ref('password'), null], 'As senhas não coincidem')
            .required('A senha é obrigatória'),
    });

    function handleConclude() {
        navigation.pop('');
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
                    navigation.pop();
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
