import React, { useState } from 'react';
import {
    ImageProps,
    ImageSourcePropType,
    StyleProp,
    TextStyle,
    View,
} from 'react-native';
import {
    BorderlessButton,
    BorderlessButtonProps,
} from 'react-native-gesture-handler';
import theme from '../../styles/theme';
import { Container, Icon, Like, Button, UselessView, Title } from './styles';
import Animated from 'react-native-reanimated';

interface Props extends BorderlessButtonProps {
    source?: ImageSourcePropType;
    source2?: ImageSourcePropType;
    title?: string;
    like?: () => void;
    style?: StyleProp<TextStyle>;
    color: string;
}

export function Header({
    source,
    source2,
    onPress,
    title,
    style,
    color,
    ...rest
}: Props) {
    const [focused, setFocused] = useState(false);

    return (
        <Container style={{ backgroundColor: color }}>
            {!source2 && !source && (
                <View style={{flex: 1, alignItems: 'center'}}>
                    <Title color={color}>{title}</Title>
                </View>
            )}
            {!source2 && source && (
                <>
                    <Button onPress={onPress}>
                        <Icon
                            source={source}
                            style={
                                color === theme.colors.headerSecondary
                                    ? { tintColor: theme.colors.icon_dark }
                                    : { tintColor: theme.colors.icon_white }
                            }
                        />
                    </Button>
                    <Title color={color}>{title}</Title>

                    <UselessView />
                </>
            )}

            {!!source2 && source && (
                <>
                    <Button onPress={onPress}>
                        <Icon
                            style={
                                color === theme.colors.headerSecondary
                                    ? { tintColor: theme.colors.icon_dark }
                                    : { tintColor: theme.colors.icon_white }
                            }
                            source={source}
                        />
                    </Button>
                    <Animated.Text
                        style={[
                            style,
                            color === theme.colors.headerSecondary
                                ? { color: theme.colors.icon_dark }
                                : { color: theme.colors.icon_white },
                        ]}
                    >
                        {title}
                    </Animated.Text>
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
