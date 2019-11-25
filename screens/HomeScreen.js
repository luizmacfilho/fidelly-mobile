import React from 'react';
import { ScrollView, StyleSheet, View, FlatList, Text, SafeAreaView, ActivityIndicator, StatusBar } from 'react-native';
import { CCard } from '../components';
import { db, getUser } from '../firebase/mobile';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  contentContainer: {
    paddingVertical: 8,
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
  message: {
    paddingVertical: 16,
    paddingHorizontal: 40,
    textAlign: "center",
  },
  loading: {
    paddingVertical: 16,
  },
});

const DATA = [
  {
    id: 'asdfas',
    name: 'Padaria Pão Doce',
    amount: 3,
    remaining: 1,
  }
];

const Card = (props) => {
  const remaining = (
    <Text style={styles.cardDescription}>
      <Text>Falta{props.remaining > 1 ? 'm' : ''} {props.remaining}</Text>
      <Text> selo{props.remaining > 1 ? 's' : ''} para garantir uma recompensa!</Text>
    </Text>
  );
  const reward = (
    <Text style={styles.cardDescription}>Tem uma recompensa esperando por você!</Text>
  );
  return (
    <CCard onPress={() => props.onPress()}>
      <Text style={styles.cardTitle}>{props.name}</Text>
      <Text style={[styles.cardDescription, styles.cardAmount]}>
        Você possui {props.amount} selo{props.amount > 1 ? 's' : ''}.
      </Text>
      {props.remaining > 0 ? remaining : reward}
    </CCard>
  );
}

export default class HomeScreen extends React.Component {
  static navigationOptions = {
    title: 'Início'
  };

  constructor(props) {
    super(props);
    this.state = { loading: false, cards: []}
  }

  render() {
    return (
      <View style={styles.container}>
        {this.state.loading
          ? <View style={styles.loading}>
            <ActivityIndicator />
            <StatusBar barStyle="default" />
          </View>
          : null}
        {!this.state.loading && !this.state.cards.length
          ? <Text style={styles.message}>Você ainda não possui nenhum selo.</Text>
          : null}
        {!this.state.loading && this.state.cards.length
          ? <ScrollView
            style={styles.container}
            contentContainerStyle={styles.contentContainer}>
            <SafeAreaView>
              <FlatList
                data={this.state.cards}
                renderItem={
                  ({ item: { name, amount, remaining, id, storeId } }) =>
                  <Card
                    name={name}
                    amount={amount}
                    remaining={remaining}
                    onPress={() => this._goToCardInfo(id, name, amount, storeId)}>
                  </Card>}
                keyExtractor={item => item.id}
              />
            </SafeAreaView>
          </ScrollView>
          : null}
      </View>
    );
  }

  _goToCardInfo = (id, name, amount) => {
    this.props.navigation.navigate('CardInfo', { id, name, amount, storeId });
  }

  componentDidMount() {
    const user = getUser();
    if (user) {
      const collection = db.collection('cards').doc(user.uid);
      collection.get().then((doc) => {
        if (doc.exists) {
          this.setState({ cards: doc.data() });
        }
      });
    }
  }

  onChange = (search) => {
    if (search) {
      this.setState({ search, loading: true });
      this.collection.get().then((querySnapshot) => {
        const stores = [];
        querySnapshot.forEach((doc) => {
          const data = doc.data();
          if (data.name.toLowerCase().indexOf(search.toLowerCase()) !== -1) {
            stores.push({ id: doc.id, ...data });
          }
        });
        this.setState({ stores, loading: false });
      });
    } else {
      this.setState({ search, stores: [], loading: false });
    }
  }
}
