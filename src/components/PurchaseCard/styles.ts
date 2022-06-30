import styled from "styled-components/native";

export const Container = styled.View`
    width: 100%;
    height: 120px;
    background-color: ${(props) => props.theme.colors.background_red};
    margin-bottom: 20px;
`;

export const Title = styled.Text`
    font-size: ${(props) => props.theme.sizes.medium}px;
    color: ${(props) => props.theme.colors.text_dark};
    font-family: ${(props) => props.theme.fonts.primaryMed};
`;