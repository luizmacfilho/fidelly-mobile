import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import MainTabNavigator from './MainTabNavigator';
import AuthNavigator from './AuthNavigator';
import AuthLoadingNavigator from './AuthLoadingNavigator';

export default createAppContainer(
  createSwitchNavigator(
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
  ),
);
