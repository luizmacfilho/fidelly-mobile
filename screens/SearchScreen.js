import React from 'react';
import { CTextInput } from '../components';
import { ScrollView, StyleSheet, View, TextInput, Text } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: '#fff',
  },
});

export default class SearchScreen extends React.Component {
  static navigationOptions = {
    headerTitle: <CTextInput />,
    headerStyle: {
      boxShadow: 'none'
    },
  };

  render() {
    return (
      <View>
        <View>
          <TextInput placeholder='search' />
        </View>
        <ScrollView style={styles.container}>

        </ScrollView>
      </View>
    );
  }
}
