import React from 'react';
import { ActivityIndicator } from 'react-native';
import { RectButton, RectButtonProps } from 'react-native-gesture-handler';
import { Container, Rect, Title } from './styles';

interface Props extends RectButtonProps {
    title: string;
    isLoading: boolean;
}

export function Button({ title, isLoading, ...rest }: Props) {
    return (
        <Container>
            <Rect {...rest}>
                {isLoading ? <ActivityIndicator /> : <Title>{title}</Title>}
            </Rect>
        </Container>
    );
}
