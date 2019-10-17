import React from 'react';
import { CTextInput, CButton, CDivider, CLink } from '../components';
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
  signIn: {
    alignItems: 'center',
  },
});

export default class SignUpScreen extends React.Component {
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
          <CTextInput label="Nome"></CTextInput>
          <CTextInput label="Sobrenome"></CTextInput>
          <CTextInput label="E-mail" keyboardType="email-address"></CTextInput>
          <CTextInput label="Senha" password={true}></CTextInput>
          <CTextInput label="Telefone" keyboardType="numeric"></CTextInput>
          <CButton label="Criar conta" onPress={this._signUp}></CButton>
          <CDivider />
          <CLink style={styles.signIn} label="Fazer login" onPress={this._openSingIn}></CLink>
        </View>
      </View>
    );
  }

  _signUp = () => {
    this.props.navigation.navigate('Main');
  };

  _openSingIn = () => {
    this.props.navigation.goBack();
  };

}