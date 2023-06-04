import { HStack, IButtonProps, Text, VStack } from 'native-base';
import { Tag, ArrowRight } from 'phosphor-react-native';
import { TouchableOpacity, TouchableOpacityProps } from 'react-native';

type Props = TouchableOpacityProps & {
  amountActiveAds: number;
};

export function ActiveAds({ amountActiveAds, ...rest }: Props) {
  return (
    <TouchableOpacity {...rest}>
      <HStack
        borderRadius={6}
        h={66}
        backgroundColor="rgba(100, 122, 199, 0.1)"
        px={4}
        alignItems="center"
      >
        <HStack flex={1} alignItems="center">
          <Tag color="#364D9D" />
          <VStack ml={4}>
            <Text fontFamily="heading" fontSize="lg">
              {amountActiveAds}
            </Text>
            <Text fontFamily="body" fontSize="xs" color="gray.200">
              anúncios ativos
            </Text>
          </VStack>
        </HStack>
        <HStack alignItems="center">
          <Text fontFamily="heading" fontSize="xs" color="blue.700" mr={2}>
            Meus anúncios
          </Text>
          <ArrowRight color="#364D9D" size={16} />
        </HStack>
      </HStack>
    </TouchableOpacity>
  );
}
