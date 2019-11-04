import React from 'react';
import { CTextInput, CButton, CLink, CDivider } from '../components';
import { StyleSheet, View, KeyboardAvoidingView } from 'react-native';
import * as firebase from 'firebase/app';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    width: 320,
  },
  sendButton: {
    marginBottom: 16,
  },
  divider: {
    height: 1,
    backgroundColor: '#cacaca',
    marginVertical: 16,
  },
  createAccount: {
    alignItems: 'center',
  },
});

export default class SignInScreen extends React.Component {
  static navigationOptions = {
    header: null
  };

  required = [(value) => !!value || 'Campo obrigatório'];
  rules = {
    email: this.required.concat([
      (value) => {
        const regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return regex.test(value) || 'E-mail inválido';
      },
    ]),
    password: this.required,
  };

  constructor(props) {
    super(props);
    this.state = { email: '', password: '', error: '', loading: false };
    this.emailInput = React.createRef();
    this.passwordInput = React.createRef();
  }

  render() {
    return (
      <KeyboardAvoidingView style={styles.container} behavior="padding">
        <View style={styles.content}>
          <CTextInput ref={this.emailInput}   label="E-mail" keyboardType="email-address" rules={this.rules.email} error={this.state.error} onChange={(email) => this.setState({ email })}></CTextInput>
          <CTextInput ref={this.passwordInput}  label="Senha" password={true} rules={this.rules.password} onChange={(password) => this.setState({ password })}></CTextInput>
          <CButton style={styles.sendButton} label="Enviar" onPress={() => this._signIn()} loading={this.state.loading}></CButton>
          <CLink style={styles.content} label="Esqueceu sua senha?" onPress={this._openForgotPasswordPage}></CLink>
          <CDivider />
          <CLink style={styles.createAccount} label="Criar uma conta" onPress={this._openSingUp}></CLink>
        </View>
      </KeyboardAvoidingView>
    );
  }

  _signIn = async () => {
    this.setState({ error: '' });
    const { email, password } = this.state;
    let valid = this.passwordInput.current.isValid();
    valid = this.emailInput.current.isValid() && valid;
    if (valid) {
      this.setState({ loading: true });
      try {
        await firebase.auth().signInWithEmailAndPassword(email, password);
        this.setState({ loading: false });
        this.props.navigation.navigate('Main');
      } catch (error) {
        this.setState({ error: 'E-mail ou senha inválidos', loading: false });
      }
    }
  };

  _openForgotPasswordPage = () => {
    this.props.navigation.navigate('ForgotPassword');
  }

  _openSingUp = () => {
    this.props.navigation.navigate('SignUp');
  }

}