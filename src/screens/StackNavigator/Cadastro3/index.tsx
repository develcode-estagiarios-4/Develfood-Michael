import React, { useEffect, useRef, useState } from 'react';
import { Header } from '@components/Header';
import { Input } from '@components/Input';
import {
    CepWrapper,
    Container,
    NicknameWrapper,
    NumberWrapper,
    RowView,
    StateWrapper,
    StepsDoneImage,
    Wrapper,
} from './styles';
import * as yup from 'yup';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Button } from '@components/Button';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { Keyboard, View } from 'react-native';
import { MaskedInput } from '@components/MaskedInput';
import { useCep } from '@services/cepApi';

export function Cadastro3({ navigation }: any) {
    const [request, setRequest] = useState('');
    const [cep, setCep] = useState('');

    const schema = yup.object().shape({
        apelidoEndereco: yup
            .string()
            .min(3, 'O mínimo de caracteres é 3')
            .required('Campo obrigatório'),
        cep: yup
            .string()
            .required('Campo obrigatório'),
        rua: yup.string().required('Campo obrigatório'),
        cidade: yup.string().required('Campo obrigatório'),
        bairro: yup.string().required('Campo obrigatório'),
        estado: yup.string().required('Campo obrigatório'),
        numero: yup.string().required('Campo obrigatório'),
    });

    const {
        control,
        handleSubmit,
        getValues,
        formState: { errors },
        reset,
        clearErrors,
    } = useForm({
        resolver: yupResolver(schema),
    });

    const { data, handleCep } = useCep(`/${cep}/json/`);

    function handleContinue() {
        //let cep = getValues('CEP');
    }
    
    console.log(data.localidade);
    return (
        <TouchableWithoutFeedback
            style={{ flex: 1 }}
            containerStyle={{ flex: 1 }}
            onPress={Keyboard.dismiss}
        >
            <Container>
                <Header
                    source={require('@assets/icons/back-arrow.png')}
                    onPress={() => {
                        navigation.pop();
                    }}
                />
                <StepsDoneImage
                    source={require('@assets/icons/CadastroConcluido2.png')}
                />
                <Wrapper>
                    <RowView>
                        <NicknameWrapper>
                            <Controller
                                control={control}
                                render={({ field: { onChange, value } }) => (
                                    <Input
                                        name={'Apelido do endereço'}
                                        control={control}
                                        error={
                                            errors.nome && errors.nome.message
                                        }
                                        source={require('@assets/icons/pessoa.png')}
                                        placeholder={'Apelido do End.'}
                                        value={value}
                                        onChangeText={onChange}
                                    />
                                )}
                                name={'Apelido do endereço'}
                            />
                        </NicknameWrapper>

                        <CepWrapper>
                            <Controller
                                control={control}
                                render={({ field: { onChange, value } }) => (
                                    <MaskedInput
                                        name={'CEP'}
                                        type={'zip-code'}
                                        control={control}
                                        error={
                                            errors.sobrenome &&
                                            errors.sobrenome.message
                                        }
                                        source={require('@assets/icons/pessoa.png')}
                                        placeholder={'CEP'}
                                        value={value}
                                        onChangeText={(value) => {
                                            onChange;
                                            setCep(value);
                                            console.log(value);
                                        }}
                                        onEndEditing={() => {
                                            handleCep();
                                        }}
                                        //onEndEditing={(text) => { setCep(text.nativeEvent.text);  console.log(text.nativeEvent.text); }}
                                    />
                                )}
                                name={'CEP'}
                            />
                        </CepWrapper>
                    </RowView>

                    <Controller
                        control={control}
                        render={({ field: { onChange, value } }) => (
                            <Input
                                name={'Rua'}
                                control={control}
                                error={errors.nome && errors.nome.message}
                                source={require('@assets/icons/pessoa.png')}
                                placeholder={'Rua'}
                                value={value}
                                onChangeText={onChange}
                            />
                        )}
                        name={'Rua'}
                    />

                    <Controller
                        control={control}
                        render={({ field: { onChange, value } }) => (
                            <Input
                                name={'Cidade'}
                                control={control}
                                error={errors.nome && errors.nome.message}
                                source={require('@assets/icons/pessoa.png')}
                                placeholder={'Cidade'}
                                value={value}
                                defaultValue={data?.localidade}
                                onChangeText={onChange}
                            />
                        )}
                        name={'Cidade'}
                    />
                    <Controller
                        control={control}
                        render={({ field: { onChange, value } }) => (
                            <Input
                                name={'Bairro'}
                                control={control}
                                error={errors.nome && errors.nome.message}
                                source={require('@assets/icons/pessoa.png')}
                                placeholder={'Bairro'}
                                value={value}
                                onChangeText={onChange}
                            />
                        )}
                        name={'Bairro'}
                    />
                    <RowView>
                        <StateWrapper>
                            <Controller
                                control={control}
                                render={({ field: { onChange, value } }) => (
                                    <Input
                                        name={'Estado'}
                                        control={control}
                                        error={
                                            errors.nome && errors.nome.message
                                        }
                                        source={require('@assets/icons/pessoa.png')}
                                        placeholder={'Estado'}
                                        value={value}
                                        onChangeText={onChange}
                                    />
                                )}
                                name={'Estado'}
                            />
                        </StateWrapper>
                        <NumberWrapper>
                            <Controller
                                control={control}
                                render={({ field: { onChange, value } }) => (
                                    <Input
                                        name={'Número'}
                                        control={control}
                                        error={
                                            errors.nome && errors.nome.message
                                        }
                                        source={require('@assets/icons/pessoa.png')}
                                        placeholder={'Número'}
                                        value={value}
                                        onChangeText={onChange}
                                    />
                                )}
                                name={'Número'}
                            />
                        </NumberWrapper>
                    </RowView>

                    <Button
                        title="Continuar"
                        onPress={handleSubmit(handleContinue)}
                    />
                </Wrapper>
            </Container>
        </TouchableWithoutFeedback>
    );
}
