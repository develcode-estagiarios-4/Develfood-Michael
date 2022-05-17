import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { useState } from 'react';
import { View } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { TabBarButton } from '../TabBarButton';
import { Container } from './styles';

export function TabBar() {
    const navigation = useNavigation();
    const [iconName, setIconName] = useState('');
    return (
            <Container>
                <TabBarButton
                    onPressed={() => {
                        setIconName('Inicio');
                        navigation.navigate('Inicio' as never);
                    }}
                    isPressed={iconName === 'Inicio'}
                    name={'Inicio'}
                />

                <TabBarButton
                    onPressed={() => {
                        setIconName('Favoritos');
                        navigation.navigate('Favoritos' as never);
                    }}
                    isPressed={iconName === 'Favoritos'}
                    name={'Favoritos'}
                />

                <TabBarButton
                    onPressed={() => {
                        setIconName('Historico');
                        navigation.navigate('Historico' as never);
                    }}
                    isPressed={iconName === 'Historico'}
                    name={'Historico'}
                />

                <TabBarButton
                    onPressed={() => {
                        setIconName('Perfil');
                        navigation.navigate('Perfil' as never);
                    }}
                    isPressed={iconName === 'Perfil'}
                    name={'Perfil'}
                />
            </Container>
    );
}
