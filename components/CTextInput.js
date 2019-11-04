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

export default class CTextInput extends React.Component {

  static defaultProps = {
    label: '', keyboardType: 'default', error: '', password: false, rules: [],
  };

  constructor(props) {
    super(props);
    this.state = { value: '', internalError: '' };
  }

  render() {
    return (
      <View style={styles.input}>
        <Text style={styles.inputLabel}>{this.props.label}</Text>
        <TextInput
          onChangeText={(value) => this._onChangeText(value)}
          onBlur={() => this._onBlur()}
          onChange={(event) => this._onChange(event)}
          onFocus={() => this._onFocus()}
          style={styles.inputField}
          secureTextEntry={this.props.password}
          keyboardType={this.props.keyboardType} />
        <Text style={styles.inputError}>{this.props.error || this.state.internalError}</Text>
      </View>
    );
  };

  _onBlur = () => {
    this.isValid();
  };

  _onFocus = () => {
    this.setState({ internalError: '' });
  }

  _onChange = (event) => {
    if (this.props.onChange) {
      this.props.onChange(event.target.value);
    }
  }

  _onChangeText = (value) => {
    this.setState({ value });
  }

  isValid = () => {
    const { value } = this.state;
    if (this.props.rules.length) {
      let error = '';
      for (let i = 0; i < this.props.rules.length; i++) {
        const status = this.props.rules[i](value);
        if (typeof status === 'string') {
          error = status;
          break;
        }
      }
      if (error.length) {
        this.setState({ internalError: error });
        return false;
      }
    } else {
      this.setState({ internalError: '' });
    }
    return true;
  }
}
