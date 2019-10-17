import React from 'react';
import { CTextInput, CButton, CDivider, CLink } from '../components';
import { StyleSheet, View, Text } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    width: 320,
  },
  message: {
    fontWeight: '500',
    marginBottom: 16,
  },
  signIn: {
    alignItems: 'center',
  },
});

export default class ForgotPasswordScreen extends React.Component {
  static navigationOptions = {
    header: null
  };

  constructor(props) {
    super(props);
    this.state = { email: '' };
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.content}>
          <Text style={styles.message}>Digite seu endereço de e-mail e nós enviaremos um link para recuperar sua senha.</Text>
          <CTextInput label="E-mail" keyboardType="email-address"></CTextInput>
          <CButton style={styles.sendButton} label="Enviar" onPress={this._sendRecoveryPasswordLink}></CButton>
          <CDivider />
          <CLink style={styles.signIn} label="Fazer login" onPress={this._openSingIn}></CLink>
        </View>
      </View>
    );
  }

  _sendRecoveryPasswordLink = async () => {
    this.props.navigation.navigate('Main');
  };

  _openSingIn = () => {
    this.props.navigation.goBack();
  };

}