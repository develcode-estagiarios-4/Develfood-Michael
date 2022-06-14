import React, { useState } from 'react';
import { ImageProps, ImageSourcePropType, StyleProp, TextStyle, View } from 'react-native';
import {
    BorderlessButton,
    BorderlessButtonProps,
} from 'react-native-gesture-handler';
import theme from '@styles/theme';
import {
    Container,
    Icon,
    Like,
    Button,
    UselessView,
} from './styles';
import Animated from 'react-native-reanimated';
import { RFValue } from 'react-native-responsive-fontsize';

interface Props extends BorderlessButtonProps {
    source: ImageSourcePropType;
    source2?: ImageSourcePropType;
    title?: string;
    like?: () => void;
    goBack?: () => void;
    style?: TextStyle;
}

export function Header({
    source,
    source2,
    goBack,
    like,
    title,
    style,
    ...rest
}: Props) {
    const [focused, setFocused] = useState(false);

    return (
        <Container>
            {!source2 && (
                <>
                    <Button onPress={goBack}>
                        <Icon source={source} />
                    </Button>
                    <Animated.Text style={style}>{title}</Animated.Text>

                    <UselessView />
                </>
            )}

            {!!source2 && (
                <>
                    <Button onPress={goBack}>
                        <Icon source={source} />
                    </Button>
                    <Animated.Text style={style}>{title}</Animated.Text>
                    <Button onPress={() => setFocused(!focused)}>
                        <Like
                            source={source2}
                            style={
                                focused
                                    ? { tintColor: theme.colors.icon_red }
                                    : null
                            }
                        />
                    </Button>
                </>
            )}
        </Container>
    );
}
