import { Box, CheckIcon, HStack, ScrollView, Text, VStack } from 'native-base';
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
import { useState } from 'react';
import { CardItem } from '@components/CardItem';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { Header } from '@components/Header';
import { Carousel } from '@components/Caroulsel';
import { Avatar } from '@components/Avatar';
import TagNewSecondary from '@assets/newSecondary.svg';
import { Button } from '@components/Button';

export function AdDetails() {
  const [service, setService] = useState('Todos');
  const width = Dimensions.get('window').width;

  const carouselData = [
    { id: 1, source: require('../assets/item.png') },
    { id: 2, source: require('../assets/item.png') },
    { id: 3, source: require('../assets/item.png') },
    // Adicione mais objetos para mais imagens
  ];

  const navigation = useNavigation();

  function handleBack() {
    navigation.goBack();
  }

  return (
    <ScrollView bgColor="gray.600">
      <VStack flex={1} mt={9}>
        <Box px={6}>
          <Header hideTitle onPress={handleBack} />
        </Box>
        <Box mt={4}>
          <Carousel />
        </Box>
        <VStack mx={6} mb={5}>
          <HStack alignItems="center" my={6}>
            <Avatar width={6} height={6} />
            <Text ml={2} fontFamily="body" color="gray.100" fontSize="sm">
              Ross alguma coisa
            </Text>
          </HStack>
          <TagNewSecondary />
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
            leftIcon={<WhatsappLogo size={20} color="#F7F7F8" weight="fill" />}
          />
        </HStack>
      </VStack>
    </ScrollView>
  );
}
