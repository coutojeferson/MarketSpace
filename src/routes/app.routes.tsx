import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Home } from '@screens/Home';
import { MyAds } from '@screens/MyAds';

const { Navigator, Screen } = createBottomTabNavigator();

export function AppRoutes() {
  return (
    <Navigator>
      <Screen name="Home" component={Home} />
      <Screen name="MyAds" component={MyAds} />
    </Navigator>
  );
}
