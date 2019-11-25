import React from 'react';
import { CTextInput, CCard } from '../components';
import { ScrollView, StyleSheet, View, Text, FlatList, ActivityIndicator, StatusBar } from 'react-native';
import Constants from 'expo-constants';
import { admin } from '../firebase/mobile';

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    flex: 1,
    backgroundColor: '#fff',
  },
  storeTitle: {
    fontSize: 16,
    marginBottom: 8,
  },
  storeDescription: {
    color: '#888',
  },
  searchInput: {
    // flex: 1,
    marginBottom: 0,
    marginTop: 16,
    marginHorizontal: 16,
  },
  message: {
    paddingVertical: 16,
    paddingHorizontal: 40,
    textAlign: "center",
  },
  loading: {
    paddingVertical: 16,
  }
});

export default class SearchScreen extends React.Component {

  static navigationOptions = {
    header: null,
  };

  constructor(props) {
    super(props);
    this.state = { search: '', loading: false, stores: [] };
  }

  render() {
    return (
      <View>
        <CTextInput style={styles.searchInput} placeholder="Pesquisar" onChange={(search) => this.onChange(search)} />
        {this.state.loading
          ? <View style={styles.loading}>
            <ActivityIndicator />
            <StatusBar barStyle="default" />
          </View>
          : null}
        {!this.state.loading && !this.state.stores.length && !this.state.search
          ? <Text style={styles.message}>Pesquise pelo nome do estabelecimento que você está procurando!</Text>
          : null}
        {!this.state.loading && !this.state.stores.length && this.state.search
          ? <Text style={styles.message}>Nenhum estabelecimento encontrado.</Text>
          : null}
        {!this.state.loading && this.state.stores.length && this.state.search
          ? <ScrollView style={styles.container}>
              <FlatList
                data={this.state.stores}
                renderItem={
                  ({ item: { name, description } }) =>
                  <CCard>
                    <Text style={styles.storeTitle}>{name}</Text>
                    <Text style={styles.storeDescription}>{description}</Text>
                  </CCard>}
                keyExtractor={item => item.id}
              />
            </ScrollView>
          : null}
      </View>
    );
  }

  collection = null;

  componentWillMount() {
    this.collection = admin.collection('store');
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
