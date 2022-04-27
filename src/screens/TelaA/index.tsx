import React from 'react'
import { Button, Text, View } from 'react-native'

export function TelaA({ navigation }: any) {
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'red' }}>
            <Text style={{ fontSize: 36 }}>Tela A</Text>
            <Button title='Ir para tela B' onPress={() => navigation.navigate('Tela B')} />
        </View>
    )
}
