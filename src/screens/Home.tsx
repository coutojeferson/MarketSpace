import { ActiveAds } from '@components/ActiveAds';
import { Avatar } from '@components/Avatar';
import { Button } from '@components/Button';
import { Input } from '@components/Input';
import { MagnifyingGlass, Faders, Plus } from 'phosphor-react-native';

import {
  Box,
  Center,
  HStack,
  Pressable,
  ScrollView,
  Text,
  VStack,
} from 'native-base';
import { CardItem } from '@components/CardItem';
import { useNavigation } from '@react-navigation/native';
import { AppNavigatorRoutesProps } from '@routes/app.routes';
import { useAuth } from '@hooks/useAuth';

export function Home() {
  const { user } = useAuth();
  const navigation = useNavigation<AppNavigatorRoutesProps>();

  function handleCreateAd() {
    navigation.navigate('createAd');
  }
  return (
    <VStack flex={1} px={6} bg="gray.600">
      <HStack mb={8} pt={12} alignItems="center" flexDirection="row">
        <Avatar source={{ uri: user.avatar }} />
        <VStack ml={3} flex={1}>
          <Text color="gray.100" fontSize="md" fontFamily="body">
            Boas vindas,
          </Text>
          <Text color="gray.100" fontSize="md" fontFamily="heading">
            {user.name}
          </Text>
        </VStack>
        <Button
          leftIcon={<Plus size={16} color="#EDECEE" />}
          title="Criar anúncio"
          titleColor="gray.700"
          width={139}
          color="gray.100"
          onPress={handleCreateAd}
        />
      </HStack>
      <Text color="gray.300" fontSize="md" fontFamily="body" mb={4}>
        Seus produtos anunciados para venda
      </Text>
      <ActiveAds amountActiveAds={4} />
      <Text color="gray.300" fontSize="md" fontFamily="body" mt={8} mb={4}>
        Compre produtos variados
      </Text>
      <Input
        placeholder="Buscar anúncio"
        mb={8}
        type="text"
        autoCapitalize="none"
        InputRightElement={
          <>
            <Pressable>
              <MagnifyingGlass weight="bold" color="#3E3A40" size={20} />
            </Pressable>
            <Box
              color="gray.400"
              borderWidth="0.5"
              h={5}
              opacity={0.2}
              ml={14}
              mr={14}
            />
            <Pressable mr={14}>
              <Faders weight="bold" color="#3E3A40" size={20} />
            </Pressable>
          </>
        }
      />
      <ScrollView showsVerticalScrollIndicator={false}>
        <HStack flex={1} flexWrap="wrap" justifyContent="space-between">
          <CardItem
            statusItem="used"
            onPress={() => navigation.navigate('adDetails')}
          />
          <CardItem statusItem="new" />
          <CardItem statusItem="used" />
          {/* <CardItem statusItem="new" />
          <CardItem statusItem="used" />
          <CardItem statusItem="used" />
          <CardItem statusItem="used" />
          <CardItem statusItem="new" /> */}
        </HStack>
      </ScrollView>
    </VStack>
  );
}
