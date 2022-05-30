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
    MapContainer,
    Title,
    UselessView,
} from './styles';

interface Props extends BorderlessButtonProps {
    source: ImageSourcePropType;
    source2?: ImageSourcePropType;
    title: string;
}

export function Header({ source, source2, title, ...rest }: Props) {
    console.log(title);
    return (
        <Container>
            {!source2 && (
                <>
                    <BorderlessButton {...rest}>
                        <Icon source={source} />
                    </BorderlessButton>
                    <Title>{title}</Title>

                    <UselessView />
                </>
            )}

            {!!source2 && (
                <>
                    <BorderlessButton {...rest}>
                        <Icon source={source} />
                    </BorderlessButton>
                    <Title>{title}</Title>
                    <BorderlessButton>
                        <Icon source={source2} />
                    </BorderlessButton>
                </>
            )}
        </Container>
    );
}
