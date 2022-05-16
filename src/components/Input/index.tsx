import React from 'react';
import { Control, Controller, useForm } from 'react-hook-form';
import { ImageSourcePropType, TextInputProps } from 'react-native';
import { BorderlessButton, TextInput } from 'react-native-gesture-handler';
import theme from '../../styles/theme';
import { Error, Icon, InputWrapper, LeftIcon, RightIcon } from './styles';

interface Props extends TextInputProps {
    source: ImageSourcePropType;
    source2?: ImageSourcePropType;
    onPress?: () => void;
    control: Control;
    name: string;
    error: string;
}



export function Input({ source, source2, onPress, control, name, error, ...rest }: Props) {

    error ? console.log(error) : null;
    
    return (
        <>
            <InputWrapper>
                <RightIcon>
                    <Icon source={source} />
                    <Controller
                        control={control}
                        name={name}
                        render={({ field: { onChange, value } }) => (
                            <TextInput
                                style={{
                                    marginHorizontal: 10,
                                    flex: 1,
                                    fontFamily: theme.fonts.primaryReg,
                                    fontSize: theme.sizes.intermediate,
                                }}
                                onChange={onChange}
                                value={value}
                                {...rest}
                            />
                        )}
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
            {error && <Error>{ error }</Error>}
        </>
    );
}
