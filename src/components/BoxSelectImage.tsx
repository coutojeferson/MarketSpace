import { Box, Image } from 'native-base';
import { Plus, X } from 'phosphor-react-native';
import { TouchableOpacity, TouchableOpacityProps } from 'react-native';
import Imagem from '../assets/item.png';
import { IconClose } from './IconClose';
import { api } from '@services/api';

type photoSelectedType = TouchableOpacityProps & {
  images?: any;
  onRemovePhoto?: (images: string) => void;
};

export function BoxSelectImage({
  images,
  onRemovePhoto = () => {},
  ...rest
}: photoSelectedType) {
  function handleClose(images: any) {
    onRemovePhoto(images);
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
          {images ? (
            <Box alignItems="flex-end">
              <Image
                borderRadius={6}
                width={100}
                height={100}
                source={{
                  uri: images.uri
                    ? images.uri
                    : `${api.defaults.baseURL}/images/${images.path}`,
                }}
                alt="Foto do produto"
              />
              <IconClose onPress={() => handleClose(images)} />
            </Box>
          ) : (
            <Plus size={24} color="#9F9BA1" />
          )}
        </Box>
      </TouchableOpacity>
    </Box>
  );
}
