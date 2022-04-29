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
                    : name === 'favorites'
                    ? require('../../assets/icons/home.png')
                    : name === 'history'
                    ? require('../../assets/icons/home.png')
                    : require('../../assets/icons/home.png')
            }
            style={{
                tintColor: focused
                    ? theme.colors.background_red
                    : theme.colors.icon_gray,
            }}
        />
    );
}
