import { useTheme, Box } from 'native-base';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { AuthRoutes } from './auth.routes';
import { AppRoutes } from './app.routes';
import { useAuth } from '@hooks/useAuth';
import { Loading } from '@components/Loading';
import { AppContextProvider } from '@contexts/AppContext';
// import { useApp } from '@hooks/useApp';

export function Routes() {
  const { colors } = useTheme();
  const { user, isLoadingUserStorageData } = useAuth();
  // const { productPreviewData } = useApp();

  const theme = DefaultTheme;
  theme.colors.background = colors.gray[700];

  if (isLoadingUserStorageData) {
    return <Loading />;
  }

  return (
    <Box flex={1} bg="gray.600">
      <NavigationContainer theme={theme}>
        {user.id ? (
          <AppContextProvider>
            <AppRoutes />
          </AppContextProvider>
        ) : (
          <AuthRoutes />
        )}
      </NavigationContainer>
    </Box>
  );
}
