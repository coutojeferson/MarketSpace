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
  Radio,
  Switch,
  useTheme,
} from 'native-base';
import { Plus } from 'phosphor-react-native';
import { useState } from 'react';
import { TouchableOpacity, View } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';
import * as yup from 'yup';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { AppError } from '@utils/appError';
import { api } from '@services/api';
import { useApp } from '@hooks/useApp';

type FormDataProps = {
  name: string;
  description: string;
  is_new: boolean;
  price: string;
  accept_trade: boolean;
  payment_methods: string[];
};

type ImageProps = {
  id: string;
  name: string;
  uri: string;
  path: string;
  type: string;
};

type FormDataValidateProps = {
  name: string;
  price: string;
  description: string;
};

const createdAdSchema = yup.object({
  name: yup.string().required('Informe o nome do item.'),
  price: yup.string().required('Informe o preço do produto.'),
  description: yup.string().required('Informe a descrição do produto.'),
});

export function CreateAd() {
  const [groupValues, setGroupValues] = useState([]);
  const [photoType, setPhotoType] = useState<any>();
  const [itemPhoto, setItemPhoto] = useState<ImageProps[]>([]);
  const [value, setValue] = useState(true);
  const [acceptTrade, setAcceptTrade] = useState(false);
  const [paymentMethods, setPaymentMethods] = useState([]);
  const navigation = useNavigation<AppNavigatorRoutesProps>();

  const { saveProductPreviewData } = useApp();

  const toast = useToast();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormDataValidateProps>({
    resolver: yupResolver(createdAdSchema),
  });

  function handleRemovePhoto(item: ImageProps) {
    const remainingPhotos = itemPhoto.filter(
      (photos) => photos.uri !== item.uri,
    );
    setItemPhoto([...remainingPhotos]);
  }

  async function handleItemPhotoSelect() {
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

        const parts = photoSelected.assets[0].uri.split('/');
        const extractedPartUri = parts[parts.length - 1];

        const fileExtension = photoSelected.assets[0].uri.split('.').pop();
        const photoFile = {
          name: `${extractedPartUri}`.toLowerCase(),
          uri: photoSelected.assets[0].uri,
          type: `${photoSelected.assets[0].type}/${fileExtension}`,
        } as any;

        setItemPhoto((prevState) => [...prevState, photoFile]);
        setPhotoType(photoSelected.assets[0].type);
      }
    } catch (error) {
      console.log(error);
    }
  }

  function handleGoBack() {
    navigation.goBack();
  }

  async function handleRegisterNewAdd(data: FormDataValidateProps) {
    const treatPrice = data.price.replace(',', '.');
    const price = Number(treatPrice) * 100;

    const body = {
      name: data.name,
      description: data.description,
      is_new: value,
      price,
      accept_trade: acceptTrade,
      payment_methods: paymentMethods,
      images: itemPhoto,
    };
    saveProductPreviewData(body);
    navigation.navigate('adPreview');
  }

  return (
    <VStack flex={1} bgColor="gray.600">
      <Box mt={4} px={6} pt={9} pb={4}>
        <Header title="Criar anúncio" onPress={handleGoBack} />
      </Box>
      <ScrollView flex={1} showsVerticalScrollIndicator={false}>
        <VStack bgColor="gray.600" px={6}>
          <Text fontFamily="heading" fontSize="sm" mt={4}>
            Imagens
          </Text>
          <Text mt={1} color="gray.300">
            Escolha até 3 imagens para mostrar o quando o seu produto é
            incrível!
          </Text>
          <HStack>
            <HStack>
              {itemPhoto.map((item) => (
                <BoxSelectImage
                  images={item}
                  onRemovePhoto={(item) => handleRemovePhoto(item)}
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
          <Controller
            control={control}
            name="name"
            render={({ field: { onChange, value } }) => (
              <Input
                mt={4}
                placeholder="Título do anúncio"
                onChangeText={onChange}
                value={value}
                errorMessage={errors.name?.message}
              />
            )}
          />
          <Controller
            control={control}
            name="description"
            render={({ field: { onChange, value } }) => (
              <TextArea
                placeholder="Descrição do produto"
                onChangeText={onChange}
                value={value}
              />
            )}
          />
          <HStack>
            <Radio.Group
              flexDirection="row"
              name="myRadioGroup"
              accessibilityLabel="Tipo do produto"
              value={value ? 'isNew' : 'notNew'}
              onChange={(nextValue) => {
                setValue(nextValue === 'isNew' ? true : false);
              }}
              colorScheme="lightBlue"
            >
              <Radio value="isNew" my={1}>
                Produto novo
              </Radio>
              <Radio value="notNew" my={1} ml={6}>
                Produto usado
              </Radio>
            </Radio.Group>
          </HStack>
          <Text fontFamily="heading" fontSize="sm" mt={8}>
            Sobre o produto
          </Text>
          <Controller
            control={control}
            name="price"
            render={({ field: { onChange, value } }) => (
              <Input
                inputMode="numeric"
                leftElement={<Text ml={4}>R$</Text>}
                mt={4}
                placeholder="Valor do produto"
                onChangeText={onChange}
                value={value}
                errorMessage={errors.price?.message}
              />
            )}
          />
          <VStack alignItems="flex-start">
            <Text fontFamily="heading" fontSize="sm">
              Aceito troca?
            </Text>
            <Switch
              size="lg"
              colorScheme="lightBlue"
              isChecked={acceptTrade}
              onToggle={() => setAcceptTrade(!acceptTrade)}
            />
          </VStack>
          <Text fontFamily="heading" fontSize="sm" mb={4}>
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
        </VStack>

        <HStack
          mt={4}
          px={6}
          pt={6}
          pb={8}
          justifyContent="space-between"
          bgColor="gray.700"
        >
          <Button
            onPress={handleGoBack}
            width={157}
            title="Cancelar"
            titleColor="gray.200"
            color="gray.500"
          />
          <Button
            onPress={handleSubmit(handleRegisterNewAdd)}
            width={157}
            title="Avançar"
            titleColor="gray.700"
            color="gray.100"
          />
        </HStack>
      </ScrollView>
    </VStack>
  );
}
