import { Header } from '@components/Header';
import { Input } from '@components/Input';
import { RadioButton } from '@components/RadioButton';
import { TextArea } from '@components/TextArea';
import { VStack, Text, Box } from 'native-base';
import { Plus } from 'phosphor-react-native';
import { TouchableOpacity } from 'react-native';

export function CreateAd() {
  return (
    <VStack flex={1} bgColor="gray.600" px={6} py={9}>
      <Header title="Criar anúncio" />
      <Text fontFamily="heading" fontSize="md" mt={4}>
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
      <Text fontFamily="heading" fontSize="md" mt={8}>
        Sobre o produto
      </Text>
      <Input mt={4} placeholder="Título do anúncio" />
      <TextArea placeholder="Descrição do produto" />
      <RadioButton />
    </VStack>
  );
}
