import React from 'react';
import { CTextInput, CButton, CLink, CDivider } from '../components';
import { StyleSheet, View } from 'react-native';

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

  constructor(props) {
    super(props);
    this.state = { email: '', password: '' };
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.content}>

          <CTextInput label="E-mail" keyboardType="email-address"></CTextInput>
          <CTextInput label="Senha" password={true}></CTextInput>
          <CButton style={styles.sendButton} label="Enviar" onPress={this._signIn}></CButton>
          <CLink style={styles.content} label="Esqueceu sua senha?" onPress={this._openForgotPasswordPage}></CLink>
          <CDivider />
          <CLink style={styles.createAccount} label="Criar uma conta" onPress={this._openSingUp}></CLink>
        </View>
      </View>
    );
  }

  _signIn = async () => {
    this.props.navigation.navigate('Main');
  };

  _openForgotPasswordPage = () => {
    this.props.navigation.navigate('ForgotPassword');
  }

  _openSingUp = () => {
    this.props.navigation.navigate('SignUp');
  }

}