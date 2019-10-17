import React from 'react';
import { TouchableWithoutFeedback, Text, View, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  link: {},
  linkText: {
    color: '#1976d2',
    textDecorationLine: 'underline',
  },
});

export default (props) => {
  return (
    <TouchableWithoutFeedback
      onPress={props.onPress}
      >
      <View style={[styles.link, props.style]}>
        <Text style={styles.linkText}>{props.label}</Text>
      </View>
    </TouchableWithoutFeedback>
  );
}