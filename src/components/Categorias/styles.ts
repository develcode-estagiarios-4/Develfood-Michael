import styled from "styled-components/native";

export const Container = styled.View`
    background-color: ${({ theme }) => theme.colors.background_red};
    border-radius: 25px;
    padding: 10px 20px;
    align-items: center;
    justify-content: center;
`;

export const Title = styled.Text`
    color: ${({theme}) => theme.colors.text_white};
    font-size: ${({theme}) => theme.sizes.small};
`;