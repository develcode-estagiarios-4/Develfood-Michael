import { Button } from '@components/Button';
import { Input } from '@components/Input';
import { usePost } from '@services/usePost';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import {
    ActivityIndicator,
    Alert,
    Keyboard,
    KeyboardAvoidingView,
    StatusBar,
} from 'react-native';
import { yupResolver } from '@hookform/resolvers/yup';
import { RFPercentage, RFValue } from 'react-native-responsive-fontsize';
import {
    Container,
    Hamburguer,
    Wrapper,
    Logo,
    Particles,
    Pizza,
    Form,
    LogoWrapper,
    EsqueceuSenha,
    TitleButton,
    Text,
    ForgotPassword,
    CadastreSe,
} from './styles';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';

export const Login = () => {
    const [isClicked, setIsClicked] = useState(false);

    const schema = yup.object().shape({
        email: yup
            .string()
            .email('Por favor, insira um email válido')
            .required('O email é obrigatório'),
        password: yup.string().required('A senha é obrigatória'),
    });

    const {
        control,
        handleSubmit,
        getValues, // pega os valores do input
        formState: { errors },
        reset,
    } = useForm({
        resolver: yupResolver(schema),
    });

    const { data, loading, error, handlePost } = usePost('/auth', {
        email: getValues('email'), // exemplo@email.com
        password: getValues('password'), // 123456
    });

    function handleChangeShowPasswordButton() {
        setIsClicked(!isClicked);
    }

    function handleLogin() {
        const errorMessage =
            error?.response?.status === 409
                ? 'Usuário ou senha inválidos'
                : error?.message;
        handlePost('Erro', 'danger', errorMessage);
        reset({['email']: '', ['password']: ''});
    }

    return (
        <TouchableWithoutFeedback
            style={{ flex: 1 }}
            containerStyle={{ flex: 1 }}
            onPress={Keyboard.dismiss}
        >
            <Container>
                <StatusBar
                    barStyle="dark-content"
                    backgroundColor={'white'}
                />
                <Pizza
                    style={{ height: RFValue(280), width: RFValue(130) }}
                    source={require('@assets/icons/pizza.png')}
                />
                <Hamburguer
                    style={{ height: RFValue(210), width: RFValue(75) }}
                    source={require('@assets/icons/hamburguer.png')}
                />
                <Wrapper>
                    <Form>
                        <Logo source={require('@assets/icons/logoLogin.png')} />
                        <Input
                            name={'email'}
                            control={control}
                            error={errors.email && errors.email.message}
                            keyboardType="email-address"
                            source={require('@assets/icons/mail.png')}
                            placeholder={'exemplo@email.com'}
                            editable={!loading}
                        />
                        <Input
                            name={'password'}
                            control={control}
                            error={errors.password && errors.password.message}
                            secureTextEntry={!isClicked}
                            source={require('@assets/icons/lock.png')}
                            placeholder={'*********'}
                            source2={
                                isClicked
                                    ? require('@assets/icons/eye.png')
                                    : require('@assets/icons/eyeCrossed.png')
                            }
                            onPress={handleChangeShowPasswordButton}
                            editable={!loading}
                        />
                    </Form>
                    <ForgotPassword>
                        <EsqueceuSenha>
                            <TitleButton>Esqueci minha senha</TitleButton>
                        </EsqueceuSenha>
                    </ForgotPassword>

                    <Button
                        title="Entrar"
                        onPress={handleSubmit(handleLogin)}
                        isLoading={loading}
                        enabled={!loading}
                    />

                    <CadastreSe>
                        <Text>Não possui cadastro? </Text>
                        <EsqueceuSenha>
                            <TitleButton>Cadastre-se aqui!</TitleButton>
                        </EsqueceuSenha>
                    </CadastreSe>
                </Wrapper>
                <Particles
                    style={{
                        height: RFValue(210),
                        width: RFPercentage(45),
                    }}
                    source={require('@assets/icons/pozinho.png')}
                />
            </Container>
        </TouchableWithoutFeedback>
    );
};
