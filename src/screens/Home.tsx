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
  useToast,
} from 'native-base';
import { CardItem } from '@components/CardItem';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { AppNavigatorRoutesProps } from '@routes/app.routes';
import { useAuth } from '@hooks/useAuth';
import { useCallback, useEffect, useState } from 'react';
import { Alert, Modal, StyleSheet } from 'react-native';
import { AppError } from '@utils/appError';
import { api } from '@services/api';
import { useApp } from '@hooks/useApp';
import { Loading } from '@components/Loading';

type ImageProps = {
  id: string;
  path: string;
};
type PaymentMethodsProps = {
  key: string;
  name: string;
};

type UserProps = {
  name: string;
  tel: string;
  avatar: string;
};
type DataProps = {
  id: string;
  name: string;
  description: string;
  is_new: boolean;
  price: number;
  accept_trade: boolean;
  is_active: boolean;
  product_images: Array<ImageProps>;
  payment_methods: Array<PaymentMethodsProps>;
  user: UserProps;
};

export function Home() {
  const [modalVisible, setModalVisible] = useState(false);
  const [data, setData] = useState<DataProps[]>([]);
  const [dataUserProducts, setDataUserProducts] = useState<DataProps[]>([]);
  const [searchItem, setSearchItem] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useAuth();
  const navigation = useNavigation<AppNavigatorRoutesProps>();

  const { saveProductSelected } = useApp();
  const toast = useToast();

  function handleCreateAd() {
    navigation.navigate('createAd');
  }

  function handleMyAds() {
    navigation.navigate('myAds');
  }

  function handleAdDetails(item: DataProps) {
    navigation.navigate('adDetails', { id: item.id });
  }

  async function getAds() {
    try {
      setIsLoading(true);
      const response = await api.get('/products');
      setData(response.data);
    } catch (error) {
      const isAppError = error instanceof AppError;
      const title = isAppError
        ? error.message
        : 'Não foi possível buscar os anúncios. Tente novamente mais tarde.';
      toast.show({
        title,
        placement: 'top',
        bgColor: 'red.500',
      });
    } finally {
      setIsLoading(false);
    }
  }

  async function getProducts() {
    try {
      const response = await api.get('users/products');
      setDataUserProducts(response.data);
    } catch (error) {
      const isAppError = error instanceof AppError;
      const title = isAppError
        ? error.message
        : 'Não foi possível buscar os seus anúncios. Tente novamente mais tarde.';
      toast.show({
        title,
        placement: 'top',
        bgColor: 'red.500',
      });
    }
  }

  async function getProductsBySearchAndFilters() {
    try {
      setIsLoading(true);
      const params = {
        query: searchItem,
      };
      const response = await api.get('products/', { params });
      setData(response.data);
    } catch (error) {
      const isAppError = error instanceof AppError;
      const title = isAppError
        ? error.message
        : 'Não foi possível buscar os seus anúncios. Tente novamente mais tarde.';
      toast.show({
        title,
        placement: 'top',
        bgColor: 'red.500',
      });
    } finally {
      setIsLoading(false);
    }
  }

  useFocusEffect(
    useCallback(() => {
      getAds();
      getProducts();
    }, []),
  );
  return (
    <VStack flex={1} px={6} bg="gray.600">
      <HStack mb={8} pt={12} alignItems="center" flexDirection="row">
        <Avatar
          source={{ uri: `${api.defaults.baseURL}/images/${user.avatar}` }}
        />
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
      <ActiveAds
        amountActiveAds={dataUserProducts.length}
        onPress={handleMyAds}
      />
      <Text color="gray.300" fontSize="md" fontFamily="body" mt={8} mb={4}>
        Compre produtos variados
      </Text>
      <Input
        placeholder="Buscar anúncio"
        mb={8}
        type="text"
        autoCapitalize="none"
        onChangeText={setSearchItem}
        InputRightElement={
          <>
            <Pressable onPress={getProductsBySearchAndFilters}>
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
            <Pressable mr={14} onPress={() => setModalVisible(true)}>
              <Faders weight="bold" color="#3E3A40" size={20} />
            </Pressable>
          </>
        }
      />
      <ScrollView showsVerticalScrollIndicator={false}>
        {!isLoading ? (
          <HStack flex={1} flexWrap="wrap" justifyContent="space-between">
            {data.map((item) => (
              <>
                <CardItem
                  name={item.name}
                  price={item.price}
                  statusItem={item.is_new ? 'new' : 'used'}
                  avatar={true}
                  avatarImage={item.user.avatar}
                  active={item.is_active}
                  image={item.product_images}
                  onPress={() => handleAdDetails(item)}
                />
              </>
            ))}
          </HStack>
        ) : (
          <Loading />
        )}
      </ScrollView>
      <Box style={styles.centeredView}>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            Alert.alert('Modal has been closed.');
            setModalVisible(!modalVisible);
          }}
        >
          <Box style={styles.centeredView}>
            <Box style={styles.modalView}>
              <Text style={styles.modalText}>Hello World!</Text>
              <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={() => setModalVisible(!modalVisible)}
              >
                <Text style={styles.textStyle}>Hide Modal</Text>
              </Pressable>
            </Box>
          </Box>
        </Modal>
      </Box>
    </VStack>
  );
}
const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
});
