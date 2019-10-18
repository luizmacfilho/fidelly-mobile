import React from 'react';
import { ScrollView, StyleSheet, View, FlatList, Text, TouchableWithoutFeedback } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  contentContainer: {
    marginVertical: 8,
  },
  card: {
    marginVertical: 8,
    marginHorizontal: 16,
    padding: 16,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: '500',
    marginBottom: 4,
    color: '#353535'
  },
  cardDescription: {
    color: '#797979',
    fontSize: 15,
  },
  cardAmount: {
    color: '#797979',
    fontSize: 15,
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
    name: 'Salão do Bochecha',
    amount: 5,
    remaining: 0,
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
          Você possui {props.amount} selo{props.amount > 0 ? 's' : ''}.
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
        </ScrollView>
      </View>
    );
  }

  _goToCardInfo = (id, name, amount) => {
    this.props.navigation.navigate('CardInfo', { id, name, amount });
  }
}
