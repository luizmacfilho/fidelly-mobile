import { createBrowserApp } from '@react-navigation/web';
import { createSwitchNavigator } from 'react-navigation';
import AuthNavigator from './AuthNavigator';
import MainTabNavigator from './MainTabNavigator';
import AuthLoadingNavigator from './AuthLoadingNavigator';

const switchNavigator = createSwitchNavigator(
  {
    // You could add another route here for authentication.
    // Read more at https://reactnavigation.org/docs/en/auth-flow.html
    Main: MainTabNavigator,
    Auth: AuthNavigator,
    AuthLoading: AuthLoadingNavigator,
  },
  {
    initialRouteName: 'AuthLoading',
  }
);
switchNavigator.path = 'AuthLoading';

export default createBrowserApp(switchNavigator, { history: 'hash' });
