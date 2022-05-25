import { Input } from '@components/Input';
import { RFPercentage, RFValue } from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';
import { Dimensions } from 'react-native';

export const Container = styled.ScrollView`
    flex: 1;
    background-color: ${({ theme }) => theme.colors.background};
`;

export const ImageWrapper = styled.View`
    justify-content: center;
    align-items: center;
`;

export const StepsDoneImage = styled.Image`
    width: ${RFValue(232)}px;
    height: ${RFValue(220)}px;
    position: absolute;
    align-self: center;
    top: ${RFValue(20)}px;
`;

export const Wrapper = styled.View`
    padding: ${RFValue(30)}px;
    z-index: 1;
    margin-top: ${RFValue(230)}px;
`;

export const RowView = styled.View`
    flex-direction: row;
`;

export const NicknameWrapper = styled.View`
    width: 54%;
    margin-right: 4%;  
`;

export const CepWrapper = styled.View`
    width: 42%;
`;

export const StateWrapper = styled.View`
    width: 48%;
    margin-right: 2%;
`;

export const NumberWrapper = styled.View`
    width: 48%;
    margin-left: 2%;
`;
