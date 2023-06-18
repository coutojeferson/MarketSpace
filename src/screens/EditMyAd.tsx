import { Button } from '@components/Button';
import { CheckBox } from '@components/CheckBox';
import { Header } from '@components/Header';
import { Input } from '@components/Input';
import { RadioButton } from '@components/RadioButton';
import { TextArea } from '@components/TextArea';
import { Toggle } from '@components/Toggle';
import { useNavigation } from '@react-navigation/native';
import { AppNavigatorRoutesProps } from '@routes/app.routes';
import { VStack, Text, Box, ScrollView, Checkbox, HStack } from 'native-base';
import { Plus } from 'phosphor-react-native';
import { useState } from 'react';
import { TouchableOpacity } from 'react-native';

export function EditMyAd() {
  const [groupValues, setGroupValues] = useState([]);

  const navigation = useNavigation<AppNavigatorRoutesProps>();

  function handleGoBack() {
    navigation.goBack();
  }
  function handlePreviewScreen() {
    navigation.navigate('adPreview');
  }
  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <VStack flex={1} bgColor="gray.600" px={6} py={9}>
        <Header title="Editar anúncio" />
        <Text fontFamily="heading" fontSize="sm" mt={4}>
          Imagens
        </Text>
        <Text mt={1} color="gray.300">
          Escolha até 3 imagens para mostrar o quando o seu produto é incrível!
        </Text>
        <TouchableOpacity style={{ marginTop: 16 }}>
          <Box
            width={100}
            height={100}
            bg="gray.500"
            borderRadius={6}
            alignItems="center"
            justifyContent="center"
          >
            <Plus size={24} color="#9F9BA1" />
          </Box>
        </TouchableOpacity>
        <Text fontFamily="heading" fontSize="sm" mt={8}>
          Sobre o produto
        </Text>
        <Input mt={4} placeholder="Título do anúncio" />
        <TextArea placeholder="Descrição do produto" />
        <RadioButton />
        <Text fontFamily="heading" fontSize="sm" mt={8}>
          Sobre o produto
        </Text>
        <Input
          inputMode="numeric"
          leftElement={<Text ml={4}>R$</Text>}
          mt={4}
          placeholder="Valor do produto"
        />
        <Toggle />
        <Text fontFamily="heading" fontSize="sm" mb={4}>
          Meios de pagamento aceitos
        </Text>
        <CheckBox
          name="Boleto"
          onChange={setGroupValues}
          value={groupValues}
          aria-label="check box de boleto"
        />
        <CheckBox
          name="Pix"
          onChange={setGroupValues}
          aria-label="check box de pix"
        />
        <CheckBox
          name="Dinheiro"
          onChange={setGroupValues}
          aria-label="check box de dinheiro"
        />
        <CheckBox
          name="Cartão de Crédito"
          onChange={setGroupValues}
          aria-label="check box de cartão de crédito"
        />
        <CheckBox
          name="Depósito Bancário"
          onChange={setGroupValues}
          aria-label="check box de depósito bancário"
        />
      </VStack>
      <HStack px={6} py={5} justifyContent="space-between">
        <Button
          onPress={handleGoBack}
          width={157}
          title="Cancelar"
          titleColor="gray.200"
          color="gray.500"
        />

        <Button
          onPress={handlePreviewScreen}
          width={157}
          title="Avançar"
          titleColor="gray.700"
          color="gray.100"
        />
      </HStack>
    </ScrollView>
  );
}
