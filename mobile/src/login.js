import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Dimensions,
  Image,
  Alert
} from 'react-native';

import { Container, Button, Header, Content, Form, Item, Input, Footer } from 'native-base';

import api from './ApiHandler';

// import Login from './src/login';
const { width: deviceWidth, height: deviceHeight } = Dimensions.get("window");



class Login extends Component {

  constructor(props){
    super(props);
    this.state = {
      email:'mounir.dhahri@ensi-uma.tn',
      password:'logpass'
    }
  }

  login = async () => {
      const { navigate } = this.props.navigation;

      const responseData = await api.login(this.state.email, this.state.password);
      if (responseData.success) {

        Alert.alert(
          'Success',
          responseData.message,
          [
            { text: 'Close', onPress:() =>
              navigate('Home')
             },
          ]
        );
      }
      else {
        Alert.alert(
          'Error',
          responseData.message,
          [
            { text: 'Close', onPress: () => { } },
          ]
        );
      }
    }

  render() {
    const { navigate } = this.props.navigation;
    return (
        <Container>
          <Content>
            <View style={styles.content}>
              <Image style={styles.logo} source={require('./smart.png')}/>
            </View>
            <Form>
              <Item>
                <Input onChangeText={(email) => this.setState({email})}
                       value={this.state.email}
                       autoCorrect={false}
                       placeholder="Email" />
              </Item>
              <Item last>
                <Input
                  onChangeText={(password) => this.setState({password})}
                  value={this.state.password}
                  secureTextEntry={true}
                  placeholder="Password" />
              </Item>
            </Form>
            <Button onPress={()=>this.login()} block success>
            <Text style={{color:'white', fontWeight:'bold'}}>Login</Text>
            </Button>
            <View style={{alignItems:'center', marginTop:120}}>
              <Text
                onPress={() =>
                  navigate('SignUp')
                }
                style={{color:'#999', fontWeight:'bold', fontSize:17}}>
                Sign up
              </Text>
            </View>
          </Content>
        </Container>
    );
  }
}





const styles = StyleSheet.create({
  content:{
    flex:1,
    justifyContent:'center',
    alignItems:'center'
  },
  logo:{
    resizeMode:'contain',
    height:300
  }
})


module.exports = Login;
