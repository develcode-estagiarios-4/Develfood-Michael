import React, { useEffect, useState } from 'react';
import { useFetch } from '../../../services/useFetch';
import { Container, Title } from './styles';
import { ActivityIndicator, Button } from 'react-native';
import { usePost } from '../../../services/usePost';
import { useDelete } from '../../../services/useDelete';
import { usePut } from '../../../services/usePut';

export function Home({ navigation }: any) {
    const { data, loading, error } = useFetch('/95040500/json/');

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
            <Button
                title="criar usuario"
                onPress={() => {
                    usePost(
                        '/public/v2/users',
                        {
                            email: 'irineu@gmail.com',
                            gender: 'male',
                            name: 'xablau',
                            status: 'active',
                        },
                        {
                            headers: {
                                Authorization:
                                    'Bearer daf3a258b8841c825fae207d9a61a5f5d69bcdaac7086cb868b59da6efc9f25f',
                            },
                        }
                    );
                }}
            />
            <Title>delete</Title>
            <Button
                title="deletar usuario"
                onPress={() => {
                    useDelete('/public/v2/users/11706', {
                        headers: {
                            Authorization:
                                'Bearer daf3a258b8841c825fae207d9a61a5f5d69bcdaac7086cb868b59da6efc9f25f',
                        },
                    });
                }}
            />
            <Title>put</Title>
            <Button
                title="atualizar usuario"
                onPress={() => {
                    usePut(
                        '/public/v2/users/11706',
                        {
                            
                        },

                        {
                            headers: {
                                Authorization:
                                    'Bearer daf3a258b8841c825fae207d9a61a5f5d69bcdaac7086cb868b59da6efc9f25f',
                            },
                        }
                    );
                }}
            />
        </Container>
    );
}
