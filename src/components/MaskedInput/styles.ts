import { RFValue } from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';

export const InputWrapper = styled.View`
    background-color: ${({ theme }) => theme.colors.background};
    height: ${RFValue(48)}px;
    border-width: 1px;
    border-color: ${({ theme }) => theme.colors.input};
    border-radius: 10px;
    margin-bottom: 12px;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    padding: 0 10px;
`;

export const Icon = styled.Image.attrs({
    resizeMode: 'contain',
    tintColor: '#BFBABA',
})`
    width: 25px;
    height: 25px;
`;

export const LeftIcon = styled.View`
    position: absolute;
    width: 25px;
    right: 15px;
    z-index: 1;
`;

export const RightIcon = styled.View`
    flex-direction: row;
    align-items: center;
`;

export const ErrorWrapper = styled.View`
    width: 100%;
    justify-content: flex-start;
    margin: -12px 0 3px 8px;
`;

export const Error = styled.Text`
    color: ${({ theme }) => theme.colors.text_red};
    font-family: ${({ theme }) => theme.fonts.secondaryMed};
    font-size: ${({ theme }) => theme.sizes.small}px;
`;
