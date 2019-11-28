import React from 'react';
import { CCard, CIcon } from '../components';
import { View, Text, Platform, StyleSheet, ScrollView, FlatList } from 'react-native';
import { admin } from '../firebase/mobile';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  contentContainer: {
    paddingBottom: 8,
  },
  header: {
    marginHorizontal: 16,
    marginTop: 16,
  },
  amount: {
    fontSize: 20,
    marginBottom: 8,
  },
  description: {
    color: '#888',
    marginBottom: 8,
  },
  reward: {
    fontSize: 16,
  },
  rewardTitle: {
    fontSize: 16,
    marginBottom: 8,
  },
  rewardDescription: {
    color: '#888',
  },
  rewardAmount: {
    color: '#888',
  }
});

export default class CardInfoScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: navigation.getParam('name'),
      headerLeft: (
        <CIcon
          style={{ marginLeft: 24 }}
          name={ `${Platform.OS === 'ios' ? 'ios' : 'md'}-arrow-back` }
          onPress={() => navigation.goBack()}
        />
      ),
    };
  };

  constructor(props) {
    super(props);
    this.state = { loading: false, awards: [] };
  }

  componentDidMount() {
    this.setState({ loading: true });
    const storeId = this.props.navigation.getParam('storeId');
    const collection = admin.collection('store').doc(storeId).collection('awards');
    collection.onSnapshot((snap) => {
      const awards = [];
      snap.forEach((doc) => {
        awards.push({ id: doc.id, ...doc.data() });
      });
      this.setState({ loading: false, awards });
    });
    collection.get();
  }

  render() {
    const { navigation } = this.props;
    const amount = navigation.getParam('amount')
    return (
      <View style={styles.container}>
        <ScrollView
          contentContainerStyle={styles.contentContainer}>
          <View style={styles.header}>
            <Text style={styles.amount}>
              Você possui {amount} selo{amount > 1 ? 's' : ''}.
            </Text>
            <Text style={styles.description}>
              Para trocar os selos por recompensas, dirija-se até o estabelecimento e solicite o resgate. Será necessário realizar autenticação.
            </Text>
            <Text style={styles.reward}>Recompensas</Text>
          </View>
          <FlatList
            data={this.state.awards}
            renderItem={
              ({ item: { name, amount, description } }) =>
              <CCard>
                <Text style={styles.rewardTitle}>{name}</Text>
                <Text style={styles.rewardDescription}>{description}</Text>
                <Text style={styles.rewardAmount}>{amount} selo{amount > 1 ? 's' : ''}</Text>
              </CCard>}
            keyExtractor={item => item.id}
          />
        </ScrollView>
      </View>
    );
  }
}