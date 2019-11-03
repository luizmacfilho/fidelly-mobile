import React from 'react';
import { ScrollView, StyleSheet, View, FlatList, Text, TouchableWithoutFeedback, SafeAreaView } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  contentContainer: {
    paddingVertical: 8,
  },
  card: {
    borderRadius: 0,
    marginVertical: 8,
    marginHorizontal: 16,
    padding: 16,
    shadowRadius: 4,
    shadowOffset: { width: 10, height: 10 },
    shadowColor: '#ccc',
    shadowOpacity: 1,
    elevation: 3,
    // background color must be set
    backgroundColor : "white" // invisible color
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: '400',
    marginBottom: 4,
    color: '#353535'
  },
  cardDescription: {
    color: '#797979',
    fontSize: 14,
  },
  cardAmount: {
    color: '#797979',
    fontSize: 18,
    marginBottom: 4,
  },
});

const DATA = [
  {
    id: 'asdfasdf',
    name: 'Salão do Bochecha',
    amount: 5,
    remaining: 5,
  },
  {
    id: 'asdfasdf1',
    name: 'Tarso\'s Restaurante',
    amount: 1,
    remaining: 0,
  },
  {
    id: 'asdfa23sdsdfsdf1',
    name: 'Tarso\'s Restaurante',
    amount: 10,
    remaining: 0,
  },
  {
    id: 'asdfsd23asdf1',
    name: 'Tarso\'s Restaurante',
    amount: 10,
    remaining: 0,
  },
  {
    id: 'asdf123sdasdf1',
    name: 'Tarso\'s Restaurante',
    amount: 10,
    remaining: 2,
  },
  {
    id: 'asdf321sdfasdf1',
    name: 'Tarso\'s Restaurante',
    amount: 10,
    remaining: 1,
  }
];

const Card = (props) => {
  const remaining = (
    <Text style={styles.cardDescription}>
      <Text>Falta{props.remaining > 0 ? 'm' : ''} {props.remaining}</Text>
      <Text> selo{props.remaining > 0 ? 's' : ''} para garantir uma recompensa!</Text>
    </Text>
  );
  const reward = (
    <Text style={styles.cardDescription}>Tem uma recompensa esperando por você!</Text>
  );
  return (
    <TouchableWithoutFeedback onPress={() => props.onPress()}>
      <View style={styles.card}>
        <Text style={styles.cardTitle}>{props.name}</Text>
        <Text style={[styles.cardDescription, styles.cardAmount]}>
          Você possui {props.amount} selo{props.amount > 1 ? 's' : ''}.
        </Text>
        {props.remaining > 0 ? remaining : reward}
      </View>
    </TouchableWithoutFeedback>
  );
}

export default class HomeScreen extends React.Component {
  static navigationOptions = {
    title: 'Home'
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
          <SafeAreaView>
            <FlatList
              data={DATA}
              renderItem={
                ({ item: { name, amount, remaining, id } }) =>
                <Card
                  name={name}
                  amount={amount}
                  remaining={remaining}
                  onPress={() => this._goToCardInfo(id, name, amount)}>
                </Card>}
              keyExtractor={item => item.id}
            />
          </SafeAreaView>
        </ScrollView>
      </View>
    );
  }

  _goToCardInfo = (id, name, amount) => {
    this.props.navigation.navigate('CardInfo', { id, name, amount });
  }
}
