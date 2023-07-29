import { Box, HStack, Text, VStack, Image } from 'native-base';
import { Avatar } from './Avatar';
import BackgroundItem from '@assets/item.png';
import TagNew from '@assets/new.svg';
import TagUsed from '@assets/used.svg';
import { TouchableOpacity, TouchableOpacityProps } from 'react-native';
import { api } from '@services/api';

type Tag = 'new' | 'used';

type ImageProps = {
  id: string;
  path: string;
};

type CardItemProps = TouchableOpacityProps & {
  statusItem: Tag;
  avatar?: boolean;
  active?: boolean;
  image: Array<ImageProps>;
  name: string;
  price: number;
};

export function CardItem({
  statusItem,
  avatar = true,
  active = true,
  image,
  name,
  price,
  ...rest
}: CardItemProps) {
  const priceProduct = price / 100;

  return (
    <VStack minWidth={150} maxWidth={200} flex={1} mb={6} mx={1}>
      <TouchableOpacity {...rest}>
        <VStack h={100}>
          <Image
            resizeMode="cover"
            width="100%"
            position="absolute"
            source={{ uri: `${api.defaults.baseURL}/images/${image[0].path}` }}
            alt="Imagem de fundo do card"
            h={100}
            borderRadius="md"
            opacity={active ? 1 : 0.7}
          />

          <HStack
            flex={1}
            p={1}
            justifyContent={avatar ? 'space-between' : 'flex-end'}
          >
            {avatar && (
              <Box>
                <Avatar h={6} w={6} borderColor="gray.700" />
              </Box>
            )}
            <Box opacity={active ? 1 : 0.7}>
              {statusItem === 'new' ? <TagNew width={50} /> : <TagUsed />}
            </Box>
          </HStack>
          {!active && (
            <Text
              color="gray.700"
              fontFamily="heading"
              fontSize="xs"
              mb={2}
              ml={2}
              opacity={1}
            >
              ANÚNCIO DESATIVADO
            </Text>
          )}
        </VStack>
        <VStack>
          <Text
            fontFamily="body"
            mb={1}
            color={active ? 'gray.200' : 'gray.400'}
          >
            {name}
          </Text>
          <Text
            fontSize={16}
            fontFamily="heading"
            lineHeight={15}
            color={active ? 'gray.100' : 'gray.400'}
          >
            <Text fontSize={12}>R$</Text>{' '}
            {priceProduct.toFixed(2).replace('.', ',')}
          </Text>
        </VStack>
      </TouchableOpacity>
    </VStack>
  );
}
