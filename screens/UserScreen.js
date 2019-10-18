import React from 'react';
import {
  TouchableWithoutFeedback, StyleSheet, View, Text,
  SafeAreaView, FlatList, Platform
} from 'react-native';
import { CIcon } from '../components';
import Constants from 'expo-constants';

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
      id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
      title: 'Edit account',
      iconName: 'egg',
    },
    {
      id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
      title: 'Share',
      iconName: 'share',
    },
    {
      id: '58694a0f-3da1-471f-bd96-145571e29d72',
      title: 'Logout',
      iconName: 'log-out',
      onPress: () => this._logOut()
    },
  ];

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={styles.container}>
        <View>
          <Text style={styles.user}>Luiz Filho</Text>
          <Text style={styles.email}>luiz.macfilho@gmail.com</Text>

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

  _logOut() {
    this.props.navigation.navigate('Auth');
  }
}
