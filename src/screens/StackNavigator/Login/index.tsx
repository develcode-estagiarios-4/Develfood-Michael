import { Button } from '@components/Button';
import { Input } from '@components/Input';
import { usePost } from '@services/usePost';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { ActivityIndicator, Alert, StatusBar } from 'react-native';
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

export const Login = () => {
    const [isClicked, setIsClicked] = useState(false);
    const [email, setEmail] = useState('exemplo@email.com');
    const [password, setPassword] = useState('123456');

    const schema = yup.object().shape({
        email: yup
            .string()
            .email('Por favor, insira um email válido')
            .required('O email é obrigatório'),
        password: yup
            .string()
            .required('A senha é obrigatória'),     
    });

     const {
         control,
         handleSubmit,
         reset,
         formState: { errors }
     } = useForm({
         resolver: yupResolver(schema),
     });

    const { data, loading, error, handlePost } = usePost('/auth', {
        email: email, // exemplo@email.com
        password: password, // 123456
    });

    function handleChangeShowPasswordButton() {
        setIsClicked(!isClicked);
    }

    async function handleLogin() {
        setEmail;
        setPassword;
        handleSubmit;
        handlePost(error);
        console.log(data);
    }

    return (
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
                        value={email}
                        source={require('@assets/icons/mail.png')}
                        placeholder={'exemplo@email.com'}
                        onChangeText={setEmail}
                    />
                    <Input
                        name={'password'}
                        control={control}
                        error={errors.password && errors.password.message}
                        value={password}
                        secureTextEntry={!isClicked}
                        source={require('@assets/icons/lock.png')}
                        placeholder={'*********'}
                        onChangeText={setPassword}
                        source2={
                            isClicked
                                ? require('@assets/icons/eye.png')
                                : require('@assets/icons/eyeCrossed.png')
                        }
                        onPress={handleChangeShowPasswordButton}
                    />
                </Form>
                <ForgotPassword>
                    <EsqueceuSenha>
                        <TitleButton>Esqueci minha senha</TitleButton>
                    </EsqueceuSenha>
                </ForgotPassword>

                <Button
                    title="Entrar"
                    onPress={handleLogin}
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
                style={{ height: RFValue(210), width: RFPercentage(45) }}
                source={require('@assets/icons/pozinho.png')}
            />
        </Container>
    );
};
