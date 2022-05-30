import { useIsFocused } from '@react-navigation/native'
import React from 'react'
import { StatusBar, StatusBarProps, Text } from 'react-native'

export function FocusAwareStatusBar(props: StatusBarProps) { 

    const isFocused = useIsFocused();

    return isFocused ? <StatusBar {...props} /> : null;
}