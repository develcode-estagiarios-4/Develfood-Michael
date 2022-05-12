import { Button } from '@components/Button';
import { Input } from '@components/Input';
import React, { useState } from 'react';
import {
    StatusBar,
    Text,
    TouchableHighlight,
    TouchableOpacity,
    View,
} from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
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
    const [isClicked, setIsClicked] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('senha');

    function handleChangeShowPasswordButton() {
        setIsClicked(!isClicked);
        console.log(isClicked);
    }

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
                    <Input
                        value={email}
                        source={require('@assets/icons/mail.png')}
                        placeholder={'exemplo@email.com'}
                        onChangeText={() => {
                            setEmail;
                            console.log(email);
                        }}
                    />
                    <Input
                        value={password}
                        secureTextEntry={!isClicked}
                        source={require('@assets/icons/lock.png')}
                        placeholder={'*********'}
                        onChangeText={(text) => {
                            setPassword(text);
                            console.log(typeof password);
                            console.log(password);
                        }}
                        source2={
                            isClicked
                                ? require('@assets/icons/eye.png')
                                : require('@assets/icons/eyeCrossed.png')
                        }
                        onPress={() => {
                            handleChangeShowPasswordButton();
                        }}
                    />
                </Form>
                <Button title='Alo' onPress={() => { }} />
            </Wrapper>
            <Particles source={require('@assets/icons/pozinho.png')} />
        </Container>
    );
};
