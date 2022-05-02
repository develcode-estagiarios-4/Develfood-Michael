import React from 'react';
import { Icon } from './styles';
import theme from '../../styles/theme';

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
                    ? require('../../assets/icons/heart.png')
                    : name === 'history'
                    ? require('../../assets/icons/options.png')
                    : require('../../assets/icons/profile.png')
            }
            style={{
                tintColor: focused
                    ? theme.colors.background_red
                    : theme.colors.icon_gray,
                resizeMode: 'contain'
            }}
        />
    );
}
