import {
  Box,
  CheckIcon,
  HStack,
  ScrollView,
  Text,
  VStack,
  useToast,
} from 'native-base';
import {
  Bank,
  Barcode,
  CreditCard,
  Money,
  Plus,
  QrCode,
  WhatsappLogo,
} from 'phosphor-react-native';
import { Dimensions, TouchableOpacity, FlatList, Image } from 'react-native';
import { Select } from 'native-base';
import { useCallback, useEffect, useState } from 'react';
import { CardItem } from '@components/CardItem';
import {
  useFocusEffect,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import { Header } from '@components/Header';
import { Carousel } from '@components/Caroulsel';
import { Avatar } from '@components/Avatar';
import TagUsedSecondary from '@assets/usedSecondary.svg';
import TagNewSecondary from '@assets/newSecondary.svg';
import { Button } from '@components/Button';
import { useApp } from '@hooks/useApp';
import { api } from '@services/api';
import { AppError } from '@utils/appError';
import { Loading } from '@components/Loading';

type RouteParams = {
  id: string;
};
type ImageProps = {
  id: string;
  name: string;
  uri: string;
  path: string;
  type: string;
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

export function AdDetails() {
  const [activeAd, setActiveAd] = useState(true);
  const [data, setData] = useState<DataProps>();

  const { productSelected } = useApp();
  const route = useRoute();
  const toast = useToast();

  const { id } = route.params as RouteParams;
  const price = Number(data?.price) / 100;

  const navigation = useNavigation();

  function handleBack() {
    navigation.goBack();
  }

  async function getProductById() {
    try {
      const response = await api.get(`/products/${id}`);
      setActiveAd(response.data.is_active);
      setData(response.data ? response.data : '');
    } catch (error) {
      const isAppError = error instanceof AppError;
      const title = isAppError
        ? error.message
        : 'Não foi possível buscar as informações do anúncio. Tente novamente mais tarde.';
      toast.show({
        title,
        placement: 'top',
        bgColor: 'red.500',
      });
    }
  }

  useFocusEffect(
    useCallback(() => {
      getProductById();
    }, []),
  );
  return (
    <VStack bgColor="gray.700" flex={1}>
      {data ? (
        <VStack flex={1} mt={9}>
          <Box px={6}>
            <Header hideTitle onPress={handleBack} />
          </Box>
          <Box mt={4}>
            <Carousel />
          </Box>
          <VStack>
            <Carousel images={data?.product_images} />
          </VStack>
          <VStack px={6} mb={5}>
            <HStack alignItems="center" my={6}>
              <Avatar
                width={6}
                height={6}
                source={{
                  uri: `${api.defaults.baseURL}/images/${data?.user.avatar}`,
                }}
              />
              <Text ml={2} fontFamily="body" color="gray.100" fontSize="sm">
                {data?.user.name}
              </Text>
            </HStack>
            {data?.is_new ? <TagNewSecondary /> : <TagUsedSecondary />}
            <HStack alignItems="baseline" justifyContent="space-between" mt={2}>
              <Text fontFamily="heading" fontSize="lg" color="gray.100">
                {data?.name}
              </Text>
              <Text color="blue.500" fontFamily="heading">
                <Text fontSize="sm">R$ </Text>
                <Text fontSize="lg">{price.toFixed(2).replace('.', ',')}</Text>
              </Text>
            </HStack>
            <Text mt={1} color="gray.200" fontSize="sm" fontFamily="body">
              {data?.description}
            </Text>
            <Text mt={6} fontSize="sm">
              <Text fontFamily="heading">Aceita troca? </Text>
              <Text>{data?.accept_trade ? 'Sim' : 'Não'}</Text>
            </Text>
            <Text mt={3} fontFamily="heading">
              Meios de pagamento:
            </Text>
            {data?.payment_methods.map((item: PaymentMethodsProps) => (
              <>
                {item.key === 'boleto' && (
                  <HStack mt={2}>
                    <Barcode />
                    <Text ml={2}>Boleto</Text>
                  </HStack>
                )}
                {item.key === 'pix' && (
                  <HStack mt={2}>
                    <QrCode />
                    <Text ml={2}>Pix</Text>
                  </HStack>
                )}
                {item.key === 'cash' && (
                  <HStack mt={2}>
                    <Money />
                    <Text ml={2}>Dinheiro</Text>
                  </HStack>
                )}
                {item.key === 'card' && (
                  <HStack mt={2}>
                    <CreditCard />
                    <Text ml={2}>Cartão de Crédito</Text>
                  </HStack>
                )}
                {item.key === 'deposit' && (
                  <HStack mt={2}>
                    <Bank />
                    <Text ml={2}>Depósito Bancário</Text>
                  </HStack>
                )}
              </>
            ))}
          </VStack>
          <HStack
            alignItems="center"
            justifyContent="space-between"
            px={6}
            py={5}
            bgColor="gray.700"
          >
            <Text color="blue.700" fontFamily="heading">
              <Text fontSize="sm">R$ </Text>
              <Text fontSize="xl">120,00</Text>
            </Text>
            <Button
              title="Entrar em contato"
              titleColor="gray.700"
              width={189}
              leftIcon={
                <WhatsappLogo size={20} color="#F7F7F8" weight="fill" />
              }
            />
          </HStack>
        </VStack>
      ) : (
        <Loading />
      )}
    </VStack>
  );
}
