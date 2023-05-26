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
export function SignIn() {
  const [showPassword, setShowPassword] = useState(false);
  const navigation = useNavigation<AuthNavigatorRoutesProps>();

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

          <Input
            placeholder="E-mail"
            keyboardType="email-address"
            autoCapitalize="none"
          />
          <Input
            placeholder="Senha"
            // secureTextEntry
            mb={8}
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
          />

          <Button title="Entrar" />
        </Center>
      </VStack>
      <VStack bg="gray.700" px={12} flex={1}>
        <Center mt={16}>
          <Text color="gray.200" fontSize="sm" mb={3}>
            Ainda não tem acesso?
          </Text>
          <Button
            title="Criar uma conta"
            variant="outline"
            onPress={handleNewAccount}
          />
        </Center>
      </VStack>
    </ScrollView>
  );
}
