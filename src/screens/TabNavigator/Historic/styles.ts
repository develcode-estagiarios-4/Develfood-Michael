import styled from 'styled-components/native';

export const Container = styled.View`
    flex: 1;
    background-color: ${props => props.theme.colors.background};
`;

export const Title = styled.Text`
    font-size: 24px;
    align-self: center;
`;