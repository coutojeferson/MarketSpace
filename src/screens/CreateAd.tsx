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

type FormDataProps = {
  name: string;
  description: string;
  is_new: boolean;
  price: string;
  accept_trade: boolean;
  payment_methods: string[];
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
  const [itemPhoto, setItemPhoto] = useState<String[]>([]);
  const [value, setValue] = useState(true);
  const [acceptTrade, setAcceptTrade] = useState(false);
  const [paymentMethods, setPaymentMethods] = useState([]);
  const [loading, setIsLoading] = useState(true);
  const [sendingAd, setSendingAd] = useState(false);

  const navigation = useNavigation<AppNavigatorRoutesProps>();

  const { colors } = useTheme();

  const toast = useToast();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormDataValidateProps>({
    resolver: yupResolver(createdAdSchema),
  });

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
  async function handleRegisterNewAdd(data: FormDataValidateProps) {
    try {
      setSendingAd(true);

      const treatPrice = data.price.replace(',', '.');
      const price = Number(treatPrice) * 100;

      const body = {
        name: data.name,
        description: data.description,
        is_new: value,
        price,
        accept_trade: acceptTrade,
        payment_methods: [paymentMethods],
      };

      console.log(body);
      // const config = {
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      // };
      const response = await api.post('/products', body);
      if (response.status === 200) {
        console.log('resposta', response);
      } else {
        console.log('Deu ruim');
      }
    } catch (error) {
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
      setSendingAd(false);
    }
    // navigation.navigate('adPreview');
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
      <HStack px={6} py={5} justifyContent="space-between">
        <Button
          onPress={handleGoBack}
          width={157}
          title="Cancelar"
          titleColor="gray.200"
          color="gray.500"
        />
        <Button
          isLoading={sendingAd}
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
