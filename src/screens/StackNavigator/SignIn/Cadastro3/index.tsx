import React, { useContext, useEffect, useRef, useState } from 'react';
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
import { Alert, Keyboard, View } from 'react-native';
import { MaskedInput } from '@components/MaskedInput';
import { useCep } from '@services/ViaCep/cepApi';
import { useNavigation } from '@react-navigation/native';
import { AuthContext } from '@context/auth';
import theme from '@styles/theme';

interface RequestProps {
    endpoint: string;
}

export function Cadastro3({ route }: any) {
    const [cep, setCep] = useState('');
    const [request, setRequest] = useState({} as RequestProps);
    const [isError, setIsError] = useState(false);
    const { data, handleCep } = useCep(request.endpoint);
    const navigation = useNavigation();
    const { email, password, firstName, lastName, cpf, phone } = route.params;

    const { signUp, loading } = useContext(AuthContext);

    function onSuccess(data: any) {
        data.localidade
            ? (setIsError(false), console.log('isError agora é false'))
            : (setIsError(true), console.log('isError agora é true'));
    }

    const schema = yup.object().shape({
        apelido: yup.string().required('Campo obrigatório'),
        cep: yup.string().min(9, 'Cep inválido').test('is-cep', 'Cep inválido', () => !isError),
        rua: yup.string().required('Campo obrigatório'),
        cidade: yup.string().required('Campo obrigatório'),
        bairro: yup.string().required('Campo obrigatório'),
        estado: yup.string().required('Campo obrigatório'),
        numero: yup
            .number()
            .required('Campo obrigatório')
            .typeError('Insira um número'),
    });

    const {
        control,
        handleSubmit,
        getValues,
        formState: { errors },
        setValue,
        reset,
        clearErrors,
    } = useForm({
        resolver: yupResolver(schema),
    });

    useEffect(() => {
        !!request.endpoint && handleCep(onSuccess);
    }, [request]);

    useEffect(() => {
         setValue('rua', data.logradouro);
         setValue('cidade', data.localidade);
         setValue('bairro', data.bairro);
         setValue('estado', data.uf);
         setValue('cep', cep);
     }, [data]);

    function handleContinue() {
        const values = getValues();

        signUp({
            email,
            password,
            firstName,
            lastName,
            cpf,
            phone,
            photo: {
                code: ''
            },
            street: values.rua,
            number: values.numero,
            neighborhood: values.bairro,
            city: values.cidade,
            zipcode: values.cep,
            state: values.estado,
            nickname: values.apelido,
        } as never);
    }

    function handleCepInput() {
        setRequest({ endpoint: `/${cep}/json/` });
    }

    return (
        <TouchableWithoutFeedback
            style={{ flex: 1 }}
            containerStyle={{ flex: 1 }}
            onPress={Keyboard.dismiss}
        >
            <Header
                source={require('@assets/icons/back.png')}
                onPress={() => {
                    navigation.goBack();
                }}
                color={theme.colors.headerSecondary}
                title={'Cadastro'}
            />
            <Container>
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
                                        name={'apelido'}
                                        control={control}
                                        error={
                                            errors.apelido &&
                                            errors.apelido.message
                                        }
                                        source={require('@assets/icons/localizacao.png')}
                                        placeholder={'Apelido do End.'}
                                        value={value}
                                        onChangeText={onChange}
                                        editable={!loading}
                                    />
                                )}
                                name={'apelido'}
                            />
                        </NicknameWrapper>

                        <CepWrapper>
                            <Controller
                                control={control}
                                render={({ field: { onChange, value } }) => (
                                    <MaskedInput
                                        name={'cep'}
                                        type={'zip-code'}
                                        control={control}
                                        error={errors.cep && errors.cep.message}
                                        source={require('@assets/icons/localizacao.png')}
                                        placeholder={'CEP'}
                                        value={value}
                                        onChangeText={(text) => {
                                            onChange;
                                            setCep(text);
                                        }}
                                        onEndEditing={() => {
                                            handleCepInput();
                                        }}
                                        editable={!loading}
                                    />
                                )}
                                name={'cep'}
                            />
                        </CepWrapper>
                    </RowView>

                    <Controller
                        control={control}
                        render={({ field: { onChange, value } }) => (
                            <Input
                                name={'rua'}
                                control={control}
                                error={errors.rua && errors.rua.message}
                                source={require('@assets/icons/localizacao.png')}
                                placeholder={'Rua'}
                                value={value}
                                onChangeText={onChange}
                                editable={!loading}
                            />
                        )}
                        name={'rua'}
                    />

                    <Controller
                        control={control}
                        render={({ field: { onChange, value } }) => (
                            <Input
                                name={'cidade'}
                                control={control}
                                error={errors.cidade && errors.cidade.message}
                                source={require('@assets/icons/localizacao.png')}
                                placeholder={'Cidade'}
                                value={value}
                                onChangeText={(text) => {
                                    console.log(text);
                                    onChange;
                                }}
                                editable={!loading}
                            />
                        )}
                        name={'cidade'}
                    />
                    <Controller
                        control={control}
                        render={({ field: { onChange, value } }) => (
                            <Input
                                name={'bairro'}
                                control={control}
                                error={errors.bairro && errors.bairro.message}
                                source={require('@assets/icons/localizacao.png')}
                                placeholder={'Bairro'}
                                value={value}
                                onChangeText={onChange}
                                editable={!loading}
                            />
                        )}
                        name={'bairro'}
                    />
                    <RowView>
                        <StateWrapper>
                            <Controller
                                control={control}
                                render={({ field: { onChange, value } }) => (
                                    <Input
                                        name={'estado'}
                                        control={control}
                                        error={
                                            errors.estado &&
                                            errors.estado.message
                                        }
                                        source={require('@assets/icons/localizacao.png')}
                                        placeholder={'Estado'}
                                        value={value}
                                        onChangeText={onChange}
                                        editable={!loading}
                                    />
                                )}
                                name={'estado'}
                            />
                        </StateWrapper>
                        <NumberWrapper>
                            <Controller
                                control={control}
                                render={({ field: { onChange, value } }) => (
                                    <Input
                                        name={'numero'}
                                        control={control}
                                        error={
                                            errors.numero &&
                                            errors.numero.message
                                        }
                                        source={require('@assets/icons/localizacao.png')}
                                        placeholder={'Número'}
                                        value={value}
                                        onChangeText={onChange}
                                        editable={!loading}
                                    />
                                )}
                                name={'numero'}
                            />
                        </NumberWrapper>
                    </RowView>

                    <Button
                        title="Continuar"
                        onPress={handleSubmit(handleContinue)}
                        isLoading={loading}
                        enabled={!loading}
                    />
                </Wrapper>
            </Container>
        </TouchableWithoutFeedback>
    );
}
