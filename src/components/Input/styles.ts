import { RFValue } from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';

export const InputWrapper = styled.View`
    height: ${RFValue(50)}px;
    border-width: 1;
    border-color: ${({ theme }) => theme.colors.input};
    border-radius: 10;
    margin-bottom: 12px;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    padding: 0 15px;
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
