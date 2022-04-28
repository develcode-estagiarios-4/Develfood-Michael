import React, { useEffect, useState } from 'react';
import { useFetch } from '../../../services/useFetch';
import { Container, Title } from './styles';

export function Home({ navigation }: any) {
    const cep = useFetch('/53370300/json/').data;

    useEffect(() => {
        console.log(cep.logradouro);
        console.log(cep.bairro);
        console.log(cep.localidade);
        console.log(cep.uf);
    }, [cep]);

    return (
        <Container>
            <Title>Início</Title>
            <Title>{cep.logradouro} {"\n"} {"\n"} {cep.bairro} {"\n"} {"\n"} { cep.localidade }</Title>
        </Container>
    );
}
