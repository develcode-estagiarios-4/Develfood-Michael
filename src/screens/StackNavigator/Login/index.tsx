import { Input } from '@components/Input';
import React from 'react';
import { StatusBar, Text, View } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import {
    Container,
    Hamburguer,
    Wrapper,
    Logo,
    Particles,
    Pizza,
    Form,
    LogoWrapper,
} from './styles';

export const Login = () => {
    return (
        <Container>
            <StatusBar
                barStyle="dark-content"
                backgroundColor={'white'}
            />
            <Pizza source={require('@assets/icons/pizza.png')} />
            <Hamburguer source={require('@assets/icons/hamburguer.png')} />
            <Wrapper>
                <LogoWrapper>
                    <Logo source={require('@assets/icons/logoLogin.png')} />
                </LogoWrapper>
                <Form>
                    <Input source={require('@assets/icons/lock.png')} placeholder={'*********'} onChangeText={() => {}}/>
                </Form>
            </Wrapper>
            <Particles source={require('@assets/icons/pozinho.png')} />
        </Container>
    );
};
