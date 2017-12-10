import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Dimensions,
  Image,
  NavigatorIOS,
  Alert,
  TouchableOpacity,
  Linking
} from 'react-native';

import QRCodeScanner from 'react-native-qrcode-scanner';


import { Container, Button, Header, Content, Form, Item, Input, Footer } from 'native-base';

import api from './ApiHandler';

const { width: deviceWidth, height: deviceHeight } = Dimensions.get("window");



class Home extends Component {
  constructor(props){
    super(props);
    this.state = {
      code:''
    }
  }

  // check = async () => {
  //     const responseData = await api.signup(this.state.email, this.state.password,this.state.firstname, this.state.lastname, "citizen" );
  //     if (responseData.success) {
  //
  //       // this.props.navigation.dispatch(resetAction);
  //       Alert.alert(
  //         'Success',
  //         responseData.message,
  //         [
  //           { text: 'Close', onPress: () => { } },
  //         ]
  //       );
  //     }
  //     else {
  //       Alert.alert(
  //         'Error',
  //         responseData.message,
  //         [
  //           { text: 'Close', onPress: () => { } },
  //         ]
  //       );
  //     }
  //   }
  onSuccess(e) {
      Linking.openURL(e.data).catch(err => console.error('An error occured', err));
    }

  render() {
    const { navigate } = this.props.navigation;
    return (  <NavigatorIOS
          initialRoute={{
            component: QRCodeScanner,
            title: 'Scan Code',
            passProps: {
              onRead: this.onSuccess.bind(this),
              topContent: (
                <Text style={styles.centerText}>
                  National Health Blockchain
                </Text>
              ),
              bottomContent: (
                <TouchableOpacity style={styles.buttonTouchable}>
                  <Text style={styles.buttonText}>OK. Got  it!</Text>
                </TouchableOpacity>
              ),
            },
          }}
          style={{ flex: 1 }}
        />
    );
  }
}





const styles = StyleSheet.create({
centerText: {
   flex: 1,
   fontSize: 18,
   padding: 60,
   color: '#777',
 },

 textBold: {
   fontWeight: '500',
   color: '#000',
 },

 buttonText: {
   fontSize: 21,
   color: 'rgb(0,122,255)',
 },

 buttonTouchable: {
   padding: 16,
 },
})


module.exports = Home;
