import React from 'react';
import { Image } from 'react-native';
import { RectButtonProps } from 'react-native-gesture-handler';
import { RFValue } from 'react-native-responsive-fontsize';
import { useTheme } from 'styled-components';
import { ButtonIcon, Title } from './styles';

interface Props {
    name: string;
    isPressed: boolean;
    onPressed: Function;
}

export function TabBarButton({ name, isPressed, onPressed }: Props) {
    const theme = useTheme();
    return (
        <ButtonIcon borderless onPress={() => onPressed()}>
            <Image
                source={
                    name === 'Inicio'
                        ? theme.icons.home
                        : name === 'Favoritos'
                        ? theme.icons.favorites
                        : name === 'Historico'
                        ? theme.icons.historic
                        : name === 'Perfil'
                        ? theme.icons.profile
                        : null
                }
                style={{
                    tintColor: isPressed
                        ? theme.colors.icon_red
                        : theme.colors.icon_gray,
                    height: isPressed ? RFValue(36) : RFValue(32),
                    width: isPressed ? RFValue(36) : RFValue(32),
                    resizeMode: 'contain'
                }}
            />
            {isPressed ? <Title /> : <Title>{name}</Title>}
        </ButtonIcon>
    );
}
