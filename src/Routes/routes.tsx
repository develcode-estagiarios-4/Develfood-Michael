import React, { useEffect } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Home } from '@screens/TabNavigator/Home';
import { Favorites } from '@screens/TabNavigator/Favorites';
import RNBootSplash from 'react-native-bootsplash';
import { TabBar } from '@components/TabBar';
import { Profile } from '@screens/TabNavigator/Profile';
import { Historic } from '@screens/TabNavigator/Historic';

export function AppRoutes() {
    const { Navigator, Screen } = createBottomTabNavigator();

    useEffect(() => {
        RNBootSplash.hide({ fade: true });
    }, []);

    return (
        <>
            <Navigator screenOptions={{ headerShown: false }}>
                <Screen
                    name="Inicio"
                    component={Home}
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
            <TabBar />
        </>
    );
}
