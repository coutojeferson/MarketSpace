import {
  VStack,
  Text,
  Center,
  Heading,
  Pressable,
  Icon,
  KeyboardAvoidingView,
  ScrollView,
} from 'native-base';
import { AuthNavigatorRoutesProps } from '@routes/auth.routes';
import LogoSvg from '@assets/logo.svg';
import { Eye, EyeSlash } from 'phosphor-react-native';
import { Input } from '@components/Input';
import { Button } from '@components/Button';
import { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

type FormDataProps = {
  email: string;
  password: string;
};

const signInSchema = yup.object({
  email: yup.string().required('Informe o e-mail').email('E-mail inválido'),
  password: yup
    .string()
    .required('Informe a senha')
    .min(6, 'A senha deve ter pelo menos 6 dígitos'),
});

export function SignIn() {
  const [showPassword, setShowPassword] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormDataProps>({
    resolver: yupResolver(signInSchema),
  });

  const navigation = useNavigation<AuthNavigatorRoutesProps>();

  function handleSignIn(data: FormDataProps) {
    console.log(data);
  }

  function handleNewAccount() {
    navigation.navigate('signUp');
  }
  return (
    <ScrollView
      contentContainerStyle={{ flexGrow: 1 }}
      showsVerticalScrollIndicator={false}
    >
      <VStack bgColor="gray.600" px={12} roundedBottom={24}>
        <Center my={24}>
          <LogoSvg />
          <Heading fontSize={32} mt={2}>
            marketspace
          </Heading>
          <Text color="gray.300" fontSize="sm" mb={16}>
            Seu espaço de compra e venda
          </Text>

          <Text color="gray.200" fontSize="sm" mb={4}>
            Acesse sua conta
          </Text>
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
                onSubmitEditing={handleSubmit(handleSignIn)}
                returnKeyType="send"
              />
            )}
          />

          <Button
            mt={4}
            title="Entrar"
            titleColor="gray.700"
            onPress={handleSubmit(handleSignIn)}
          />
        </Center>
      </VStack>
      <VStack bg="gray.700" px={12} flex={1}>
        <Center mt={16}>
          <Text color="gray.200" fontSize="sm" mb={3}>
            Ainda não tem acesso?
          </Text>
          <Button
            title="Criar uma conta"
            titleColor="gray.200"
            color="gray.500"
            onPress={handleNewAccount}
          />
        </Center>
      </VStack>
    </ScrollView>
  );
}
