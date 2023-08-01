import {
  CheckIcon,
  HStack,
  ScrollView,
  Text,
  VStack,
  useToast,
} from 'native-base';
import { Plus } from 'phosphor-react-native';
import { TouchableOpacity } from 'react-native';
import { Select } from 'native-base';
import { useCallback, useEffect, useState } from 'react';
import { CardItem } from '@components/CardItem';
import { api } from '@services/api';
import { AppError } from '@utils/appError';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { AppNavigatorRoutesProps } from '@routes/app.routes';
import { Loading } from '@components/Loading';
import { useApp } from '@hooks/useApp';

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

export function MyAds() {
  const [service, setService] = useState('Todos');
  const [data, setData] = useState<DataProps[]>([]);

  const navigation = useNavigation<AppNavigatorRoutesProps>();
  const toast = useToast();

  const { saveProductSelected } = useApp();

  function handleAdd() {
    navigation.navigate('createAd');
  }

  function handleAdDetails(id: string) {
    navigation.navigate('myAdDetail');
    saveProductSelected({ id });
  }

  async function getProducts() {
    try {
      const response = await api.get('users/products');
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
    }
  }

  useFocusEffect(
    useCallback(() => {
      getProducts();
    }, []),
  );

  return (
    <VStack flex={1} px={6}>
      <HStack mt={9} alignItems="center" flexDirection="row-reverse">
        <Text fontFamily="heading" fontSize={20} flex={1} textAlign="center">
          Meus anúncios
        </Text>
        <TouchableOpacity style={{ position: 'absolute' }} onPress={handleAdd}>
          <Plus />
        </TouchableOpacity>
      </HStack>
      {data.length ? (
        <ScrollView showsVerticalScrollIndicator={false}>
          <HStack alignItems="center" justifyContent="space-between" mt={8}>
            <Text fontFamily="body" fontSize="sm">
              {data.length > 1
                ? `${data.length} anúncios`
                : `${data.length} anúncio`}
            </Text>
            <Select
              size="sm"
              color="gray.100"
              selectedValue={service}
              height={8}
              minWidth={100}
              accessibilityLabel="Mudar filtro"
              placeholder="Todos"
              _selectedItem={{
                bg: 'blue.500',
                endIcon: <CheckIcon size="5" color="#FFFF" />,
              }}
              onValueChange={(itemValue) => setService(itemValue)}
            >
              <Select.Item label="Todos" value="all" />
              <Select.Item label="Inativos" value="inactive" />
              <Select.Item label="Ativos" value="active" />
            </Select>
          </HStack>
          <HStack mt={5} flexWrap="wrap" justifyContent="space-between">
            {data.map((item) => (
              <>
                <CardItem
                  name={item.name}
                  price={item.price}
                  statusItem={item.is_new ? 'new' : 'used'}
                  avatar={false}
                  active={item.is_active}
                  image={item.product_images}
                  onPress={() => handleAdDetails(item.id)}
                />
              </>
            ))}
          </HStack>
        </ScrollView>
      ) : (
        <Loading />
      )}
    </VStack>
  );
}
