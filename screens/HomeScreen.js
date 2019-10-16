import React from 'react';
import { ScrollView, StyleSheet, View, FlatList, Text } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  contentContainer: {},
});

const DATA = [
  {
    id: '1',
    title: 'Estabelecimento',
    selos: 12,

  }
]

export default class HomeScreen extends React.Component {
  static navigationOptions = {
    header: null
  };

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={styles.container}>
        <ScrollView
          style={styles.container}
          contentContainerStyle={styles.contentContainer}>
          <FlatList
            data={DATA}
            renderItem={({ item }) => <Text>{item.title}</Text>}
            keyExtractor={item => item.id}
          />
        </ScrollView>
      </View>
    );
  }
}
