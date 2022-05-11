import React from 'react'
import { ImageSourcePropType } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import { Icon, InputWrapper } from './styles';

interface Props {
    source: ImageSourcePropType;
    placeholder: string;
    onChangeText: (text: string) => void;
}

export function Input({ source, placeholder, onChangeText } : Props) {

    return (
        <InputWrapper>
            <Icon source={source} />
            <TextInput placeholder={placeholder} onChangeText={onChangeText}/>
        </InputWrapper>
    );
}