import React from 'react'
import { Button, Text, View } from 'react-native'

export function History({ navigation }: any) {
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'red' }}>
            <Text style={{ fontSize: 36 }}>Histórico</Text>
        </View>
    )
}
