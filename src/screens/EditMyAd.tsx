import { BoxSelectImage } from '@components/BoxSelectImage';
import { Button } from '@components/Button';
import { CheckBox } from '@components/CheckBox';
import { Header } from '@components/Header';
import { Input } from '@components/Input';
import { RadioButton } from '@components/RadioButton';
import { TextArea } from '@components/TextArea';
import { Toggle } from '@components/Toggle';
import * as yup from 'yup';
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';
import { yupResolver } from '@hookform/resolvers/yup';
import { useApp } from '@hooks/useApp';
import { useNavigation } from '@react-navigation/native';
import { AppNavigatorRoutesProps } from '@routes/app.routes';
import {
  VStack,
  Text,
  Box,
  ScrollView,
  Checkbox,
  HStack,
  Switch,
  Radio,
  useToast,
} from 'native-base';
import { Plus } from 'phosphor-react-native';
import { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { TouchableOpacity } from 'react-native';
import { api } from '@services/api';

type ImageProps = {
  id: string;
  name: string;
  uri: string;
  path: string;
  type: string;
};
type IdImageToDelete = {
  id: string;
};

type PaymentMethodsProps = {
  key: string;
  name: string;
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

export function EditMyAd() {
  const [paymentMethods, setPaymentMethods] = useState([]);
  const [acceptTrade, setAcceptTrade] = useState(false);
  const [value, setValue] = useState(true);
  const [photoType, setPhotoType] = useState<any>();
  const [itemPhoto, setItemPhoto] = useState<ImageProps[]>([]);
  const [listToRemove, setListToRemove] = useState<String[]>([]);

  const navigation = useNavigation<AppNavigatorRoutesProps>();

  const { productDataToUpdate, saveProductPreviewData } = useApp();

  const price = productDataToUpdate.price / 100;

  const toast = useToast();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormDataValidateProps>({
    resolver: yupResolver(createdAdSchema),
  });

  async function handleRemovePhoto(imageInfo: any) {
    if (imageInfo.uri) {
      const remainingPhotos = itemPhoto.filter(
        (photos) => photos.uri !== imageInfo.uri,
      );
      setItemPhoto([...remainingPhotos]);
    } else {
      const listPhotoToRemove = itemPhoto.filter(
        (photos) => photos.id === imageInfo.id,
      );
      const remainingPhotos = itemPhoto.filter(
        (photos) => photos.id !== imageInfo.id,
      );
      setItemPhoto([...remainingPhotos]);
      setListToRemove((prevState) => [...prevState, listPhotoToRemove[0].id]);
    }
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

        // Pegue o último elemento do array resultante, que deve conter a parte desejada
        const extractedPartUri = parts[parts.length - 1];

        const fileExtension = photoSelected.assets[0].uri.split('.').pop();
        const photoFile = {
          // `${name}.${fileExtension}`.toLowerCase(),
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

  async function handleRegisterNewAdd(data: FormDataValidateProps) {
    const treatPrice = data.price.replace(',', '');
    const price = Number(treatPrice);

    const body = {
      id: productDataToUpdate.id,
      name: data.name,
      description: data.description,
      is_new: value,
      price,
      accept_trade: acceptTrade,
      payment_methods: paymentMethods,
      images: itemPhoto,
      listImagesToRemove: listToRemove,
    };
    saveProductPreviewData(body);
    navigation.navigate('adUpdatePreview');
  }

  function handleGoBack() {
    navigation.goBack();
  }

  useEffect(() => {
    setPaymentMethods(
      productDataToUpdate.payment_methods.map(
        (item: PaymentMethodsProps) => item.key,
      ),
    );
    setAcceptTrade(productDataToUpdate.accept_trade);

    setItemPhoto([...productDataToUpdate.images]);
    setValue(productDataToUpdate.is_new);
  }, []);

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
                key={item.id ? item.id : item.uri}
                images={item}
                onRemovePhoto={(imageInfo) => handleRemovePhoto(imageInfo)}
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
          defaultValue={productDataToUpdate.name}
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
          defaultValue={productDataToUpdate.description}
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
          Venda
        </Text>
        <Controller
          defaultValue={price.toFixed(2).replace('.', ',')}
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
      <HStack px={6} py={5} justifyContent="space-between">
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
  );
}
