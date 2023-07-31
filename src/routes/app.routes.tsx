import {
  createBottomTabNavigator,
  BottomTabNavigationProp,
} from '@react-navigation/bottom-tabs';
import { useTheme } from 'native-base';
import { Home } from '@screens/Home';
import { MyAds } from '@screens/MyAds';
import { AdDetails } from '@screens/AdDetails';
import { SignOut } from '@screens/SignOut';
import { CreateAd } from '@screens/CreateAd';
import { AdPreview } from '@screens/AdPreview';
import { AdUpdatePreview } from '@screens/AdUpdatePreview';
import { MyAdDetail } from '@screens/MyAdDetail';
import { EditMyAd } from '@screens/EditMyAd';
import { House, Tag, SignOut as SignOutIcon } from 'phosphor-react-native';
import { Platform } from 'react-native';
import { useAuth } from '@hooks/useAuth';
import {
  NativeStackNavigationProp,
  createNativeStackNavigator,
} from '@react-navigation/native-stack';

type AppRoutesTabs = {
  home: undefined;
  myAds: undefined;
  signOut: undefined;
};

type AppRoutesStack = {
  myAdDetail: {
    id: string;
  };
  adDetails: {
    id: string;
  };
  adPreview: undefined;
  adUpdatePreview: undefined;
  createAd: undefined;
  editMyAdd: undefined;
  homePage: PropsTabs;
};

type PropsTabs = {
  home: undefined;
};

export type AppNavigatorRoutesProps = BottomTabNavigationProp<AppRoutesTabs> &
  NativeStackNavigationProp<AppRoutesStack>;

const { Navigator, Screen } = createBottomTabNavigator<AppRoutesTabs>();
const { Navigator: StackNavigator, Screen: StackScreen } =
  createNativeStackNavigator<AppRoutesStack>();

export function AppRoutes() {
  return (
    <StackNavigator screenOptions={{ headerShown: false }}>
      <StackScreen
        name="homePage"
        component={HomePage}
        options={{ headerShown: false }}
      />
      <StackScreen name="adDetails" component={AdDetails} />
      <StackScreen name="adPreview" component={AdPreview} />
      <StackScreen name="adUpdatePreview" component={AdUpdatePreview} />
      <StackScreen name="createAd" component={CreateAd} />
      <StackScreen name="editMyAdd" component={EditMyAd} />
      <StackScreen name="myAdDetail" component={MyAdDetail} />
    </StackNavigator>
  );
}

function HomePage() {
  const { signOut } = useAuth();
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
