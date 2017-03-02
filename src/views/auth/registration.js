import {
  AppRegistry,
  TextInput,
  Text,
  View,
  StyleSheet,
  TouchableWithoutFeedback,
  Image,
  ScrollView
} from "react-native";
import React, {Component} from "react";
import * as firebase from "firebase";
import {Actions} from 'react-native-router-flux';
import {Button} from 'react-native-elements';

import Colors from '../../config/colors';


export default class Registration extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      nickname: '',
      password: '',
      password2: '',
      response: ''
    };

    this.signup = this.signup.bind(this);
    this.login = this.login.bind(this);
  }

  async signup() {
    try {
      await firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.password);

      this.setState({
        response: "account created"
      });

      setTimeout(() => {
        Actions.account();
      }, 1500);

    } catch (error) {
      this.setState({
        response: error.toString()
      })
    }
  }

  goBack() {
    Actions.pop();
  }

  async loginWithFacebook() {
    console.log('loginWithFacebook');
  }

  async login() {
    try {
      await firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password);

      this.setState({
        response: "Logged In!"
      });

      setTimeout(() => {
        Actions.account({type: 'reset'});
      }, 1500);

    } catch (error) {
      this.setState({
        response: error.toString()
      })
    }

  }

  render() {
    return (
      <Image
        source={require('../../../assets/img/background.png')}
        style={styles.container}>
        <ScrollView>
          <View style={styles.logoWrapper}>
            <Image style={styles.logo} source={require('../../../assets/img/logo.png')}/>
            <Text style={styles.h1}>
              LEAF PROJECT
            </Text>
            <Text style={styles.h2}>
              Learn nature.
            </Text>
          </View>

          <View style={styles.buttonsWrapper}>
            <Button
              onPress={this.loginWithFacebook}
              buttonStyle={styles.button}
              title='Sign in with facebook'
              backgroundColor='#3b5998'
              icon={{name: 'facebook', type: 'font-awesome'}}>
            </Button>

            <Text style={styles.divider}>- or -</Text>

            <TextInput
              style={styles.input}
              placeholder="Nickname"
              placeholderTextColor="rgba(255,255,255,0.8)"
              value={this.state.nickname}
              onChangeText={(nickname) => this.setState({nickname})}
            />

            <TextInput
              style={styles.input}
              placeholder="E-mail"
              placeholderTextColor="rgba(255,255,255,0.8)"
              value={this.state.email}
              onChangeText={(email) => this.setState({email})}
            />

            <TextInput
              style={styles.input}
              placeholder="Password"
              placeholderTextColor="rgba(255,255,255,0.8)"
              secureTextEntry={true}
              value={this.state.password}
              onChangeText={(password) => this.setState({password})}
            />

            <TextInput
              style={styles.input}
              placeholder="Password again"
              placeholderTextColor="rgba(255,255,255,0.8)"
              secureTextEntry={true}
              value={this.state.password2}
              onChangeText={(password2) => this.setState({password2})}
            />

            <Button
              onPress={this.login}
              buttonStyle={styles.button}
              backgroundColor='#2DDE98'
              title='Sign in'>
            </Button>

            <Text style={styles.goBack} onPress={this.goBack}>Go back</Text>

          </View>
        </ScrollView>
      </Image>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-around',
    alignItems: 'stretch',
    backgroundColor: 'transparent'
  },

  logoWrapper: {
    alignItems: 'center'
  },

  logo: {
    marginTop: 30,
    marginBottom: 15
  },

  h1: {
    fontSize: 25,
    fontWeight: '700',
    marginTop: 10,
    color: '#fff'
  },

  h2: {
    fontSize: 20,
    fontStyle: 'italic',
    color: '#fff'
  },

  button: {
    height: 50,
    borderRadius: 5,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 15,
    opacity: 0.9,
    borderWidth: 0,
  },

  divider: {
    color: 'rgba(255,255,255,0.8)',
    textAlign: 'center',
    marginTop: 15
  },

  input: {
    color: 'rgba(255,255,255,1)',
    height: 50,
    borderColor: 'rgba(255,255,255,0.5)',
    borderWidth: 1,
    marginHorizontal: 15,
    borderRadius: 5,
    marginTop: 15,
    padding: 15
  },

  goBack: {
    color: Colors.whiteMain,
    marginTop: 20,
    textAlign: 'center'
  }
});