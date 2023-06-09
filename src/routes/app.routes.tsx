import {
  createBottomTabNavigator,
  BottomTabNavigationProp,
} from '@react-navigation/bottom-tabs';
import { useTheme } from 'native-base';
import { Home } from '@screens/Home';
import { MyAds } from '@screens/MyAds';
import { AdDetails } from '@screens/AdDetails';
import { SignOut } from '@screens/SignOut';
import { House, Tag, SignOut as SignOutIcon } from 'phosphor-react-native';
import { Platform } from 'react-native';

type AppRoutes = {
  home: undefined;
  myAds: undefined;
  adDetails: undefined;
  signOut: undefined;
};

export type AppNavigatorRoutesProps = BottomTabNavigationProp<AppRoutes>;

const { Navigator, Screen } = createBottomTabNavigator<AppRoutes>();

export function AppRoutes() {
  const { sizes, colors } = useTheme();

  const iconSize = sizes[6];
  return (
    <Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarActiveTintColor: colors.gray[100],
        tabBarInactiveTintColor: colors.gray[400],
        tabBarStyle: {
          backgroundColor: colors.gray[700],
          borderTopWidth: 0,
          height: Platform.OS === 'android' ? 'auto' : 96,
          paddingBottom: sizes[10],
          paddingTop: sizes[6],
        },
      }}
    >
      <Screen
        name="home"
        component={Home}
        options={{
          tabBarIcon: ({ color }) => <House color={color} size={iconSize} />,
        }}
      />
      <Screen
        name="myAds"
        component={MyAds}
        options={{
          tabBarIcon: ({ color }) => <Tag color={color} size={iconSize} />,
        }}
      />
      <Screen
        name="adDetails"
        component={AdDetails}
        options={{
          tabBarButton: () => null,
        }}
      />
      <Screen
        name="signOut"
        component={SignOut}
        options={{
          tabBarIcon: ({ color }) => (
            <SignOutIcon color="#E07878" size={iconSize} />
          ),
        }}
      />
    </Navigator>
  );
}
