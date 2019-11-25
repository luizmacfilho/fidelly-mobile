import React from 'react';
import { View, StyleSheet, ActivityIndicator, StatusBar } from 'react-native';
import * as firebase from 'firebase/app';
import { setUser, getUser } from '../firebase/mobile';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default class AuthLoadingScreen extends React.Component {
  static navigationOptions = {
    header: null
  };

  constructor() {
    super();
    firebase.auth().onAuthStateChanged((user) => {
      setUser(user);
      this.props.navigation.navigate(user ? 'Main' : 'Auth');
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <ActivityIndicator />
        <StatusBar barStyle="default" />
      </View>
    );
  }
}