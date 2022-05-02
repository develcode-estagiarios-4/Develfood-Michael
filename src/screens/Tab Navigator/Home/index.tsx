import React, { useEffect, useState } from 'react';
import { useFetch } from '../../../services/useFetch';
import { Container, Title } from './styles';
import { ActivityIndicator, Button } from 'react-native';
import { usePost } from '../../../services/usePost';

export function Home({ navigation }: any) {
    const { data, loading, error } = useFetch('/95032050/json/');

    useEffect(() => {
        console.log(data.logradouro);
        console.log(data.bairro);
        console.log(data.localidade);
        console.log(data.uf);
    }, [data]);

    return loading ? (
        <ActivityIndicator size={'large'} />
    ) : (
        <Container>
            <Title>get</Title>
            <Title>
                {data.logradouro} {'\n'} {'\n'} {data.bairro} {'\n'} {'\n'}
                {data.localidade}
            </Title>

            <Title>post</Title>
            <Title></Title>
            <Button
                title="enviar"
                onPress={() => {
                    usePost(
                        '/public/v2/users',
                        {
                            email: '',
                            gender: '',
                            name: '',
                            status: '',
                        },
                        {}
                    );
                }}
            />
        </Container>
    );
}
