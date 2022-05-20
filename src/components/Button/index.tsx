import React from 'react';
import { ActivityIndicator } from 'react-native';
import { RectButton, RectButtonProps } from 'react-native-gesture-handler';
import { Container, Rect, Title } from './styles';

interface Props extends RectButtonProps {
    title: string;
    isLoading?: boolean;
    onPress?: () => void; 
}

export function Button({ title, isLoading, onPress, ...rest }: Props) {
    return (
        <Container>
            <Rect onPress={onPress} {...rest}>
                {isLoading ? <ActivityIndicator color={'white'} size={'large'} /> : <Title>{title}</Title>}
            </Rect>
        </Container>
    );
}
