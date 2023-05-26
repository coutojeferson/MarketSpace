import { Button as ButtonNativeBase, IButtonProps, Text } from 'native-base';

type Props = IButtonProps & {
  title: string;
  variant?: 'solid' | 'outline';
  colorSolid?: string;
};
export function Button({
  title,
  variant = 'solid',
  colorSolid = 'blue.500',
  ...rest
}: Props) {
  return (
    <ButtonNativeBase
      w="full"
      h={42}
      bg={variant === 'outline' ? 'gray.500' : colorSolid}
      rounded="sm"
      _pressed={{ bg: variant === 'outline' ? 'gray.400' : 'blue.700' }}
      {...rest}
    >
      <Text
        color={variant === 'outline' ? 'gray.200' : 'gray.700'}
        fontFamily="heading"
        fontSize="sm"
      >
        {title}
      </Text>
    </ButtonNativeBase>
  );
}
