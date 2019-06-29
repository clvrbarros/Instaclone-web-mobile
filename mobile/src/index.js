import React from 'react';
import { YellowBox } from 'react-native';
import Routes from './routes';

YellowBox.ignoreWarnings([
    'VirtualizedList',
    'Unrecognized WebSocket'
])

export default function App() {
    return <Routes />
}