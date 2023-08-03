import { Avatar } from '@components/Avatar';
import { Carousel } from '@components/Caroulsel';
import { Button } from '@components/Button';
import {
  VStack,
  Text,
  HStack,
  ScrollView,
  Center,
  useToast,
  Box,
} from 'native-base';
import TagUsedSecondary from '@assets/usedSecondary.svg';
import TagNewSecondary from '@assets/newSecondary.svg';
import {
  ArrowLeft,
  Bank,
  Barcode,
  CreditCard,
  Money,
  PencilSimpleLine,
  Power,
  QrCode,
  Tag,
  TrashSimple,
} from 'phosphor-react-native';
import {
  useFocusEffect,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import { AppNavigatorRoutesProps } from '@routes/app.routes';
import { Header } from '@components/Header';
import { useCallback, useEffect, useState } from 'react';
import { Alert, BackHandler, TouchableOpacity } from 'react-native';
import { AppError } from '@utils/appError';
import { api } from '@services/api';
import { useApp } from '@hooks/useApp';
import { Loading } from '@components/Loading';
import { useAuth } from '@hooks/useAuth';

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

export function MyAdDetail() {
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingToDelete, setIsLoadingToDelete] = useState(false);
  const [activeAd, setActiveAd] = useState(true);
  const [data, setData] = useState<DataProps>();
  const [type, setType] = useState<DataProps>({} as DataProps);
  const [images, setImages] = useState<ImageProps[]>();
  const navigation = useNavigation<AppNavigatorRoutesProps>();

  const route = useRoute();
  const toast = useToast();
  const { saveProductDataToUpdate, productPreviewData, productSelected } =
    useApp();
  const { user } = useAuth();

  const price = Number(data?.price) / 100;

  function handleGoBack() {
    navigation.navigate('myAds');
    return true;
  }

  function handleEditAd(dataToUpdate: DataProps) {
    const productData = {
      id: productSelected.id,
      name: dataToUpdate.name,
      description: dataToUpdate.description,
      is_new: dataToUpdate.is_new,
      price: dataToUpdate.price,
      accept_trade: dataToUpdate.accept_trade,
      payment_methods: dataToUpdate.payment_methods,
      images: dataToUpdate.product_images,
    };
    saveProductDataToUpdate(productData);
    navigation.navigate('editMyAdd');
  }

  async function handleDeleteMyAd() {
    try {
      setIsLoadingToDelete(true);
      await api.delete(`/products/${productSelected.id}`);
      toast.show({
        title: 'Anúncio removido com sucesso.',
        placement: 'top',
        bgColor: 'green.500',
      });
      navigation.navigate('myAds');
    } catch (error) {
      const isAppError = error instanceof AppError;
      const title = isAppError
        ? error.message
        : 'Não foi possível deletar seu anúncio. Tente novamente mais tarde.';
      toast.show({
        title,
        placement: 'top',
        bgColor: 'red.500',
      });
    } finally {
      setIsLoadingToDelete(false);
    }
  }

  async function getProductById() {
    try {
      const response = await api.get(`/products/${productSelected.id}`);
      setActiveAd(response.data.is_active);
      setData(response.data ? response.data : '');
    } catch (error) {
      const isAppError = error instanceof AppError;
      const title = isAppError
        ? error.message
        : 'Não foi possível buscar as informações do seu anúncio. Tente novamente mais tarde.';
      toast.show({
        title,
        placement: 'top',
        bgColor: 'red.500',
      });
    }
  }

  async function updatedVisibility() {
    try {
      setIsLoading(true);
      const body = {
        is_active: !data?.is_active,
      };
      await api.patch(`/products/${data?.id}`, body);
      getProductById();
      toast.show({
        title: 'Visibilidade do produto atualizada com sucesso.',
        placement: 'top',
        bgColor: 'green.500',
      });
    } catch (error) {
      const isAppError = error instanceof AppError;
      const title = isAppError
        ? error.message
        : 'Não atualizar a visibilidade do seu produto. Tente novamente mais tarde.';
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
      getProductById();
      BackHandler.addEventListener('hardwareBackPress', handleGoBack);
      return () =>
        BackHandler.removeEventListener('hardwareBackPress', handleGoBack);
    }, []),
  );

  return (
    <VStack flex={1} bg="gray.600">
      <HStack px={6} mb={3} mt={45} justifyContent="space-between">
        <Header onPress={handleGoBack} />
        <TouchableOpacity onPress={() => (data ? handleEditAd(data) : {})}>
          <PencilSimpleLine />
        </TouchableOpacity>
      </HStack>
      {data ? (
        <ScrollView showsVerticalScrollIndicator={false}>
          <VStack
            alignItems="center"
            justifyContent="center"
            bgColor={activeAd ? 'gray.600' : 'gray.100'}
          >
            <Carousel active={data?.is_active} images={data?.product_images} />

            <Text
              fontFamily="heading"
              color="gray.700"
              position="absolute"
              textTransform="uppercase"
            >
              {activeAd ? '' : 'Anúncio desativado'}
            </Text>
          </VStack>
          <VStack px={6} mb={5}>
            <HStack alignItems="center" my={6}>
              <Avatar
                width={6}
                height={6}
                source={{
                  uri: `${api.defaults.baseURL}/images/${user.avatar}`,
                }}
              />
              <Text ml={2} fontFamily="body" color="gray.100" fontSize="sm">
                {data.user.name}
              </Text>
            </HStack>
            {data?.is_new ? <TagNewSecondary /> : <TagUsedSecondary />}
            <HStack alignItems="center" mt={2}>
              <Text
                flex={1}
                fontFamily="heading"
                fontSize="lg"
                color="gray.100"
                width="80%"
              >
                {data?.name}
              </Text>
              <Text color="blue.500" fontFamily="heading" ml={4}>
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
              <Box key={item.key}>
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
              </Box>
            ))}
          </VStack>
          <VStack flex={1} px={6} py={5}>
            <Button
              isLoading={isLoading}
              mb={2}
              width="100%"
              title={activeAd ? 'Desativar anúncio' : 'Reativar anúncio'}
              titleColor="gray.700"
              color={activeAd ? 'gray.100' : 'blue.500'}
              leftIcon={<Power size={16} color="#EDECEE" />}
              onPress={updatedVisibility}
            />

            <Button
              isLoading={isLoadingToDelete}
              width="100%"
              title="Excluir anúncio"
              titleColor="gray.200"
              color="gray.500"
              leftIcon={<TrashSimple size={16} color="#5F5B62" />}
              onPress={() =>
                Alert.alert('Remover', 'Deseja remover o anúncio?', [
                  { text: 'Não', style: 'cancel' },
                  { text: 'Sim', onPress: () => handleDeleteMyAd() },
                ])
              }
            />
          </VStack>
        </ScrollView>
      ) : (
        <Loading />
      )}
    </VStack>
  );
}
