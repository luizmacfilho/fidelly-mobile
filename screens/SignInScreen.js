import React from 'react';
import { StyleSheet, View, Text, TextInput, Button } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {},
});

export default class SignInScreen extends React.Component {
  static navigationOptions = {
    header: null
  };

  constructor(props) {
    super(props);
    this.state = {text: ''};
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.content}>
          <View>
            <Text>Email</Text>
            <TextInput keyboardType='email-address' />
          </View>

          <View>
            <Text>Password</Text>
            <TextInput />
          </View>

          <View>
            <Button title="Send" onPress={this._signIn} />
            <Button title="Login With Google" onPress={() => this._authSocial(this, 'google')} />
            <Button title="Login With Facebook" onPress={() => this._authSocial(this, 'facebook')} />
          </View>

          <View>
            <Text onPress={this._openForgotPasswordPage}>Forgot your password?</Text>
          </View>

          <View>
            <Text onPress={this._openSingUp}>Create an account</Text>
          </View>
        </View>
      </View>
    );
  }

  _signIn = async () => {
    // await AsyncStorage.setItem('userToken', 'abc');
    this.props.navigation.navigate('Main');
  };

  _authSocial = (component, type) => {
    console.log(type)
  }

  _openForgotPasswordPage = () => {
    this.props.navigation.navigate('Main');
  }

  _openSingUp = () => {
    this.props.navigation.navigate('Main');
  }

}