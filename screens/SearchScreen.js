import React from 'react';
import { ScrollView, StyleSheet, View, TextInput } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: '#fff',
  },
});

export default class SearchScreen extends React.Component {
  static navigationOptions = {
    header: null,
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
