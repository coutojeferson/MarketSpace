import { Avatar } from '@components/Avatar';
import { Carousel } from '@components/Caroulsel';
import { Button } from '@components/Button';
import { VStack, Text, HStack, ScrollView } from 'native-base';
import TagUsedSecondary from '@assets/usedSecondary.svg';
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

export function AdPreview() {
  const navigation = useNavigation<AppNavigatorRoutesProps>();

  function handleGoBack() {
    navigation.goBack();
  }
  function handlePublish() {
    navigation.navigate('myAdDetail');
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
          <Carousel />
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
            onPress={handlePublish}
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
