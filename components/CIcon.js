import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import { TouchableWithoutFeedback } from 'react-native';

export default class CIcon extends React.Component {

  render() {
    return (
      <TouchableWithoutFeedback onPress={() => this.props.onPress()}>
        <Ionicons
          style={this.props.style}
          name={this.props.name}
          size={26}
        />
      </TouchableWithoutFeedback>
    );
  };
}