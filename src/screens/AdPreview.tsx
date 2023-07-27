import { Avatar } from '@components/Avatar';
import { Carousel } from '@components/Caroulsel';
import { Button } from '@components/Button';
import { VStack, Text, HStack, ScrollView, useToast } from 'native-base';
import TagUsedSecondary from '@assets/usedSecondary.svg';
import TagNewSecondary from '@assets/newSecondary.svg';
import {
  ArrowLeft,
  Bank,
  Barcode,
  CreditCard,
  Money,
  QrCode,
  Tag,
} from 'phosphor-react-native';
import { useNavigation } from '@react-navigation/native';
import { AppNavigatorRoutesProps } from '@routes/app.routes';
import { useApp } from '@hooks/useApp';
import { useAuth } from '@hooks/useAuth';
import { AppError } from '@utils/appError';
import { api } from '@services/api';
import { useState } from 'react';

export function AdPreview() {
  const [isLoading, setIsloading] = useState(false);
  const navigation = useNavigation<AppNavigatorRoutesProps>();

  const { productPreviewData } = useApp();
  const { user } = useAuth();
  const toast = useToast();
  const price = productPreviewData.price / 100;

  function handleGoBack() {
    navigation.goBack();
  }
  async function handlePublishNewAdd() {
    try {
      setIsloading(true);
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      };

      const body = {
        name: productPreviewData.name,
        description: productPreviewData.description,
        is_new: productPreviewData.is_new,
        price: productPreviewData.price,
        accept_trade: productPreviewData.accept_trade,
        payment_methods: productPreviewData.payment_methods,
      };

      const response = await api.post('/products', body);

      const formData = new FormData();
      productPreviewData.images.map((item) => {
        formData.append('images', item as any);
        return;
      });

      formData.append('product_id', response.data.id);

      await api.post('/products/images', formData, config);

      navigation.navigate('myAdDetail');
    } catch (error) {
      console.log(error);
      const isAppError = error instanceof AppError;
      const title = isAppError
        ? error.message
        : 'Não foi possível criar o anúncio. Tente novamente mais tarde.';
      toast.show({
        title,
        placement: 'top',
        bgColor: 'red.500',
      });
    } finally {
      setIsloading(false);
    }
  }

  return (
    <VStack flex={1} bg="gray.600">
      <VStack justifyContent="center" bgColor="blue.500" h={121} px={6}>
        <VStack mt={10} alignItems="center">
          <Text color="gray.700" fontSize="md" fontFamily="heading">
            Pré visualização do anúncio
          </Text>
          <Text color="gray.700" fontSize="sm">
            É assim que seu produto vai aparecer!
          </Text>
        </VStack>
      </VStack>
      <ScrollView showsVerticalScrollIndicator={false}>
        <VStack>
          <Carousel images={productPreviewData.images} />
        </VStack>
        <VStack px={6} mb={5}>
          <HStack alignItems="center" my={6}>
            <Avatar width={6} height={6} source={{ uri: user.avatar }} />
            <Text ml={2} fontFamily="body" color="gray.100" fontSize="sm">
              {user.name}
            </Text>
          </HStack>
          {productPreviewData.is_new ? (
            <TagNewSecondary />
          ) : (
            <TagUsedSecondary />
          )}
          <HStack alignItems="baseline" justifyContent="space-between" mt={2}>
            <Text fontFamily="heading" fontSize="lg" color="gray.100">
              {productPreviewData.name}
            </Text>
            <Text color="blue.500" fontFamily="heading">
              <Text fontSize="sm">R$ </Text>
              <Text fontSize="lg">{price.toFixed(2).replace('.', ',')}</Text>
            </Text>
          </HStack>
          <Text mt={1} color="gray.200" fontSize="sm" fontFamily="body">
            {productPreviewData.description}
          </Text>
          <Text mt={6} fontSize="sm">
            <Text fontFamily="heading">Aceita troca? </Text>
            <Text>{productPreviewData.accept_trade ? 'Sim' : 'Não'}</Text>
          </Text>
          <Text mt={3} fontFamily="heading">
            Meios de pagamento:
          </Text>
          {productPreviewData.payment_methods.map((item: any) => (
            <>
              {item === 'boleto' && (
                <HStack mt={2}>
                  <Barcode />
                  <Text ml={2}>Boleto</Text>
                </HStack>
              )}
              {item === 'pix' && (
                <HStack mt={2}>
                  <QrCode />
                  <Text ml={2}>Pix</Text>
                </HStack>
              )}
              {item === 'cash' && (
                <HStack mt={2}>
                  <Money />
                  <Text ml={2}>Dinheiro</Text>
                </HStack>
              )}
              {item === 'card' && (
                <HStack mt={2}>
                  <CreditCard />
                  <Text ml={2}>Cartão de Crédito</Text>
                </HStack>
              )}
              {item === 'deposit' && (
                <HStack mt={2}>
                  <Bank />
                  <Text ml={2}>Depósito Bancário</Text>
                </HStack>
              )}
            </>
          ))}
        </VStack>
        <HStack px={6} py={5} justifyContent="space-between" bg="gray.700">
          <Button
            onPress={handleGoBack}
            width={157}
            title="Voltar e editar"
            titleColor="gray.200"
            color="gray.500"
            leftIcon={<ArrowLeft size={16} color="#3E3A40" />}
          />
          <Button
            isLoading={isLoading}
            onPress={handlePublishNewAdd}
            width={157}
            title="Publicar"
            titleColor="gray.700"
            color="blue.500"
            leftIcon={<Tag size={16} color="#EDECEE" />}
          />
        </HStack>
      </ScrollView>
    </VStack>
  );
}
