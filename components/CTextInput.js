import React from 'react';
import { Text, View, TextInput, StyleSheet } from 'react-native';
import Colors from '../constants/Colors';

const styles = StyleSheet.create({
  input: {
    marginBottom: 12,
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 2,
  },
  inputField: {
    height: 32,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 4,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  inputError: {
    height: 12,
    fontSize: 12,
    fontWeight: '500',
    marginTop: 2,
    color: Colors.danger
  },
});

export default (props) => {
  const _default = { label: '', keyboardType: 'default', error: '', password: false };
  props = { ..._default, ...props };
  return (
    <View style={styles.input}>
      <Text style={styles.inputLabel}>{props.label}</Text>
      <TextInput
        style={styles.inputField}
        secureTextEntry={props.password}
        keyboardType={props.keyboardType} />
      <Text style={styles.inputError}>{props.error}</Text>
    </View>
  );
}