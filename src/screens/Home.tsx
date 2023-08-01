import { ActiveAds } from '@components/ActiveAds';
import { Avatar } from '@components/Avatar';
import { Button } from '@components/Button';
import { Input } from '@components/Input';
import {
  MagnifyingGlass,
  Faders,
  Plus,
  X,
  XCircle,
} from 'phosphor-react-native';

import {
  Box,
  Center,
  Checkbox,
  HStack,
  Heading,
  Pressable,
  ScrollView,
  Switch,
  Text,
  VStack,
  useToast,
} from 'native-base';
import { CardItem } from '@components/CardItem';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { AppNavigatorRoutesProps } from '@routes/app.routes';
import { useAuth } from '@hooks/useAuth';
import { useCallback, useEffect, useState } from 'react';
import { Alert, Modal, StyleSheet, TouchableOpacity } from 'react-native';
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

type Params = {
  is_new: boolean;
  accept_trade: boolean;
  payment_methods: Array<PaymentMethodsProps>;
  query: string;
};

export function Home() {
  const [modalVisible, setModalVisible] = useState(false);
  const [data, setData] = useState<DataProps[]>([]);
  const [dataUserProducts, setDataUserProducts] = useState<DataProps[]>([]);
  const [searchItem, setSearchItem] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [acceptTrade, setAcceptTrade] = useState(false);
  const [paymentMethods, setPaymentMethods] = useState([]);
  const [value, setValue] = useState(false);
  const [newEnabled, setNewEnabled] = useState(false);
  const [usedEnabled, setUsedEnabled] = useState(false);

  const { user } = useAuth();
  const navigation = useNavigation<AppNavigatorRoutesProps>();

  const { saveProductSelected, productSelected } = useApp();

  const toast = useToast();

  function handleCreateAd() {
    navigation.navigate('createAd');
  }

  function handleMyAds() {
    navigation.navigate('myAds');
  }

  function handleAdDetails(id: string) {
    navigation.navigate('adDetails');
    saveProductSelected({ id });
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
      const params: Params = {} as Params;
      if (searchItem) {
        params.query = searchItem;
      }

      if (modalVisible) {
        if (usedEnabled || newEnabled) {
          params.is_new = value;
        }
        if (acceptTrade) {
          params.accept_trade = acceptTrade;
        }
        if (paymentMethods.length) {
          params.payment_methods = paymentMethods;
        }
      }
      console.log('o que estamos mandando', params);
      const response = await api.get('products/', { params });
      if (modalVisible) {
        setModalVisible(false);
      }
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

  function handleFilterReset() {
    setUsedEnabled(false);
    setNewEnabled(false);
    setValue(false);
    setPaymentMethods([]);
    setAcceptTrade(false);
  }

  function handleNew() {
    setNewEnabled(true);
    setUsedEnabled(false);
    setValue(true);
  }

  function handleUsed() {
    setNewEnabled(false);
    setUsedEnabled(true);
    setValue(false);
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
                  onPress={() => handleAdDetails(item.id)}
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
            setModalVisible(!modalVisible);
          }}
        >
          <VStack style={styles.centeredView}>
            <Box style={styles.modalView}>
              <HStack alignItems="center">
                <Heading flex={1}>Filtrar anúncios</Heading>
                <Pressable
                  onPress={() => {
                    setModalVisible(!modalVisible);
                    getProductsBySearchAndFilters();
                  }}
                >
                  <X color="#9F9BA1" />
                </Pressable>
              </HStack>

              <Text
                mt={6}
                mb={3}
                color="gray.200"
                fontFamily="heading"
                fontSize="sm"
              >
                Condição
              </Text>
              <HStack>
                <TouchableOpacity onPress={handleNew}>
                  <HStack
                    borderRadius="full"
                    w={79}
                    h={28}
                    bgColor={newEnabled ? 'blue.500' : 'gray.500'}
                    alignItems="center"
                    justifyContent="center"
                  >
                    <Text
                      color={newEnabled ? 'white' : 'gray.300'}
                      fontFamily="heading"
                    >
                      NOVO
                    </Text>
                    {newEnabled && (
                      <Pressable ml={1} onPress={() => setNewEnabled(false)}>
                        <XCircle size={20} color="#EDECEE" weight="fill" />
                      </Pressable>
                    )}
                  </HStack>
                </TouchableOpacity>
                <TouchableOpacity onPress={handleUsed}>
                  <HStack
                    ml={2}
                    borderRadius="full"
                    w={79}
                    h={28}
                    bgColor={usedEnabled ? 'blue.500' : 'gray.500'}
                    alignItems="center"
                    justifyContent="center"
                  >
                    <Text
                      color={usedEnabled ? 'white' : 'gray.300'}
                      fontFamily="heading"
                    >
                      USADO
                    </Text>
                    {usedEnabled && (
                      <Pressable ml={1} onPress={() => setUsedEnabled(false)}>
                        <XCircle size={20} color="#EDECEE" weight="fill" />
                      </Pressable>
                    )}
                  </HStack>
                </TouchableOpacity>
              </HStack>
              <VStack alignItems="flex-start" mt={6}>
                <Text fontFamily="heading" fontSize="sm">
                  Aceita troca?
                </Text>
                <Switch
                  size="lg"
                  colorScheme="lightBlue"
                  isChecked={acceptTrade}
                  onToggle={() => setAcceptTrade(!acceptTrade)}
                />
              </VStack>
              <Text fontFamily="heading" fontSize="sm" mb={2} mt={2}>
                Meios de pagamento aceitos
              </Text>
              <Checkbox.Group
                onChange={setPaymentMethods}
                value={paymentMethods}
                accessibilityLabel="chose payment methods"
              >
                <Checkbox value="boleto" my={1}>
                  <Text>Boleto</Text>
                </Checkbox>
                <Checkbox value="pix" my={1}>
                  <Text>Pix</Text>
                </Checkbox>
                <Checkbox value="cash" my={1}>
                  <Text>Dinheiro</Text>
                </Checkbox>
                <Checkbox value="card" my={1}>
                  <Text>Cartão de Crédito</Text>
                </Checkbox>
                <Checkbox value="deposit" my={1}>
                  <Text>Depósito</Text>
                </Checkbox>
              </Checkbox.Group>
              <VStack flex={1} justifyContent="flex-end">
                <HStack justifyContent="space-between">
                  <Button
                    onPress={() => handleFilterReset()}
                    color="gray.500"
                    title="Resetar filtros"
                    titleColor="gray.200"
                    width={157}
                  />
                  <Button
                    isLoading={isLoading}
                    onPress={getProductsBySearchAndFilters}
                    color="gray.100"
                    title="Aplicar filtros"
                    titleColor="gray.700"
                    width={157}
                  />
                </HStack>
              </VStack>
            </Box>
          </VStack>
        </Modal>
      </Box>
    </VStack>
  );
}
const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'flex-end',
    marginTop: 22,
  },
  modalView: {
    margin: 10,
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    height: '75%',
    paddingTop: 48,
    paddingBottom: 32,
    paddingHorizontal: 24,
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
