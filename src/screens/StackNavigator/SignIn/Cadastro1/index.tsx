import { Header } from '@components/Header';
import { Input } from '@components/Input';
import React, { useEffect, useState } from 'react';
import { Container, NextButton, StepsDoneImage, Wrapper } from './styles';
import * as yup from 'yup';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Button } from '@components/Button';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { Keyboard } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import theme from '@styles/theme';

export function Cadastro1({ route }: any) {
    const [hidePassword, setHidePassword] = useState(false);
    const [hideConfirmPassword, setHideConfirmPassword] = useState(false);
    const [enableConfirmPassword, setEnableConfirmPassword] = useState(false);

    const navigation = useNavigation();

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

    const {
        control,
        handleSubmit,
        getValues, // pega os valores do input
        formState: { errors },
        reset,
        setValue,
        clearErrors,
    } = useForm({
        resolver: yupResolver(schema),
    });

    function handleContinue() {
        const values = getValues();

        navigation.navigate(
            'Cadastro1' as never,
            {
                email: values.email,
                password: values.password,
            } as never
        );
    }

    return (
        <TouchableWithoutFeedback
            style={{ flex: 1 }}
            containerStyle={{ flex: 1 }}
            onPress={Keyboard.dismiss}
        >
            <Container>
                <Header
                    color={theme.colors.headerSecondary}
                    source={require('@assets/icons/back.png')}
                    onPress={() => {
                        navigation.goBack();
                    }}
                    title={'Cadastro'}
                />
                <StepsDoneImage
                    source={require('@assets/icons/cadastroConcluido0.png')}
                />
                <Wrapper>
                    <Controller
                        control={control}
                        render={({ field: { onChange, value } }) => (
                            <Input
                                name={'email'}
                                control={control}
                                error={errors.email && errors.email.message}
                                keyboardType="email-address"
                                source={require('@assets/icons/mail.png')}
                                placeholder={'exemplo@email.com'}
                                value={value}
                                onChangeText={onChange}
                                autoCapitalize="none"
                            />
                        )}
                        name={'email'}
                    />
                    <Controller
                        control={control}
                        render={({ field: { onChange, value } }) => (
                            <Input
                                name={'password'}
                                control={control}
                                onChangeText={onChange}
                                value={value}
                                error={
                                    errors.password && errors.password.message
                                }
                                secureTextEntry={!hidePassword}
                                autoCapitalize="none"
                                source={require('@assets/icons/lock.png')}
                                placeholder={'senha'}
                                source2={
                                    hidePassword
                                        ? require('@assets/icons/eye.png')
                                        : require('@assets/icons/eyeCrossed.png')
                                }
                                onEndEditing={(e) => {
                                    !!e.nativeEvent.text
                                        ? setEnableConfirmPassword(true)
                                        : setEnableConfirmPassword(false);
                                }}
                                onPress={() => {
                                    setHidePassword(!hidePassword);
                                }}
                                //editable={!loading}
                            />
                        )}
                        name={'password'}
                    />

                    <Controller
                        control={control}
                        render={({ field: { onChange, value } }) => (
                            <Input
                                name={'confirmPassword'}
                                control={control}
                                value={value}
                                onChangeText={onChange}
                                error={
                                    errors.confirmPassword &&
                                    errors.confirmPassword.message
                                }
                                secureTextEntry={!hideConfirmPassword}
                                autoCapitalize="none"
                                source={require('@assets/icons/lock.png')}
                                placeholder={'confirmar senha'}
                                source2={
                                    hideConfirmPassword
                                        ? require('@assets/icons/eye.png')
                                        : require('@assets/icons/eyeCrossed.png')
                                }
                                onPress={() => {
                                    setHideConfirmPassword(
                                        !hideConfirmPassword
                                    );
                                }}
                                editable={enableConfirmPassword}
                            />
                        )}
                        name={'confirmPassword'}
                    />

                    <NextButton
                        title="Continuar"
                        onPress={handleSubmit(handleContinue)}
                    />
                </Wrapper>
            </Container>
        </TouchableWithoutFeedback>
    );
}
