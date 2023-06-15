import {
  Checkbox,
  HStack,
  Text,
  ICheckboxGroupProps,
  useTheme,
} from 'native-base';

type Props = ICheckboxGroupProps & {
  name: string;
};

export function CheckBox({ name, ...rest }: Props) {
  const { sizes, colors } = useTheme();

  return (
    <Checkbox.Group
      borderRadius="none"
      accessibilityLabel="formas de pagamento"
      {...rest}
    >
      <HStack alignItems="center" mb={3}>
        <Checkbox value={name.toLowerCase()} />
        <Text ml={2}>{name}</Text>
      </HStack>
    </Checkbox.Group>
  );
}
