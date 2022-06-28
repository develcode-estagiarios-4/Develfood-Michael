import { Dimensions } from 'react-native';
import Animated from 'react-native-reanimated';
import { RFValue } from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';

const dimensions = Dimensions.get('window')

export const Container = styled.View`
    flex: 1;
`;

export const MapWrapper = styled.View`
    width: 100%;
    height: ${RFValue(50)}px;
    background-color: white;
`;

export const OrderList = styled(Animated.View)`
    width: ${dimensions.width * 1.2}px;
    height: undefined;
    padding-top: ${RFValue(70)}px;
    padding-bottom: 50px;
    background-color: ${({ theme }) => theme.colors.gray};
    margin-left: ${RFValue(30)}px;
    border-radius: 80px;
`;