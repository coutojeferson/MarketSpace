import { Box, Image } from 'native-base';
import { Plus, X } from 'phosphor-react-native';
import { TouchableOpacity, TouchableOpacityProps } from 'react-native';
import Imagem from '../assets/item.png';
import { IconClose } from './IconClose';

type photoSelectedType = TouchableOpacityProps & {
  uri?: any;
  onRemovePhoto?: (uri: string) => void;
};

export function BoxSelectImage({
  uri,
  onRemovePhoto = () => {},
  ...rest
}: photoSelectedType) {
  function handleClose(uri: string) {
    onRemovePhoto(uri);
  }
  return (
    <Box mt={4} flexDirection="row">
      <TouchableOpacity {...rest}>
        <Box
          mr={2}
          width={100}
          height={100}
          bg="gray.500"
          borderRadius={6}
          alignItems="center"
          justifyContent="center"
        >
          {uri ? (
            <Box alignItems="flex-end">
              <Image
                borderRadius={6}
                width={100}
                height={100}
                source={{ uri: uri }}
                alt="Foto do produto"
              />
              <IconClose onPress={() => handleClose(uri)} />
            </Box>
          ) : (
            <Plus size={24} color="#9F9BA1" />
          )}
        </Box>
      </TouchableOpacity>
    </Box>
  );
}
