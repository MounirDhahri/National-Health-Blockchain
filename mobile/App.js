/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Dimensions,
  Image,
  Button,
  Alert
} from 'react-native';

import Login from './src/login';
import SignUp from './src/signup';
import Home from './src/home';

import {
  StackNavigator,
} from 'react-navigation';


const BasicApp = StackNavigator({
  Login: {
    screen: Login,
    navigationOptions: {
        headerTitle: 'Welcome',
      },},
  SignUp: {
    screen: SignUp,
    navigationOptions: {
        headerTitle: 'Sign Up',
      },},
  Home: {
    screen: Home,
    navigationOptions: ({ navigation})=>({
        headerTitle: 'Home',
        headerRight:<Button title='Sign Out' onPress={() => navigation.navigate('Login')} />
      }),},
});

module.exports = BasicApp;
