import React, { useEffect, useState } from 'react';
import { useFetch } from '../../../services/useFetch';
import { Container, Title } from './styles';

export function Home({ navigation }: any) {

    const { data, loading, error } = useFetch('/53370300/json/')

    useEffect(() => {
        console.log(data.logradouro);
        console.log(data.bairro);
        console.log(data.localidade);
        console.log(data.uf);
    }, [data]);

    return (
        <Container>
            <Title>Início</Title>
            <Title>{data.logradouro} {"\n"} {"\n"} {data.bairro} {"\n"} {"\n"} { data.localidade }</Title>
        </Container>
    );
}
