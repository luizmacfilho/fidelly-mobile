import { createStackNavigator } from 'react-navigation';
import AuthLoadingScreen from '../screens/AuthLoadingScreen';

const AuthStack = createStackNavigator({
  AuthLoading: AuthLoadingScreen,
},
{
  initialRouteName: 'AuthLoading'
});

export default AuthStack;