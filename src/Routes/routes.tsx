import React, { useEffect } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Home } from '@screens/TabNavigator/Home';
import { Favorites } from '@screens/TabNavigator/Favorites';
import { TabBar } from '@components/TabBar';
import { Profile } from '@screens/TabNavigator/Profile';
import { Historic } from '@screens/TabNavigator/Historic';
import { Image, StyleSheet } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import theme from '../styles/theme';

export function TabScreenRoutes({navigation}: any) {
    const { Navigator, Screen } = createBottomTabNavigator();
    return (
        <>
            <Navigator screenOptions={{ headerShown: false }}>
                <Screen
                    name="Inicio"
                    component={Home}
                    options={{
                        tabBarLabel: 'Inicio',
                        tabBarIcon: ({ color, size, focused }) => (
                            <Image source={require('@assets/icons/home.png')} style={[styles.home, {
                                tintColor: focused ? theme.colors.icon_red : theme.colors.icon_gray,
                            }]}/>
                        )
                    }}
                />
                <Screen
                    name="Favoritos"
                    component={Favorites}
                />
                <Screen
                    name="Historico"
                    component={Historic}
                />
                <Screen
                    name="Perfil"
                    component={Profile}
                />
            </Navigator>
        </>
    );
}

const styles = StyleSheet.create({
    home: {
        width: RFValue(28),
        height: RFValue(28),
    }
})