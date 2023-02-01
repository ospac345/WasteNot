/**
 * @format
 */

import App from './App';
import { AppRegistry } from 'react-native';
import { name as appName } from './app.json';
import React from 'react';



const Application = () => (

    <App />

);

AppRegistry.registerComponent(appName, () => Application);

