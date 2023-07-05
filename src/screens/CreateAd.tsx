import { Button } from '@components/Button';
import { CheckBox } from '@components/CheckBox';
import { Header } from '@components/Header';
import { Input } from '@components/Input';
import { RadioButton } from '@components/RadioButton';
import { BoxSelectImage } from '@components/BoxSelectImage';
import { TextArea } from '@components/TextArea';
import { Toggle } from '@components/Toggle';
import { useNavigation } from '@react-navigation/native';
import { AppNavigatorRoutesProps } from '@routes/app.routes';
import {
  VStack,
  Text,
  Box,
  ScrollView,
  Checkbox,
  HStack,
  useToast,
} from 'native-base';
import { Plus } from 'phosphor-react-native';
import { useState } from 'react';
import { TouchableOpacity, View } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';

export function CreateAd() {
  const [groupValues, setGroupValues] = useState([]);
  const [photoType, setPhotoType] = useState<any>();
  const [itemPhoto, setItemPhoto] = useState<String[]>([]);

  const navigation = useNavigation<AppNavigatorRoutesProps>();

  const toast = useToast();

  function handleRemovePhoto(uri: string) {
    const remainingPhotos = itemPhoto.filter((photos) => photos !== uri);
    setItemPhoto([...remainingPhotos]);
  }

  async function handleItemPhotoSelect() {
    console.log('Entrou aqui');
    try {
      const photoSelected = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        quality: 1,
        aspect: [4, 4],
        allowsEditing: true,
      });

      if (photoSelected.canceled) {
        return;
      }

      if (photoSelected.assets[0].uri) {
        const photoInfo = await FileSystem.getInfoAsync(
          photoSelected.assets[0].uri,
        );

        if (photoInfo.size && photoInfo.size / 1024 / 1024 > 5) {
          return toast.show({
            title: 'Essa imagem é muito grande. Escolha uma de até 5MB.',
            placement: 'top',
            bgColor: 'red.500',
          });
        }
        setItemPhoto((prevState) => [
          ...prevState,
          photoSelected.assets[0].uri,
        ]);
        setPhotoType(photoSelected.assets[0].type);
      }
    } catch (error) {
      console.log(error);
    }
  }

  function handleGoBack() {
    navigation.goBack();
  }
  function handlePreviewScreen() {
    navigation.navigate('adPreview');
  }
  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <VStack flex={1} bgColor="gray.600" px={6} py={9}>
        <Header title="Criar anúncio" />
        <Text fontFamily="heading" fontSize="sm" mt={4}>
          Imagens
        </Text>
        <Text mt={1} color="gray.300">
          Escolha até 3 imagens para mostrar o quando o seu produto é incrível!
        </Text>
        <HStack>
          <HStack>
            {itemPhoto.map((item) => (
              <BoxSelectImage
                uri={item}
                onRemovePhoto={(uri) => handleRemovePhoto(uri)}
              />
            ))}
          </HStack>
          <Box>
            {itemPhoto.length < 3 && (
              <BoxSelectImage onPress={handleItemPhotoSelect} />
            )}
          </Box>
        </HStack>

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
