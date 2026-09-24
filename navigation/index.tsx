import { createStaticNavigation, StaticParamList } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import home from '../screens/home';
import weatherScreen from 'screens/weatherScreen';

const Stack = createStackNavigator({
  screens: {
    Home: {
      screen: home,
      options: {
        headerShown: true,
      },
    },
    WeatherScreen: {
      screen: weatherScreen,
      options: {
        headerShown: true,
      },
    },
  },
});

type RootNavigatorParamList = StaticParamList<typeof Stack>;

declare global {
  namespace ReactNavigation {
    // eslint-disable-next-line @typescript-eslint/no-empty-object-type
    interface RootParamList extends RootNavigatorParamList {}
  }
}

const Navigation = createStaticNavigation(Stack);
export default Navigation;
