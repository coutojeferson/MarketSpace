import { HStack, Text } from 'native-base';
import { TouchableOpacity, TouchableOpacityProps } from 'react-native';
import { ArrowLeft } from 'phosphor-react-native';

type HeaderTypeProps = TouchableOpacityProps & {
  title?: string;
  hideTitle?: boolean;
};

export function Header({ title, hideTitle, ...rest }: HeaderTypeProps) {
  return (
    <HStack alignItems="center">
      <TouchableOpacity {...rest}>
        <ArrowLeft />
      </TouchableOpacity>
      {!hideTitle && (
        <Text fontFamily="heading" fontSize={20} flex={1} textAlign="center">
          {title}
        </Text>
      )}
    </HStack>
  );
}
