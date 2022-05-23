import { Button } from '@components/Button';
import { Input } from '@components/Input';
import { usePost } from '@services/usePost';
import React, { useContext, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import {
    Keyboard,
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
    EsqueceuSenha,
    ForgotPasswordText,
    SignUpHere,
    Text,
    ForgotPassword,
    CadastreSe,
} from './styles';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { AuthContext } from '../../../context/auth';

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
        getValues, // pega os valores do input
        formState: { errors },
        reset,
    } = useForm({
        resolver: yupResolver(schema),
    });

    function handleChangeShowPasswordButton() {
        setIsClicked(!isClicked);
    }

    function handleLogin() {
        let email = getValues('email');
        let password = getValues('password');
        logIn(email, password);
        //reset({['email']: '', ['password']: ''}); 
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
                            editable={!loading} // !loading
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
                            editable={!loading} // !loading
                        />
                    </Form>
                    <ForgotPassword>
                        <EsqueceuSenha>
                            <ForgotPasswordText>
                                Esqueci minha senha
                            </ForgotPasswordText>
                        </EsqueceuSenha>
                    </ForgotPassword>

                    <Button
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
                        height: RFValue(210),
                        width: RFPercentage(45),
                    }}
                    source={require('@assets/icons/pozinho.png')}
                />
            </Container>
        </TouchableWithoutFeedback>
    );
};