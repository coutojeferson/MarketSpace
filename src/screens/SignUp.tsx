import {
  VStack,
  Text,
  Image,
  Center,
  Heading,
  Pressable,
  Icon,
  KeyboardAvoidingView,
  ScrollView,
  Toast,
  useToast,
} from 'native-base';
import LogoSvg from '@assets/logo.svg';
import Profile from '@assets/profile.svg';
import { Eye, EyeSlash, Password } from 'phosphor-react-native';
import { Input } from '@components/Input';
import { Button } from '@components/Button';
import { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';
import { Alert, TouchableOpacity } from 'react-native';
import { api } from '@services/api';
import axios from 'axios';
import { AppError } from '@utils/appError';

type FormDataProps = {
  name: string;
  email: string;
  tel: string;
  password: string;
  password_confirm: string;
};

const signUpSchema = yup.object({
  name: yup.string().required('Informe o nome.'),
  email: yup.string().required('Informe o e-mail.').email('E-mail inválido.'),
  tel: yup.string().required('Informe o telefone.'),
  password: yup
    .string()
    .required('Informe a senha.')
    .min(6, 'A senha deve ter pelo menos 6 dígitos.'),
  password_confirm: yup
    .string()
    .required('Confirme a senha.')
    .min(6, 'A senha deve ter pelo menos 6 dígitos.')
    .oneOf([yup.ref('password')], 'A confirmação da senha não confere.'),
});

export function SignUp() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [photoIsLoading, setPhotoIsLoading] = useState(false);
  const [photoType, setPhotoType] = useState<any>();
  const [userPhoto, setUserPhoto] = useState(
    'https://github.com/coutojeferson.png',
  );

  const toast = useToast();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormDataProps>({
    resolver: yupResolver(signUpSchema),
  });

  const navigation = useNavigation();

  async function handleUserPhotoSelect() {
    setPhotoIsLoading(true);
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
        setUserPhoto(photoSelected.assets[0].uri);
        setPhotoType(photoSelected.assets[0].type);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setPhotoIsLoading(false);
    }
  }

  function handleGoBack() {
    navigation.goBack();
  }
  async function handleSignUp({ name, email, tel, password }: FormDataProps) {
    try {
      const fileExtension = userPhoto.split('.').pop();
      const photoFile = {
        name: `${name}.${fileExtension}`.toLowerCase(),
        uri: userPhoto,
        type: `${photoType}/${fileExtension}`,
      } as any;

      const formData = new FormData();
      formData.append('avatar', photoFile);
      formData.append('name', name);
      formData.append('email', email);
      formData.append('tel', tel);
      formData.append('password', password);

      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      };

      const response = await api.post('/users', formData, config);

      console.log('Caiu aqui', response.data);
    } catch (error) {
      const isAppError = error instanceof AppError;
      const title = isAppError
        ? error.message
        : 'Não foi possível criar a conta. Tente novamente mais tarde.';
      toast.show({
        title,
        placement: 'top',
        bgColor: 'red.500',
      });
    }
  }
  return (
    <ScrollView
      contentContainerStyle={{ flexGrow: 1 }}
      showsVerticalScrollIndicator={false}
    >
      <VStack bgColor="gray.600" px={12}>
        <Center my={24}>
          <LogoSvg width={60} height={40} />
          <Text mt={2} fontFamily="heading" fontSize={20} color="gray.100">
            Boas vindas!
          </Text>
          <Text color="gray.200" fontSize="sm" mb={8} textAlign="center" mt={1}>
            Crie sua conta e use o espaço para comprar itens variados e vender
            seus produtos
          </Text>
          <TouchableOpacity onPress={handleUserPhotoSelect}>
            {userPhoto ? (
              <Image
                borderRadius="full"
                source={{ uri: userPhoto }}
                alt="Foto do usuário"
                size={40}
              />
            ) : (
              <Profile />
            )}
          </TouchableOpacity>

          <Controller
            control={control}
            name="name"
            render={({ field: { onChange, value } }) => (
              <Input
                placeholder="Nome"
                mt={5}
                onChangeText={onChange}
                value={value}
                errorMessage={errors.name?.message}
              />
            )}
          />

          <Controller
            control={control}
            name="email"
            render={({ field: { onChange, value } }) => (
              <Input
                placeholder="E-mail"
                keyboardType="email-address"
                autoCapitalize="none"
                onChangeText={onChange}
                value={value}
                errorMessage={errors.email?.message}
              />
            )}
          />

          <Controller
            control={control}
            name="tel"
            render={({ field: { onChange, value } }) => (
              <Input
                placeholder="Telefone"
                keyboardType="phone-pad"
                autoCapitalize="none"
                onChangeText={onChange}
                value={value}
                errorMessage={errors.tel?.message}
              />
            )}
          />

          <Controller
            control={control}
            name="password"
            render={({ field: { onChange, value } }) => (
              <Input
                placeholder="Senha"
                type={showPassword ? 'text' : 'password'}
                InputRightElement={
                  <Pressable
                    style={{ marginRight: 24 }}
                    onPress={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <Eye color="#5F5B62" size={24} />
                    ) : (
                      <EyeSlash color="#5F5B62" size={24} />
                    )}
                  </Pressable>
                }
                onChangeText={onChange}
                value={value}
                errorMessage={errors.password?.message}
              />
            )}
          />

          <Controller
            control={control}
            name="password_confirm"
            render={({ field: { onChange, value } }) => (
              <Input
                placeholder="Confirmar senha"
                type={showConfirmPassword ? 'text' : 'password'}
                InputRightElement={
                  <Pressable
                    style={{ marginRight: 24 }}
                    onPress={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    {showConfirmPassword ? (
                      <Eye color="#5F5B62" size={24} />
                    ) : (
                      <EyeSlash color="#5F5B62" size={24} />
                    )}
                  </Pressable>
                }
                onChangeText={onChange}
                value={value}
                errorMessage={errors.password_confirm?.message}
                onSubmitEditing={handleSubmit(handleSignUp)}
                returnKeyType="send"
              />
            )}
          />

          <Button
            title="Criar"
            titleColor="gray.700"
            mt={2}
            mb={12}
            color="gray.100"
            onPress={handleSubmit(handleSignUp)}
          />
          <Text color="gray.200" fontSize="sm" mb={3}>
            Já tem uma conta?
          </Text>
          <Button
            title="Ir para o login"
            titleColor="gray.200"
            color="gray.500"
            onPress={handleGoBack}
          />
        </Center>
      </VStack>
    </ScrollView>
  );
}
