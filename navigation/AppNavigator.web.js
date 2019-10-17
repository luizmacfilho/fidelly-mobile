import { createBrowserApp } from '@react-navigation/web';
import { createSwitchNavigator } from 'react-navigation';
import AuthNavigator from './AuthNavigator';
import MainTabNavigator from './MainTabNavigator';

const switchNavigator = createSwitchNavigator(
  {
    // You could add another route here for authentication.
    // Read more at https://reactnavigation.org/docs/en/auth-flow.html
    Main: MainTabNavigator,
    Auth: AuthNavigator
  },
  {
    initialRouteName: 'Auth',
  }
);
switchNavigator.path = 'Auth';

export default createBrowserApp(switchNavigator, { history: 'hash' });
