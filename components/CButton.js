import React from 'react';
import { TouchableWithoutFeedback, Text, View, StyleSheet } from 'react-native';
import Colors from '../constants/Colors';

const styles = StyleSheet.create({
  button: {
    height: 36,
    minWidth: 64,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.primary,
    paddingHorizontal: 16,
    borderRadius: 4,
  },
  buttonText: {
    color: 'white',
    fontWeight: '500',
    textTransform: 'uppercase',
  },
});

export default (props) => {
  return (
    <TouchableWithoutFeedback
      onPress={props.onPress}
      >
      <View style={[styles.button, props.style]}>
        <Text style={styles.buttonText}>{props.label}</Text>
      </View>
    </TouchableWithoutFeedback>
  );
}
