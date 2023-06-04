import { Box, HStack, Text, VStack, Image } from 'native-base';
import { Avatar } from './Avatar';
import BackgroundItem from '@assets/item.png';
import TagNew from '@assets/new.svg';
import TagUsed from '@assets/used.svg';
import { TouchableOpacity } from 'react-native';

type Tag = 'new' | 'used';

type CardItemProps = {
  statusItem: Tag;
  avatar?: boolean;
  active?: boolean;
};

export function CardItem({
  statusItem,
  avatar = true,
  active = true,
}: CardItemProps) {
  return (
    <VStack minWidth={133} maxWidth={175} flex={1} mb={6}>
      <TouchableOpacity>
        <VStack h={100}>
          <Image
            width="100%"
            position="absolute"
            source={BackgroundItem}
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
            Tênis vermelho
          </Text>
          <Text
            fontSize={16}
            fontFamily="heading"
            lineHeight={15}
            color={active ? 'gray.100' : 'gray.400'}
          >
            <Text fontSize={12}>R$</Text> 59,90
          </Text>
        </VStack>
      </TouchableOpacity>
    </VStack>
  );
}
