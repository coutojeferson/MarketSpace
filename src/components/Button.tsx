import {
  Button as ButtonNativeBase,
  HStack,
  IButtonProps,
  Text,
} from 'native-base';
import { Plus } from 'phosphor-react-native';

type Props = IButtonProps & {
  title: string;
  titleColor: string;
  color?: string;
  width?: any;
};
export function Button({
  title,
  titleColor = 'gray.200',
  color = 'blue.500',
  width = 'full',
  ...rest
}: Props) {
  return (
    <ButtonNativeBase
      w={width}
      h={42}
      bg={color}
      rounded="sm"
      _pressed={{ bg: 'none', opacity: 0.5 }}
      {...rest}
    >
      <HStack alignItems="center">
        <Text color={titleColor} fontFamily="heading" fontSize="sm" ml={2}>
          {title}
        </Text>
      </HStack>
    </ButtonNativeBase>
  );
}
