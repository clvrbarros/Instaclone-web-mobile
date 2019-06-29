import React from 'react';
import { createAppContainer, createStackNavigator } from 'react-navigation';
import { Image } from 'react-native';

import Feed from './pages/Feed'; 
import New from './pages/New';   
import logo from './assets/logo.png';

export default createAppContainer(
    createStackNavigator({ //ROUTES
        Feed,
        New,
    },{
        initialRouteName: 'Feed',
        defaultNavigationOptions: {
            headerTitle: <Image style={{marginHorizontal: 150}} source={logo} />,
            headerBackTitle: null,
        },
        mode: 'modal' 
    })
);