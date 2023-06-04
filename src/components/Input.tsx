import { Input as NativeBaseInput, IInputProps } from 'native-base';
import { MagnifyingGlass } from 'phosphor-react-native';
export function Input({ ...rest }: IInputProps) {
  return (
    <NativeBaseInput
      bg="gray.700"
      h={12}
      px={4}
      borderRadius={6}
      borderWidth={0}
      fontSize="md"
      color="gray.200"
      fontFamily="body"
      mb={4}
      placeholderTextColor="gray.400"
      _focus={{
        bg: 'gray.700',
        borderColor: 'gray.700',
      }}
      {...rest}
    />
  );
}
