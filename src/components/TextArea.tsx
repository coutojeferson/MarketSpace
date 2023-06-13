import { TextArea as TextAreaInput, IInputProps } from 'native-base';
export function TextArea({ ...rest }: IInputProps) {
  return (
    <TextAreaInput
      bg="gray.700"
      h={160}
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
      placeholder="Text Area Placeholder"
      autoCompleteType={undefined}
      {...rest}
    />
  );
}
