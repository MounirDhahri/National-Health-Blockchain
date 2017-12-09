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

const { width: deviceWidth, height: deviceHeight } = Dimensions.get("window");



class SignUp extends Component {
  constructor(props){
    super(props);
    this.state = {
      email:'',
      password:'',
      firstname:'',
      lastname:'',
      role:''
    }
  }

  signup = async () => {
      const responseData = await api.signup(this.state.email, this.state.password,this.state.firstname, this.state.lastname, "citizen" );
      if (responseData.success) {

        // this.props.navigation.dispatch(resetAction);
        Alert.alert(
          'Success',
          responseData.message,
          [
            { text: 'Close', onPress: () => { } },
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

            <Form>
              <Item>
                <Input onChangeText={(email) => this.setState({email})}
                       value={this.state.email}
                       autoCorrect={false}
                       placeholder="Email" />
              </Item>
              <Item>
                <Input onChangeText={(firstname) => this.setState({firstname})}
                       value={this.state.firstname}
                       autoCorrect={false}
                       placeholder="First Name" />
              </Item>
              <Item>
                <Input onChangeText={(lastname) => this.setState({lastname})}
                       value={this.state.lastname}
                       autoCorrect={false}
                       placeholder="Last Name" />
              </Item>
              <Item last>
                <Input
                  onChangeText={(password) => this.setState({password})}
                  value={this.state.password}
                  secureTextEntry={true}
                  placeholder="Password" />
              </Item>
            </Form>
            <Button onPress={()=>this.signup()} block success>
            <Text style={{color:'white', fontWeight:'bold'}}>Sign up</Text>
            </Button>
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


module.exports = SignUp;
