import React from 'react';
import { Control, Controller, useForm } from 'react-hook-form';
import { ImageSourcePropType, TextInputProps, View } from 'react-native';
import { BorderlessButton, TextInput } from 'react-native-gesture-handler';
import theme from '../../styles/theme';
import {
    Error,
    ErrorWrapper,
    Icon,
    InputWrapper,
    LeftIcon,
    RightIcon,
} from './styles';

interface Props extends TextInputProps {
    source: ImageSourcePropType;
    source2?: ImageSourcePropType;
    onPress?: () => void;
    control?: Control;
    name?: string;
    error?: string;
    editable?: boolean;
}

export function Input({
    source,
    source2,
    onPress,
    control,
    name,
    error,
    editable,
    ...rest
}: Props) {
    return (
        <>
            <InputWrapper>
                <RightIcon>
                    <Icon source={source} />
                    <TextInput
                        style={{
                            marginLeft: 5,
                            flex: 1,
                            fontFamily: theme.fonts.primaryReg,
                            fontSize: theme.sizes.small,
                        }}
                        editable={editable}
                        {...rest}
                    />
                </RightIcon>

                <LeftIcon>
                    {!!source2 && !!onPress && (
                        <BorderlessButton onPress={onPress}>
                            <Icon source={source2} />
                        </BorderlessButton>
                    )}
                </LeftIcon>
            </InputWrapper>
            {error && (
                <ErrorWrapper>
                    <Error>{error}</Error>
                </ErrorWrapper>
            )}
        </>
    );
}
