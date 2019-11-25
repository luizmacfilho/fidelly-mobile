import React from 'react';
import {
  TouchableWithoutFeedback, StyleSheet, View, Text,
  SafeAreaView, FlatList, Platform
} from 'react-native';
import { CIcon } from '../components';
import Constants from 'expo-constants';
import * as firebase from 'firebase/app';
import { getUser } from '../firebase/mobile';

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    flex: 1,
    margin: 16,
  },
  user: {
    fontSize: 20,
    textAlign: 'center',
  },
  email: {
    fontSize: 16,
    marginBottom: 16,
    textAlign: 'center',
  },
  item: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    minHeight: 40,
    borderBottomWidth: 1,
    borderBottomColor: '#cacaca',
  },
  itemIcon: {
    marginRight: 16,
  },
  itemTitle: {
    fontSize: 16,
  }
});

function Item({ title, iconName, onPress }) {
  return (
    <TouchableWithoutFeedback onPress={ () => onPress()}>
      <View style={styles.item}>
        <CIcon style={styles.itemIcon} name={`${Platform.OS === 'ios' ? 'ios' : 'md'}-${iconName}`}></CIcon>
        <Text style={styles.itemTitle}>{title}</Text>
      </View>
    </TouchableWithoutFeedback>
  );
}

export default class UserScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };

  options = [
    {
      id: '58694a0f-3da1-471f-bd96-145571e29d72',
      title: 'Logout',
      iconName: 'log-out',
      onPress: () => this._logOut()
    },
  ];

  constructor(props) {
    super(props);
    this.state = { name: '', email: '' };
  }

  componentDidMount() {
    const user = getUser();
    if (user) {
      this.setState({ name: user.displayName, email: user.email });
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <View>
          <Text style={styles.user}>{this.state.name}</Text>
          <Text style={styles.email}>{this.state.email}</Text>

          <SafeAreaView>
            <FlatList
              data={this.options}
              renderItem={({ item: { title, iconName, onPress} }) =>
                <Item title={title} iconName={iconName} onPress={onPress} />}
              keyExtractor={item => item.id}
            />
          </SafeAreaView>
        </View>
      </View>
    );
  }

  async _logOut() {
    await firebase.auth().signOut();
    this.props.navigation.navigate('Auth');
  }
}
