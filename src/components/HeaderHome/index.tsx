import React from 'react';
import { ImageProps, ImageSourcePropType, View } from 'react-native';
import {
    BorderlessButton,
    BorderlessButtonProps,
} from 'react-native-gesture-handler';
import {
    ButtonContainer,
    Container,
    Icon,
    Title,
    UselessView,
} from './styles';

interface Props extends BorderlessButtonProps {
    source: ImageSourcePropType;
    title: string;
}

export function HeaderHome({ title, source, ...rest }: Props) {
    return (
        <Container>
            <BorderlessButton {...rest}>
                <Icon source={source} />
            </BorderlessButton>
            <Title>{title}</Title>
        </Container>
    );
}
