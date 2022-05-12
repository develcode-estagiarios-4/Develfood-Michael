import React from 'react';
import { ImageSourcePropType, TextInputProps } from 'react-native';
import { BorderlessButton, TextInput } from 'react-native-gesture-handler';
import { Icon, InputWrapper, LeftIcon, RightIcon } from './styles';

interface Props extends TextInputProps {
    source: ImageSourcePropType;
    source2?: ImageSourcePropType;
    onPress?: () => void;
}

export function Input({ source, source2, onPress, ...rest }: Props) {
    return (
        <InputWrapper>
            
                <RightIcon>
                    <Icon source={source} />
                    <TextInput
                        {...rest}
                        style={{
                            marginHorizontal: 10,
                            flex: 1,
                        }}
                    />
                </RightIcon>

            <LeftIcon>
                {!!source2 && !!onPress && (
                    <BorderlessButton  onPress={onPress}>
                        <Icon source={source2} />
                    </BorderlessButton>
                )}
            </LeftIcon>
        </InputWrapper>
    );
}
