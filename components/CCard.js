import React from 'react';
import { TouchableWithoutFeedback, View, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  card: {
    marginVertical: 8,
    marginHorizontal: 16,
    padding: 16,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 3,
    backgroundColor: 'white',
  },
});

export default class CCard extends React.Component {
  render() {
    return (
      <TouchableWithoutFeedback onPress={this.props.onPress && (() => this.props.onPress())}>
        <View style={styles.card}>
          {this.props.children}
        </View>
      </TouchableWithoutFeedback>
    );
  }
}
