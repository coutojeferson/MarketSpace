import { Box, Image } from 'native-base';
import { Plus } from 'phosphor-react-native';
import { TouchableOpacity, TouchableOpacityProps } from 'react-native';
import Imagem from '../assets/item.png';

type photoSelectedType = TouchableOpacityProps & {
  uri?: string;
};

export function BoxSelectImage({ uri, ...rest }: photoSelectedType) {
  return (
    <Box mt={4} flexDirection="row">
      <TouchableOpacity {...rest}>
        <Box
          width={100}
          height={100}
          bg="gray.500"
          borderRadius={6}
          alignItems="center"
          justifyContent="center"
        >
          {uri ? (
            <Image
              borderRadius={6}
              width={100}
              height={100}
              source={{ uri: uri }}
              alt="Foto do usuário"
            />
          ) : (
            <Plus size={24} color="#9F9BA1" />
          )}
        </Box>
      </TouchableOpacity>
    </Box>
  );
}
