import { Button } from '@components/Button';
import { Input } from '@components/Input';
import { usePost } from '@services/usePost';
import React, { useState } from 'react';
import { ActivityIndicator, Alert, StatusBar } from 'react-native';
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
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('senha');

    const { data, loading, error, handlePost } = usePost('/auth', {
        email: 'exemplo@email.com',
        password: '123456',
    });

    function handleChangeShowPasswordButton() {
        setIsClicked(!isClicked);
    }

    function handleLogin() {
        handlePost();
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
                        keyboardType="email-address"
                        value={email}
                        source={require('@assets/icons/mail.png')}
                        placeholder={'exemplo@email.com'}
                        onChangeText={setEmail}
                    />
                    <Input
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
                {loading ? (
                    <Button
                        title={ <ActivityIndicator />}
                        onPress={handleLogin}
                    />
                ) : (
                    <Button
                        title="Entrar"
                        onPress={handleLogin}
                    />
                )}
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
