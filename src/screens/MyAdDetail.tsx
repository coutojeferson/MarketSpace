import { Avatar } from '@components/Avatar';
import { Carousel } from '@components/Caroulsel';
import { Button } from '@components/Button';
import { VStack, Text, HStack, ScrollView, Center } from 'native-base';
import TagUsedSecondary from '@assets/usedSecondary.svg';
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
import { useNavigation } from '@react-navigation/native';
import { AppNavigatorRoutesProps } from '@routes/app.routes';
import { Header } from '@components/Header';
import { useState } from 'react';
import { TouchableOpacity } from 'react-native';

export function MyAdDetail() {
  const [activeAd, setActiveAd] = useState(true);
  const navigation = useNavigation<AppNavigatorRoutesProps>();

  function handleChangeAdStatus() {
    setActiveAd(!activeAd);
  }
  function handleEditAd() {
    navigation.navigate('editMyAdd');
  }
  function handleDeleteMyAd() {
    navigation.navigate('adPreview');
  }

  return (
    <VStack flex={1} bg="gray.600">
      <HStack px={6} mt={9} mb={3} justifyContent="space-between">
        <Header />
        <TouchableOpacity onPress={handleEditAd}>
          <PencilSimpleLine />
        </TouchableOpacity>
      </HStack>
      <ScrollView showsVerticalScrollIndicator={false}>
        <VStack
          alignItems="center"
          justifyContent="center"
          bgColor={activeAd ? 'gray.600' : 'gray.100'}
        >
          <Carousel active={activeAd} />

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
            <Avatar width={6} height={6} />
            <Text ml={2} fontFamily="body" color="gray.100" fontSize="sm">
              Ross alguma coisa
            </Text>
          </HStack>
          <TagUsedSecondary />
          <HStack alignItems="baseline" justifyContent="space-between" mt={2}>
            <Text fontFamily="heading" fontSize="lg" color="gray.100">
              Bicicleta
            </Text>
            <Text color="blue.500" fontFamily="heading">
              <Text fontSize="sm">R$ </Text>
              <Text fontSize="lg">120,00</Text>
            </Text>
          </HStack>
          <Text mt={1} color="gray.200" fontSize="sm" fontFamily="body">
            Cras congue cursus in tortor sagittis placerat nunc, tellus arcu.
            Vitae ante leo eget maecenas urna mattis cursus. Mauris metus amet
            nibh mauris mauris accumsan, euismod. Aenean leo nunc, purus iaculis
            in aliquam.
          </Text>
          <Text mt={6} fontSize="sm">
            <Text fontFamily="heading">Aceita troca? </Text>
            <Text>Sim</Text>
          </Text>
          <Text mt={3} fontFamily="heading">
            Meios de pagamento:
          </Text>
          <HStack mt={2}>
            <Barcode />
            <Text ml={2}>Boleto</Text>
          </HStack>
          <HStack mt={2}>
            <QrCode />
            <Text ml={2}>Pix</Text>
          </HStack>
          <HStack mt={2}>
            <Money />
            <Text ml={2}>Dinheiro</Text>
          </HStack>
          <HStack mt={2}>
            <CreditCard />
            <Text ml={2}>Cartão de Crédito</Text>
          </HStack>
          <HStack mt={2}>
            <Bank />
            <Text ml={2}>Depósito Bancário</Text>
          </HStack>
        </VStack>
        <VStack flex={1} px={6} py={5}>
          <Button
            mb={2}
            width="100%"
            title={activeAd ? 'Desativar anúncio' : 'Reativar anúncio'}
            titleColor="gray.700"
            color={activeAd ? 'gray.100' : 'blue.500'}
            leftIcon={<Power size={16} color="#EDECEE" />}
            onPress={handleChangeAdStatus}
          />

          <Button
            width="100%"
            title="Excluir anúncio"
            titleColor="gray.200"
            color="gray.500"
            leftIcon={<TrashSimple size={16} color="#5F5B62" />}
          />
        </VStack>
      </ScrollView>
    </VStack>
  );
}
