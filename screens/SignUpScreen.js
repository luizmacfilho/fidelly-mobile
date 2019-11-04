import React from 'react';
import { CTextInput, CButton, CDivider, CLink } from '../components';
import { StyleSheet, View } from 'react-native';
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
  signIn: {
    alignItems: 'center',
  },
});

export default class SignUpScreen extends React.Component {
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
    password: this.required.concat([
      (value) => value.length > 5 || 'Senha deve ter no mínimo 6 caracteres',
    ]),
    firstName: this.required,
    lastName: this.required,
  };

  constructor(props) {
    super(props);
    this.state = { email: '', password: '', firstName: '', lastName: '', emailError: '', loading: false };
    this.firstNameInput = React.createRef();
    this.lastNameInput = React.createRef();
    this.emailInput = React.createRef();
    this.passwordInput = React.createRef();
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.content}>
          <CTextInput ref={this.firstNameInput} label="Nome" rules={this.required} onChange={(firstName) => this.setState({ firstName })}></CTextInput>
          <CTextInput ref={this.lastNameInput} label="Sobrenome" rules={this.required} onChange={(lastName) => this.setState({ lastName })}></CTextInput>
          <CTextInput ref={this.emailInput} label="E-mail" rules={this.rules.email} error={this.state.emailError} keyboardType="email-address" onChange={(email) => this.setState({ email })}></CTextInput>
          <CTextInput ref={this.passwordInput} label="Senha" rules={this.rules.password} password={true} onChange={(password) => this.setState({ password })}></CTextInput>
          <CButton label="Criar conta" onPress={this._signUp} loading={this.state.loading}></CButton>
          <CDivider />
          <CLink style={styles.signIn} label="Fazer login" onPress={() => this._openSingIn()}></CLink>
        </View>
      </View>
    );
  }

  _signUp = async () => {
    const { email, password, firstName, lastName } = this.state;
    this.setState({ emailError: '' });
    let valid = this.passwordInput.current.isValid();
    valid = this.emailInput.current.isValid() && valid;
    valid = this.firstNameInput.current.isValid() && valid;
    valid = this.lastNameInput.current.isValid() && valid;
    if (valid) {
      try {
        this.setState({ loading: true });
        await firebase.auth().createUserWithEmailAndPassword(email, password);
        const user = firebase.auth().currentUser;
        await user.updateProfile({ displayName: `${firstName} ${lastName}` });
        this.setState({ loading: false });
        this.props.navigation.navigate('Main');
      } catch (error) {
        const emailError = error.code === 'auth/email-already-in-use'
        ? 'Endereço de e-mail já cadastrado'
        : error.message;
        this.setState({ emailError, loading: false });
      }
    }
  };

  _openSingIn = () => {
    this.props.navigation.goBack();
  }

}