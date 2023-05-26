import {
  createBottomTabNavigator,
  BottomTabNavigationProp,
} from '@react-navigation/bottom-tabs';
import { Home } from '@screens/Home';
import { MyAds } from '@screens/MyAds';
import { SignOut } from '@screens/SignOut';

type AppRoutes = {
  home: undefined;
  myAds: undefined;
  signOut: undefined;
};

export type AppNavigatorRoutesProps = BottomTabNavigationProp<AppRoutes>;

const { Navigator, Screen } = createBottomTabNavigator<AppRoutes>();

export function AppRoutes() {
  return (
    <Navigator screenOptions={{ headerShown: false, tabBarShowLabel: false }}>
      <Screen name="home" component={Home} />
      <Screen name="myAds" component={MyAds} />
      <Screen name="signOut" component={SignOut} />
    </Navigator>
  );
}
