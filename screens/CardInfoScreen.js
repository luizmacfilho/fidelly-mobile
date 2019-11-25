import React from 'react';
import { CCard, CIcon } from '../components';
import { View, Text, Platform, StyleSheet, ScrollView, FlatList } from 'react-native';

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

const rewards = [
  {
    id: '1',
    name: 'Café com Leite',
    description: 'Café com Leite médio. Café é da marca Três Corações e o leite é Itambé.',
    amount: 4,
  },
  {
    id: '2',
    name: 'Misto Quente',
    description: 'Misto quente com queijo e presunto.',
    amount: 10,
  },
  {
    id: '3',
    name: 'Pão de Queijo',
    description: 'Pão de Queijo simples, quentinho e delicioso!',
    amount: 5,
  },
];

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
            data={rewards}
            renderItem={
              ({ item: { id, name, amount, description } }) =>
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