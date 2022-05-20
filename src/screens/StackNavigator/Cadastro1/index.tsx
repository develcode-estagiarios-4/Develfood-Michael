import { Header } from '@components/Header';
import { Input } from '@components/Input';
import React, { useEffect, useState } from 'react';
import { Container, StepsDoneImage, Wrapper } from './styles';
import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Button } from '@components/Button';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { Keyboard } from 'react-native';

export function Cadastro1({ navigation }: any) {
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

    useEffect(() => {
        setValue('email', 'seunome@email.com', { shouldValidate: true });
        setValue('password', '123456');
        setValue('confirmPassword', '123456');
    }, []);

    function handleContinue() {
        // let email = getValues('email');
        // let password = getValues('password');
        // let confirmPassword = getValues('confirmPassword');

        navigation.push('Cadastro1');
    }

    return (
        <TouchableWithoutFeedback
            style={{ flex: 1 }}
            containerStyle={{ flex: 1 }}
            onPress={Keyboard.dismiss}
        >
            <Container>
                <Header
                    source={require('@assets/icons/back-arrow.png')}
                    onPress={() => {
                        navigation.pop();
                    }}
                />
                <StepsDoneImage
                    source={require('@assets/icons/cadastroConcluido0.png')}
                />
                <Wrapper>
                    <Input
                        name={'email'}
                        control={control}
                        error={errors.email && errors.email.message}
                        keyboardType="email-address"
                        source={require('@assets/icons/mail.png')}
                        placeholder={'exemplo@email.com'}
                        defaultValue={'seunome@email.com'}
                        //editable={!loading}
                    />
                    <Input
                        name={'password'}
                        control={control}
                        error={errors.password && errors.password.message}
                        secureTextEntry={!hidePassword}
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
                        defaultValue={'abc123'}
                        //editable={!loading}
                    />
                    <Input
                        name={'confirmPassword'}
                        control={control}
                        error={
                            errors.confirmPassword &&
                            errors.confirmPassword.message
                        }
                        secureTextEntry={!hideConfirmPassword}
                        source={require('@assets/icons/lock.png')}
                        placeholder={'confirmar senha'}
                        source2={
                            hideConfirmPassword
                                ? require('@assets/icons/eye.png')
                                : require('@assets/icons/eyeCrossed.png')
                        }
                        onPress={() => {
                            setHideConfirmPassword(!hideConfirmPassword);
                        }}
                        editable={enableConfirmPassword}
                        defaultValue={'abc123'}
                    />

                    <Button
                        title="Continuar"
                        onPress={handleSubmit(handleContinue)}
                    />
                </Wrapper>
            </Container>
        </TouchableWithoutFeedback>
    );
}
