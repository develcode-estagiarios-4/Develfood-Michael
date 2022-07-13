import React, { useEffect } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Home } from '@screens/TabNavigator/Home';
import { Favorites } from '@screens/TabNavigator/Favorites';
import { TabBar } from '@components/TabBar';
import { Profile } from '@screens/TabNavigator/Profile';
import { Historic } from '@screens/TabNavigator/Historic';
import theme from '../styles/theme';
import { Image, Text, TextBase } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { TabBarLabel } from './styles';
import { BorderlessButton, RectButton } from 'react-native-gesture-handler';

export function TabScreenRoutes({ navigation }: any) {
    const { Navigator, Screen } = createBottomTabNavigator();

    return (
        <>
            <Navigator
                screenOptions={{
                    headerShown: false,
                    tabBarStyle: {
                        height: RFValue(50),
                        paddingBottom: RFValue(5),
                    },
                    tabBarButton: (props) => (
                        <BorderlessButton
                            {...props}
                            rippleRadius={50}
                            style={{ flex: 1, alignItems: 'center' }}
                        />
                    ),
                }}
            >
                <Screen
                    name="Inicio"
                    component={Home}
                    options={{
                        tabBarIcon: ({ focused }) => (
                            <Image
                                source={theme.images.home}
                                style={{
                                    tintColor: focused
                                        ? theme.colors.icon_red
                                        : theme.colors.icon_gray,
                                    width: focused ? RFValue(28) : RFValue(24),
                                    height: focused ? RFValue(28) : RFValue(24),
                                }}
                            />
                        ),
                        tabBarLabel: ({ focused }) =>
                            focused ? (
                                <TabBarLabel></TabBarLabel>
                            ) : (
                                <TabBarLabel>Início</TabBarLabel>
                            ),
                    }}
                />
                <Screen
                    name="Favoritos"
                    component={Favorites}
                    options={{
                        tabBarIcon: ({ focused }) => (
                            <Image
                                source={theme.images.favorites}
                                style={{
                                    tintColor: focused
                                        ? theme.colors.icon_red
                                        : theme.colors.icon_gray,
                                    width: focused ? RFValue(28) : RFValue(24),
                                    height: focused ? RFValue(28) : RFValue(24),
                                }}
                            />
                        ),
                        tabBarLabel: ({ focused }) =>
                            focused ? (
                                <TabBarLabel></TabBarLabel>
                            ) : (
                                <TabBarLabel>Favoritos</TabBarLabel>
                            ),
                    }}
                />
                <Screen
                    name="Orders"
                    component={Historic}
                    options={{
                        unmountOnBlur: true,
                        tabBarIcon: ({ focused }) => (
                            <Image
                                source={theme.images.orders}
                                style={{
                                    tintColor: focused
                                        ? theme.colors.icon_red
                                        : theme.colors.icon_gray,
                                    width: focused ? RFValue(28) : RFValue(24),
                                    height: focused ? RFValue(28) : RFValue(24),
                                }}
                            />
                        ),
                        tabBarLabel: ({ focused }) =>
                            focused ? (
                                <TabBarLabel></TabBarLabel>
                            ) : (
                                <TabBarLabel>Pedidos</TabBarLabel>
                            ),
                    }}
                />
                <Screen
                    name="Perfil"
                    component={Profile}
                    options={{
                        tabBarIcon: ({ focused }) => (
                            <Image
                                source={theme.images.profile}
                                style={{
                                    tintColor: focused
                                        ? theme.colors.icon_red
                                        : theme.colors.icon_gray,
                                    width: focused ? RFValue(28) : RFValue(24),
                                    height: focused ? RFValue(28) : RFValue(24),
                                }}
                            />
                        ),
                        tabBarLabel: ({ focused }) =>
                            focused ? (
                                <TabBarLabel></TabBarLabel>
                            ) : (
                                <TabBarLabel>Perfil</TabBarLabel>
                            ),
                    }}
                />
            </Navigator>
        </>
    );
}
