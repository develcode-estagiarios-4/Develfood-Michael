import React from 'react';
import {
    Animated,
    ImageSourcePropType,
    StyleProp,
    StyleSheet,
    View,
    ViewStyle,
} from 'react-native';
import {
    BorderlessButton,
    BorderlessButtonProps,
} from 'react-native-gesture-handler';
import { RFValue } from 'react-native-responsive-fontsize';
import theme from '@styles/theme';
import { Container, Icon, Title } from './styles';
import { AnimatedStyleProp } from 'react-native-reanimated';

interface Props extends BorderlessButtonProps {
    source: ImageSourcePropType;
    title: string;
}

export function HeaderHome({ title, source, style, ...rest }: Props) {
    return (
        <Animated.View style={[style, styles.container]}>
            <BorderlessButton {...rest}>
                <Icon source={source} />
            </BorderlessButton>
            <Title>{title}</Title>
        </Animated.View>
    );
}

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        backgroundColor: theme.colors.header,
        flexDirection: 'row',
        height: RFValue(50),
        width: '100%',
        alignItems: 'center',
        padding: 10,
        paddingTop: 10,
        zIndex: 1,
    },
});
