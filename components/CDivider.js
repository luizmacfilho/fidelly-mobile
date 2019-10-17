import React from 'react';
import { View, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  divider: {
    height: 1,
    backgroundColor: '#cacaca',
    marginVertical: 16,
  }
})

export default (props) => {
  return (
    <View style={[styles.divider, props.style]}></View>
  );
}