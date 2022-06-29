import { Button } from '@components/Button';
import { Input } from '@components/Input';
import React, { useContext, useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import * as yup from 'yup';
import { Keyboard, StatusBar } from 'react-native';
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
    EsqueceuSenha,
    ForgotPasswordText,
    SignUpHere,
    Text,
    ForgotPassword,
    CadastreSe,
    LoginButton,
    LogoWrapper,
} from './styles';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { AuthContext } from '../../../../context/auth';

export function Login({ navigation }: any) {
    const [isClicked, setIsClicked] = useState(false);

    const schema = yup.object().shape({
        email: yup
            .string()
            .email('Por favor, insira um email válido')
            .required('O email é obrigatório'),
        password: yup.string().required('A senha é obrigatória'),
    });

    const { logIn, loading, token } = useContext(AuthContext);

    const {
        control,
        handleSubmit,
        getValues, 
        setValue,
        formState: { errors },
        reset,
    } = useForm({
        resolver: yupResolver(schema),
    });

    function handleChangeShowPasswordButton() {
        setIsClicked(!isClicked);
    }

    useEffect(() => {
        setValue('email', 'michael@gmail.com')
        setValue('password', '123456');
    }, [])

    function handleLogin() {
        const values = getValues();
        logIn(values.email, values.password);
    }

    return (
        <TouchableWithoutFeedback
            style={{ flex: 1 }}
            containerStyle={{ flex: 1 }}
            onPress={Keyboard.dismiss}
        >
            <Container>
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
                        <LogoWrapper>
                            <Logo
                                source={require('@assets/icons/logoLogin.png')}
                            />
                        </LogoWrapper>

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
                                    editable={!loading} // !loading
                                    onChangeText={onChange}
                                    value={value}
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
                                    error={
                                        errors.password &&
                                        errors.password.message
                                    }
                                    secureTextEntry={!isClicked}
                                    source={require('@assets/icons/lock.png')}
                                    placeholder={'*********'}
                                    source2={
                                        isClicked
                                            ? require('@assets/icons/eye.png')
                                            : require('@assets/icons/eyeCrossed.png')
                                    }
                                    onPress={handleChangeShowPasswordButton}
                                    editable={!loading} // !loading
                                    onChangeText={onChange}
                                    value={value}
                                />
                            )}
                            name={'password'}
                        />
                    </Form>
                    <ForgotPassword>
                        <EsqueceuSenha>
                            <ForgotPasswordText>
                                Esqueci minha senha
                            </ForgotPasswordText>
                        </EsqueceuSenha>
                    </ForgotPassword>

                    <LoginButton
                        title="Entrar"
                        onPress={handleSubmit(handleLogin)}
                        isLoading={loading} // loading
                        enabled={!loading} // !loading
                    />

                    <CadastreSe>
                        <Text>Não possui cadastro? </Text>
                        <EsqueceuSenha
                            onPress={() => {
                                navigation.push('Cadastro');
                                console.log('Clicaste');
                            }}
                        >
                            <SignUpHere>Cadastre-se aqui!</SignUpHere>
                        </EsqueceuSenha>
                    </CadastreSe>
                </Wrapper>
                <Particles
                    style={{
                        height: RFValue(220),
                        width: RFValue(324),
                    }}
                    source={require('@assets/icons/pozinho.png')}
                />
            </Container>
        </TouchableWithoutFeedback>
    );
}
