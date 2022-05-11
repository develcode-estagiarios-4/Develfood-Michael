import styled from "styled-components/native";

export const InputWrapper = styled.View`
    border-width: 1;
    border-color: #BFBABA;
    border-radius: 10;
    margin-bottom: 12px;
    flex-direction: row;
    //background-color: blue;
    align-items: center;
    padding: 0 19px;
`;

export const Icon = styled.Image.attrs({
    resizeMode: "contain",
    tintColor: "#BFBABA",
})`
    width: 30px;
    height: 30px;
    
`;