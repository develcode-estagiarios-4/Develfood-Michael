import React from 'react';
import { RectButton, RectButtonProps } from 'react-native-gesture-handler';
import { Container, Rect, Title } from './styles';

interface Props extends RectButtonProps {
    title: string;
}

export function Button({ title, ...rest }: Props) {
    return (
        <Container>
            <Rect {...rest}>
                <Title>{title}</Title>
            </Rect>
        </Container>
    );
}
