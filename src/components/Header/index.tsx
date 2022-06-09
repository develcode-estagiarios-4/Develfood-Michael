import React, { useState } from 'react';
import { ImageProps, ImageSourcePropType, View } from 'react-native';
import {
    BorderlessButton,
    BorderlessButtonProps,
} from 'react-native-gesture-handler';
import theme from '@styles/theme';
import {
    Container,
    Icon,
    Like,
    MapContainer,
    Title,
    UselessView,
} from './styles';

interface Props extends BorderlessButtonProps {
    source: ImageSourcePropType;
    source2?: ImageSourcePropType;
    title?: string;
    like?: () => void;
    goBack?: () => void;
}

export function Header({
    source,
    source2,
    goBack,
    like,
    title,
    ...rest
}: Props) {
    const [focused, setFocused] = useState(false);

    return (
        <Container>
            {!source2 && (
                <>
                    <BorderlessButton onPress={goBack}>
                        <Icon source={source} />
                    </BorderlessButton>
                    <Title>{title}</Title>

                    <UselessView />
                </>
            )}

            {!!source2 && (
                <>
                    <BorderlessButton onPress={goBack}>
                        <Icon source={source} />
                    </BorderlessButton>
                    <Title>{title}</Title>
                    <BorderlessButton onPress={() => setFocused(!focused)}>
                        <Like
                            source={source2}
                            style={
                                focused
                                    ? { tintColor: theme.colors.icon_red }
                                    : null
                            }
                        />
                    </BorderlessButton>
                </>
            )}
        </Container>
    );
}
