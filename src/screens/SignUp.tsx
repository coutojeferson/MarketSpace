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
import LogoSvg from '@assets/logo.svg';
import Profile from '@assets/profile.svg';
import { Eye, EyeSlash } from 'phosphor-react-native';
import { Input } from '@components/Input';
import { Button } from '@components/Button';
import { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
export function SignUp() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const navigation = useNavigation();

  function handleGoBack() {
    navigation.goBack();
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

          <Profile />

          <Input placeholder="Nome" keyboardType="email-address" mt={5} />
          <Input
            placeholder="E-mail"
            keyboardType="email-address"
            autoCapitalize="none"
          />
          <Input
            placeholder="Telefone"
            keyboardType="phone-pad"
            autoCapitalize="none"
          />
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
          />
          <Input
            mb={8}
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
          />

          <Button
            title="Criar"
            titleColor="gray.700"
            mb={12}
            color="gray.100"
          />
          <Text color="gray.200" fontSize="sm" mb={3}>
            Já tem uma conta?
          </Text>
          <Button
            title="Ir para o login"
            titleColor="gray.200"
            variant="outline"
            onPress={handleGoBack}
          />
        </Center>
      </VStack>
    </ScrollView>
  );
}
