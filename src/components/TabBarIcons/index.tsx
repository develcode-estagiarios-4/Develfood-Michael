import React from 'react';
import { Icon } from './styles';
import theme from '../../styles/theme';
import { ImageProps } from 'react-native';

interface Props {
    focused: boolean;
    name: string;
}

export function TabBarIcon({ focused, name }: Props) {
    return (
        <Icon
            source={
                name === 'home'
                    ? require('../../assets/icons/home.png')
                    : name === 'heart'
                    ? require('../../assets/icons/heart.png')
                    : name === 'historic'
                    ? require('../../assets/icons/historic.png')
                    : require('../../assets/icons/profile.png')
            }
            style={{
                tintColor: focused
                    ? theme.colors.background_red
                    : theme.colors.icon_gray,
                height: focused ? 36 : 32,
                width: focused ? 36 : 32,
                resizeMode: 'contain'
            }}
        />
    );
}
